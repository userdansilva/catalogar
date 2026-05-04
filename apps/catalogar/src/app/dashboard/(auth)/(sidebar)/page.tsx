import type { Metadata } from "next";
import { CatalogSwitcherDrawerDialog } from "@/components/catalog-switcher-drawer-dialog";
import { CustomizationMissions } from "@/components/customization-missions";
import { FirstSteps } from "@/components/first-steps";
import { MainCards } from "@/components/main-cards";
import { MyCatalogs } from "@/components/my-catalogs";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ pular?: string }>;
}) {
  const user = await getUser();

  const [{ productTypes }, { categories }, { catalogItems }] =
    await Promise.all([getProductTypes(), getCategories(), getCatalogItems()]);

  const shouldDisplayMainMissions =
    productTypes.length === 0 || catalogItems.length === 0;

  const shouldDisplayCustomizationMissions =
    !user.currentCatalog.company || !user.currentCatalog.theme;

  const { pular } = await searchParams;

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
          productTypes={productTypes}
          categories={categories}
          catalogItems={catalogItems}
          skipCategory={pular === "categoria"}
        />
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Catálogo selecionado
            </p>

            <CatalogSwitcherDrawerDialog
              catalogs={user.catalogs}
              currentCatalog={user.currentCatalog}
            />
          </div>

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
