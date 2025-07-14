import { CatalogPagination } from "./catalog-pagination";
import { PublicCatalogItem } from "./public-catalog-item";
import { PrivateCatalogItem } from "./private-catalog-item";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { CatalogItem } from "@/types/api-types";

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
}: {
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
  };
}) {
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
