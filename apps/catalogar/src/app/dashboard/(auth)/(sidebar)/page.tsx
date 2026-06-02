import type { Metadata } from "next";
import { CatalogSwitcherDrawerDialog } from "@/components/catalog-switcher-drawer-dialog";
import { CustomizationMissions } from "@/components/customization-missions";
import { FirstSteps } from "@/components/first-steps";
import { MainCards } from "@/components/main-cards";
import { MyCatalogs } from "@/components/my-catalogs";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ pular?: string }>;
}) {
  const session = await getSession();

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: session.user.email },
    include: {
      currentCatalog: {
        include: {
          company: true,
          theme: true,
          productTypes: true,
          categories: true,
          catalogItems: true,
        },
      },
      catalogs: true,
    },
  });

  if (!user.currentCatalog) {
    throw new Error("Current Catalog Undefined");
  }

  const {
    productTypes,
    categories,
    catalogItems,
    company,
    theme,
    ...currentCatalog
  } = user.currentCatalog;

  const shouldDisplayMainMissions =
    productTypes.length === 0 || catalogItems.length === 0;

  const shouldDisplayCustomizationMissions = !company || !theme;

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
          productTypes={user.currentCatalog.productTypes}
          categories={user.currentCatalog.categories}
          catalogItems={catalogItems.map((catalogItem) => ({
            ...catalogItem,
            price: catalogItem.price?.toString() ?? null,
          }))}
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
              currentCatalog={currentCatalog}
            />
          </div>

          <MainCards
            productTypes={productTypes}
            categories={categories}
            catalogItems={catalogItems.map((catalogItem) => ({
              ...catalogItem,
              price: catalogItem.price?.toString() ?? null,
            }))}
            user={user}
          />
        </div>
      )}

      {shouldDisplayCustomizationMissions && (
        <CustomizationMissions user={user} />
      )}

      {(!shouldDisplayMainMissions || user.catalogs.length > 1) && (
        <MyCatalogs catalogs={user.catalogs} currentCatalog={currentCatalog} />
      )}
    </div>
  );
}
