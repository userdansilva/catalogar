import { CatalogItem, Category, ProductType } from "@/types/api-types";
import { routes } from "@/routes";
import { Mission } from "./mission";
import { Reward } from "./reward";

type MainMissionsProps = {
  productTypes: ProductType[];
  categories: Category[];
  catalogItems: CatalogItem[];
}

export function MainMissions({
  productTypes, categories, catalogItems,
}: MainMissionsProps) {
  const productTypeAmount = productTypes.length;
  const categoryAmount = categories.length;
  const catalogItemAmount = catalogItems.length;

  const productTypeMissionStatus = (() => {
    if (productTypeAmount > 0) return "COMPLETE";
    if (categoryAmount === 0) return "CURRENT";

    return "PENDING";
  })();

  const categoryMissionStatus = (() => {
    if (categoryAmount > 0) return "COMPLETE";
    if (productTypeAmount > 0 && catalogItemAmount === 0) return "CURRENT";

    return "PENDING";
  })();

  const catalogItemMissionStatus = (() => {
    if (catalogItemAmount > 0) return "COMPLETE";
    if (productTypeAmount > 0 && categoryAmount > 0) return "CURRENT";

    return "PENDING";
  })();

  return (
    <div className="space-y-3">
      <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0">
        Missões Principais
      </h2>

      <Mission
        title="1. Adicionar o primeiro tipo de produto"
        status={productTypeMissionStatus}
        href={routes.productTypes.sub.createFirst.url}
      />

      <Mission
        title="2. Adicionar a primeira categoria"
        status={categoryMissionStatus}
        href={routes.categories.sub.createFirst.url}
      />

      <Reward
        title="Desbloqueia o catálogo"
        isRewarded={productTypeMissionStatus === "COMPLETE"
          && categoryMissionStatus === "COMPLETE"}
      />

      <Mission
        title="3. Adicionar o primeiro item de catálogo"
        status={catalogItemMissionStatus}
        href={routes.catalogItems.sub.createFirst.url}
      />

      <Reward
        title="Desbloqueia o preview"
        isRewarded={catalogItemMissionStatus === "COMPLETE"}
      />
    </div>
  );
}
