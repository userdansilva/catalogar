// import { auth } from "@/auth";
import { CustomizationMissions } from "@/components/customization-missions";
import { MainCards } from "@/components/main-cards";
import { MainMissions } from "@/components/main-missions";
import { MyCatalogs } from "@/components/my-catalogs";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home() {
  const { data: user } = await getUser();

  if (!user.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url);
  }

  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();
  const { data: catalogItems } = await getCatalogItems();

  // const session = await auth();
  // // eslint-disable-next-line no-console
  // console.log(session);

  const shouldDisplayMainMissions = productTypes.length === 0
    || catalogItems.length === 0;

  const shouldDisplayCustomizationMissions = !user.currentCatalog.company
    || !user.currentCatalog.theme;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Boas Vindas ao Catalogar!
        </h1>

        {(shouldDisplayMainMissions || shouldDisplayCustomizationMissions) && (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Estamos super felizes por ter você por aqui!
            Preparamos algumas missões pra te ajudar a configurar seu catálogo.
            Ao completar cada etapa, você já vai ter um link pronto pra compartilhar seus
            produtos com seus clientes!
          </p>
        )}
      </div>

      {shouldDisplayMainMissions ? (
        <MainMissions
          productTypes={productTypes}
          categories={categories}
          catalogItems={catalogItems}
        />
      ) : (
        <MainCards
          productTypes={productTypes}
          categories={categories}
          catalogItems={catalogItems}
          user={user}
        />
      )}

      {shouldDisplayCustomizationMissions && (
        <CustomizationMissions
          user={user}
        />
      )}

      {((shouldDisplayMainMissions
        || shouldDisplayCustomizationMissions
        || user.catalogs.length > 1)
        && (
          <MyCatalogs
            catalogs={user.catalogs}
            currentCatalog={user.currentCatalog}
          />
        ))}
    </div>
  );
}
