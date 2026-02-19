import type { CatalogItem } from "@/schemas/catalog-item";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { CatalogNoResults } from "./catalog-no-results";
import { CatalogPagination } from "./catalog-pagination";
import { PrivateCatalogItem } from "./private-catalog-item";
import { PublicCatalogItem } from "./public-catalog-item";

type CatalogItemsProps = {
  query?: string;
  catalogItems: CatalogItem[];
  productTypeSlug?: string;
  categorySlug?: string;
  currentPage?: number;
  perPage: number;
  isPublic?: boolean;
  unoptimized?: boolean;
  searchParamNames: {
    page: string;
    query: string;
  };
};

export function CatalogItems({
  query,
  catalogItems,
  productTypeSlug,
  categorySlug,
  currentPage,
  perPage,
  isPublic,
  unoptimized,
  searchParamNames,
}: CatalogItemsProps) {
  const filteredCatalogItems = filterCatalogItems(
    catalogItems,
    {
      query: query ?? "",
      productTypeSlug,
      categorySlug,
    },
    {
      hideIfProductTypeIsDisabled: isPublic,
    },
  );

  const catalogItemsTotal = filteredCatalogItems.length;

  const paginatedCatalogItems = paginate(filteredCatalogItems, {
    currentPage,
    perPage,
  });

  if (paginatedCatalogItems.length === 0) {
    return (
      <CatalogNoResults
        query={query}
        searchParamNames={searchParamNames}
        page={currentPage}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedCatalogItems.map((catalogItem) =>
          isPublic ? (
            <PublicCatalogItem
              key={catalogItem.id}
              catalogItem={catalogItem}
              unoptimized={unoptimized}
            />
          ) : (
            <PrivateCatalogItem
              key={catalogItem.id}
              catalogItem={catalogItem}
            />
          ),
        )}
      </div>

      {catalogItemsTotal > perPage && (
        <CatalogPagination
          totalItems={catalogItemsTotal}
          itemsPerPage={perPage}
          currentPage={currentPage}
          searchParamNames={searchParamNames}
        />
      )}
    </div>
  );
}
