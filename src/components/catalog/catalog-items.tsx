import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { getCatalogItems } from "@/services/get-catalog-items";
import { CatalogItem } from "./catalog-item";
import { CatalogPagination } from "./catalog-pagination";

export async function CatalogItems({
  query,
  productTypeSlug,
  categorySlug,
  currentPage,
  perPage,
  withActions,
  hideIfProductTypeIsDisabled,
  unoptimized,
}: {
  query: string
  productTypeSlug: string
  categorySlug: string
  currentPage: number
  perPage: number
  withActions?: boolean
  hideIfProductTypeIsDisabled?: boolean
  unoptimized?: boolean
}) {
  const { data: catalogItems } = await getCatalogItems();

  const filteredCatalogItems = filterCatalogItems(catalogItems, {
    query,
    productTypeSlug,
    categorySlug,
    currentPage,
    perPage,
  }, {
    hideIfProductTypeIsDisabled,
  });

  const catalogItemsTotal = filteredCatalogItems.length;

  const paginatedCatalogItems = paginate(filteredCatalogItems, {
    currentPage,
    perPage,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedCatalogItems.map((catalogItem) => (
          <CatalogItem
            key={catalogItem.id}
            catalogItem={catalogItem}
            withActions={withActions}
            unoptimized={unoptimized}
          />
        ))}
      </div>

      {catalogItemsTotal > perPage && (
        <CatalogPagination
          totalItems={catalogItemsTotal}
          itemsPerPage={perPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
