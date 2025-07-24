"use client";

import { Mission } from "./mission";
import { CatalogItem, Category, ProductType } from "@/types/api-types";
import { routes } from "@/routes";

export function FirstSteps({
  productTypes,
  categories,
  catalogItems,
  skipCategory,
}: {
  productTypes: ProductType[];
  categories: Category[];
  catalogItems: CatalogItem[];
  skipCategory?: boolean;
}) {
  const productTypeAmount = productTypes.length;
  const categoryAmount = categories.length;
  const catalogItemAmount = catalogItems.length;

  const productTypeMissionStatus = (() => {
    if (productTypeAmount > 0) return "COMPLETE";
    if (categoryAmount === 0) return "CURRENT";

    return "PENDING";
  })();

  const categoryMissionStatus = (() => {
    if (categoryAmount > 0 || skipCategory) return "COMPLETE";

    if (productTypeMissionStatus === "COMPLETE" && catalogItemAmount === 0)
      return "CURRENT";

    return "PENDING";
  })();

  const catalogItemMissionStatus = (() => {
    if (catalogItemAmount > 0) return "COMPLETE";

    if (
      productTypeMissionStatus === "COMPLETE" &&
      categoryMissionStatus === "COMPLETE"
    )
      return "CURRENT";

    return "PENDING";
  })();

  return (
    <div className="space-y-3">
      <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0">
        Primeiros passos
      </h2>

      <Mission
        title="1. Adicione o primeiro tipo de produto"
        description="O primeiro passo é cadastrar um tipo de produto.
        Pode ser camisa, caneca, moletom, etc. Você poderá adicionar vários tipos,
        mas vamos começar com o primeiro."
        status={productTypeMissionStatus}
        href={routes.productTypes.sub.createFirst.url}
      />

      <Mission
        title="2. Adicione a primeira categoria (Opcional)"
        description="O segundo passo é cadastrar a categoria. Por exemplo:
        dia das mães, dia dos namorados, carnaval, feminino, masculino, etc."
        status={categoryMissionStatus}
        href={routes.categories.sub.createFirst.url}
        isOptional
      />

      <Mission
        title="3. Adicione o primeiro item de catálogo"
        description="Agora, você pode adicionar o item de catálogo vinculado 
        ao tipo de produto que criou."
        status={catalogItemMissionStatus}
        href={routes.catalogItems.sub.createFirst.url}
      />
    </div>
  );
}
