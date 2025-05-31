import { CatalogItem, Category, Product } from "@/types/api-types";
import { routes } from "@/routes";
import { Mission } from "./mission";
import { Reward } from "./reward";

type MainMissionsProps = {
  products: Product[];
  categories: Category[];
  catalogItems: CatalogItem[];
}

export function MainMissions({
  products, categories, catalogItems,
}: MainMissionsProps) {
  const productAmount = products.length;
  const categoryAmount = categories.length;
  const catalogItemAmount = catalogItems.length;

  const productMissionStatus = (() => {
    if (productAmount > 0) return "COMPLETE";
    if (categoryAmount === 0) return "CURRENT";

    return "PENDING";
  })();

  const categoryMissionStatus = (() => {
    if (categoryAmount > 0) return "COMPLETE";
    if (productAmount > 0 && catalogItemAmount === 0) return "CURRENT";

    return "PENDING";
  })();

  const catalogItemMissionStatus = (() => {
    if (catalogItemAmount > 0) return "COMPLETE";
    if (productAmount > 0 && categoryAmount > 0) return "CURRENT";

    return "PENDING";
  })();

  return (
    <div className="space-y-3">
      <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0">
        Missões Principais
      </h2>

      <Mission
        title="1. Adicionar o primeiro produto"
        status={productMissionStatus}
        href={routes.products.sub.new.url}
      />

      <Mission
        title="2. Adicionar a primeira categoria"
        status={categoryMissionStatus}
        href={routes.categories.sub.new.url}
      />

      <Reward
        title="Desbloqueia o catálogo"
        isRewarded={productMissionStatus === "COMPLETE"
          && categoryMissionStatus === "COMPLETE"}
      />

      <Mission
        title="3. Adicionar o primeiro item de catálogo"
        status={catalogItemMissionStatus}
        href={routes.catalogItems.sub.new.url}
      />

      <Reward
        title="Desbloqueia o preview"
        isRewarded={catalogItemMissionStatus === "COMPLETE"}
      />
    </div>
  );
}
