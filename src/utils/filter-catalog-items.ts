import { CatalogItem } from "@/types/api-types";
import Fuse from "fuse.js";

export function filterCatalogItems(
  catalogItems: CatalogItem[],
  filters: {
    query: string
    productSlug: string
    categorySlug: string
    currentPage: number
    perPage: number
  },
  config: {
    hideIfProductIsDisabled?: boolean
  } = {},
) {
  let result = [...catalogItems];

  if (filters.query) {
    const fuse = new Fuse(catalogItems, {
      keys: [
        "title",
        "caption",
        "product.name",
        "category.name",
      ],
    });

    result = fuse.search(filters.query)
      .map((_) => _.item);
  }

  return result.filter((catalogItem) => {
    const isProductMatch = filters.productSlug
      ? catalogItem.product.slug === filters.productSlug
      : true;

    const isCategoryMatch = filters.categorySlug
      ? catalogItem.categories
        .some((category) => category.slug === filters.categorySlug)
      : true;

    const isProductEnabled = config.hideIfProductIsDisabled
      ? !catalogItem.product.isDisabled
      : true;

    if (!isProductEnabled) return false;

    if (filters.productSlug && !filters.categorySlug) return isProductMatch;
    if (!filters.productSlug && filters.categorySlug) return isCategoryMatch;

    return isProductMatch && isCategoryMatch;
  });
}
