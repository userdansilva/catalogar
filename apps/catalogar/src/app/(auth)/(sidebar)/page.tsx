import { redirect, RedirectType } from "next/navigation";
import { Metadata } from "next";
import { CustomizationMissions } from "@/components/customization-missions";
import { FirstSteps } from "@/components/first-steps";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getUser } from "@/services/get-user";
import { MainCards } from "@/components/main-cards";
import { MyCatalogs } from "@/components/my-catalogs";
import { CatalogSwitcherDrawerDialog } from "@/components/catalog-switcher-drawer-dialog";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ pular?: string }>;
}) {
  const [userError, userData] = await getUser();
  if (userError) {
    return <ExpectedError error={userError} />;
  }

  if (!userData.data.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const { pular } = await searchParams;

  const [productTypesError, productTypesData] = await getProductTypes();
  if (productTypesError) {
    return <ExpectedError error={productTypesError} />;
  }

  const [categoriesError, categoriesData] = await getCategories();
  if (categoriesError) {
    return <ExpectedError error={categoriesError} />;
  }

  const [catalogItemsError, catalogItemsData] = await getCatalogItems();
  if (catalogItemsError) {
    return <ExpectedError error={catalogItemsError} />;
  }

  const shouldDisplayMainMissions =
    productTypesData.data.length === 0 || catalogItemsData.data.length === 0;

  const shouldDisplayCustomizationMissions =
    !userData.data.currentCatalog.company ||
    !userData.data.currentCatalog.theme;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Bem-Vindo ao{" "}
          <span className="underline underline-offset-2">Catalogar!</span>
        </h1>

        {(shouldDisplayMainMissions || shouldDisplayCustomizationMissions) && (
          <p className="leading-7 not-first:mt-6">
            Siga as etapas abaixo para configurar o seu catálogo. Ao
            completá-las, você poderá publicar e ter um link customizado para
            compartilhar com seus clientes!
          </p>
        )}
      </div>

      {shouldDisplayMainMissions ? (
        <FirstSteps
          productTypes={productTypesData.data}
          categories={categoriesData.data}
          catalogItems={catalogItemsData.data}
          skipCategory={pular === "categoria"}
        />
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Catálogo selecionado
            </p>

            <CatalogSwitcherDrawerDialog
              catalogs={userData.data.catalogs}
              currentCatalog={userData.data.currentCatalog}
            />
          </div>

          <MainCards
            productTypes={productTypesData.data}
            categories={categoriesData.data}
            catalogItems={catalogItemsData.data}
            user={userData.data}
          />
        </div>
      )}

      {shouldDisplayCustomizationMissions && (
        <CustomizationMissions user={userData.data} />
      )}

      {(!shouldDisplayMainMissions || userData.data.catalogs.length > 1) && (
        <MyCatalogs
          catalogs={userData.data.catalogs}
          currentCatalog={userData.data.currentCatalog}
        />
      )}
    </div>
  );
}
