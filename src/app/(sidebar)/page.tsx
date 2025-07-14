import { redirect } from "next/navigation";
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

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ pular?: string }>;
}) {
  const { data: user } = await getUser();

  if (!user.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url);
  }

  const { pular } = await searchParams;

  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();
  const { data: catalogItems } = await getCatalogItems();

  const shouldDisplayMainMissions =
    productTypes.length === 0 || catalogItems.length === 0;

  const shouldDisplayCustomizationMissions =
    !user.currentCatalog.company || !user.currentCatalog.theme;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Bem-Vindo ao{" "}
          <span className="underline underline-offset-2">Catalogar!</span>
        </h1>

        {(shouldDisplayMainMissions || shouldDisplayCustomizationMissions) && (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Siga as etapas abaixo para configurar o seu catálogo. Ao
            completá-las, você poderá publicar e ter um link customizado para
            compartilhar com seus clientes!
          </p>
        )}
      </div>

      {shouldDisplayMainMissions ? (
        <FirstSteps
          productTypes={productTypes}
          categories={categories}
          catalogItems={catalogItems}
          skipCategory={pular === "categoria"}
        />
      ) : (
        <div className="space-y-6">
          <CatalogSwitcherDrawerDialog
            catalogs={user.catalogs}
            currentCatalog={user.currentCatalog}
          />

          <MainCards
            productTypes={productTypes}
            categories={categories}
            catalogItems={catalogItems}
            user={user}
          />
        </div>
      )}

      {shouldDisplayCustomizationMissions && (
        <CustomizationMissions user={user} />
      )}

      {(!shouldDisplayMainMissions || user.catalogs.length > 1) && (
        <MyCatalogs
          catalogs={user.catalogs}
          currentCatalog={user.currentCatalog}
        />
      )}
    </div>
  );
}
