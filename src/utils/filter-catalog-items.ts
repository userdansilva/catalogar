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

  if (filters.productSlug || filters.categorySlug) {
    result = result.filter((catalogItem) => {
      const isProductMatch = filters.productSlug
        ? catalogItem.product.slug === filters.productSlug
        : true;

      const isCategoryMatch = filters.categorySlug
        ? catalogItem.categories
          .some((category) => category.slug === filters.categorySlug)
        : true;

      if (filters.productSlug && !filters.categorySlug) return isProductMatch;
      if (!filters.productSlug && filters.categorySlug) return isCategoryMatch;

      return isProductMatch && isCategoryMatch;
    });
  }

  const startIndex = (filters.currentPage - 1) * filters.perPage;
  const endIndex = startIndex + filters.perPage;

  return result.slice(startIndex, endIndex);
}
