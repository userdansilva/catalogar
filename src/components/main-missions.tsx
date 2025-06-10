import { CatalogItem, Category, ProductType } from "@/types/api-types";
import { routes } from "@/routes";
import { Mission } from "./mission";

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
        Primeiros passos
      </h2>

      <Mission
        title="1. Adicione o primeiro tipo de produto"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        et ligula sit amet est blandit molestie et in purus. Donec vitae convallis
        libero, ac fermentum magna. Aenean vitae pharetra dolor. Proin nec."
        status={productTypeMissionStatus}
        href={routes.productTypes.sub.createFirst.url}
      />

      <Mission
        title="2. Adicione a primeira categoria"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        et ligula sit amet est blandit molestie et in purus. Donec vitae convallis
        libero, ac fermentum magna. Aenean vitae pharetra dolor. Proin nec."
        status={categoryMissionStatus}
        href={routes.categories.sub.createFirst.url}
      />

      <Mission
        title="3. Adicione o primeiro item de catálogo"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        et ligula sit amet est blandit molestie et in purus. Donec vitae convallis
        libero, ac fermentum magna. Aenean vitae pharetra dolor. Proin nec."
        status={catalogItemMissionStatus}
        href={routes.catalogItems.sub.createFirst.url}
      />
    </div>
  );
}
