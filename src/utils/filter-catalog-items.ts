import { CatalogItem } from "@/types/api-types";
import Fuse from "fuse.js";

export function filterCatalogItems(
  catalogItems: CatalogItem[],
  filters: {
    query: string
    productTypeSlug?: string
    categorySlug?: string
  },
  config: {
    hideIfProductTypeIsDisabled?: boolean
  } = {},
) {
  let result = [...catalogItems];

  if (filters.query) {
    const fuse = new Fuse(catalogItems, {
      keys: [
        "title",
        "caption",
        "productType.name",
        "category.name",
      ],
      ignoreDiacritics: true,
    });

    result = fuse.search(filters.query)
      .map((_) => _.item);
  }

  return result
    .sort((a, b) => new Date(b.createdAt).getTime()
      - new Date(a.createdAt).getTime())
    .filter((catalogItem) => {
      const isProductTypeMatch = filters.productTypeSlug
        ? catalogItem.productType.slug === filters.productTypeSlug
        : true;

      const isCategoryMatch = filters.categorySlug
        ? catalogItem.categories
          .some((category) => category.slug === filters.categorySlug)
        : true;

      const isProductTypeEnabled = config.hideIfProductTypeIsDisabled
        ? !catalogItem.productType.isDisabled
        : true;

      if (!isProductTypeEnabled) return false;

      if (filters.productTypeSlug && !filters.categorySlug) return isProductTypeMatch;
      if (!filters.productTypeSlug && filters.categorySlug) return isCategoryMatch;

      return isProductTypeMatch && isCategoryMatch;
    });
}
