import { auth } from "@/auth";
import { CustomizationMissions } from "@/components/customization-missions";
import { MainCards } from "@/components/main-cards";
import { MainMissions } from "@/components/main-missions";
import { MyCatalogs } from "@/components/my-catalogs";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProducts } from "@/services/get-products";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home() {
  const session = await auth();

  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();
  const { data: catalogItems } = await getCatalogItems();
  const { data: user } = await getUser();

  // eslint-disable-next-line no-console
  console.log(session);

  const shouldDisplayMainMissions = products.length === 0
    || catalogItems.length === 0;

  const shouldDisplayCustomizationMissions = !user.currentCatalog.company
    || !user.currentCatalog.theme;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Boas Vindas ao Calogar!
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
          products={products}
          categories={categories}
          catalogItems={catalogItems}
        />
      ) : (
        <MainCards
          products={products}
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

      <MyCatalogs
        catalogs={user.catalogs}
        currentCatalog={user.currentCatalog}
      />
    </div>
  );
}
