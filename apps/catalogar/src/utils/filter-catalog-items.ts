import Fuse from "fuse.js";
import type { Prisma } from "@/generated/prisma/client";

export function filterCatalogItems(
  catalogItems: Prisma.CatalogItemGetPayload<{
    include: {
      categories: true;
      productType: true;
      images: true;
    };
  }>[],
  filters: {
    query: string;
    productTypeSlug?: string;
    categorySlug?: string;
  },
  config: {
    hideIfProductTypeIsDisabled?: boolean;
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

      if (
        catalogItem.categories.length >= 1 &&
        catalogItem.categories.every((category) => category.disabledAt)
      ) {
        return false;
      }

      if (filters.productTypeSlug && !filters.categorySlug)
        return isProductTypeMatch;
      if (!filters.productTypeSlug && filters.categorySlug)
        return isCategoryMatch;

      return isProductTypeMatch && isCategoryMatch;
    });
}
