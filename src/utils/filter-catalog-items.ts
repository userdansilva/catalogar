import Fuse from "fuse.js";
import type { Prisma } from "@/generated/prisma/client";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    categories: true;
    images: true;
    productType: true;
  };
}>;

export function filterCatalogItems(
  catalogItems: (Omit<CatalogItemRaw, "price"> & {
    price: string | null;
  })[],
  filters: {
    query: string;
    productTypeSlug?: string;
    categorySlug?: string;
  },
  config: {
    hideIfProductTypeIsDisabled?: boolean;
    hideIfCategoryIsDisabled?: boolean;
  } = {},
) {
  let result = [...catalogItems];

  if (filters.query) {
    const fuse = new Fuse(catalogItems, {
      keys: ["title", "caption", "productType.name", "category.name"],
      ignoreDiacritics: true,
      // threshold: 0.6, // default
    });

    result = fuse.search(filters.query).map((_) => _.item);
  }

  return result
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .filter((catalogItem) => {
      const isProductTypeMatch = filters.productTypeSlug
        ? catalogItem.productType.slug === filters.productTypeSlug
        : true;

      const isCategoryMatch = filters.categorySlug
        ? catalogItem.categories.some(
            (category) => category.slug === filters.categorySlug,
          )
        : true;

      const isProductTypeEnabled = config.hideIfProductTypeIsDisabled
        ? !catalogItem.productType.disabledAt
        : true;

      if (!isProductTypeEnabled) return false;

      /**
       * Se o item de catálogo tem apenas uma categoria, e ela está
       * desabilitada. Deve ser ocutado se `hideIfCategoryIsDisabled: true`
       *
       * Se o item de catálogo tem mais de uma categoria, e ela está
       * desabilitada. Deve ser exibido.
       */
      const isSomeCategoryEnabled = config.hideIfCategoryIsDisabled
        ? catalogItem.categories.length >= 1 &&
          catalogItem.categories.some((category) => !category.disabledAt)
        : true;

      if (!isSomeCategoryEnabled) return false;

      if (filters.productTypeSlug && !filters.categorySlug)
        return isProductTypeMatch;
      if (!filters.productTypeSlug && filters.categorySlug)
        return isCategoryMatch;

      return isProductTypeMatch && isCategoryMatch;
    });
}
