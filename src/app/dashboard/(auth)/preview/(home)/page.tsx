import type { Metadata } from "next";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { CatalogNoResults } from "@/components/catalog/catalog-no-results";
import { PublicCatalogItem } from "@/components/catalog/public-catalog-item";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { paginate } from "@/utils/paginate";
import { StoreSearchLink } from "@/components/store-search-link";
import { getPreviewCatalog } from "@/services/get-preview-catalog";

export const instant = false;

export const metadata: Metadata = {
  title: routes.preview.title,
};

const ITEMS_PER_PAGE = 16;

export default async function Preview({
  searchParams,
}: {
  searchParams: Promise<{
    p?: string;
    busca?: string;
    categoria?: string;
    produto?: string;
  }>;
}) {
  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  const { busca, p, categoria, produto } = await searchParams;

  const query = busca || "";
  const productTypeSlug = produto || "";
  const categorySlug = categoria || "";
  const currentPage = Number(p) || 1;

  const normalizedCatalogItems = catalog.catalogItems.map((catalogItem) => ({
    ...catalogItem,
    price: catalogItem.price?.toString() ?? null,
  }));

  const filteredCatalogItems = filterCatalogItems(
    normalizedCatalogItems,
    {
      query: query ?? "",
      productTypeSlug,
      categorySlug,
    },
    {
      hideIfProductTypeIsDisabled: true,
      hideIfCategoryIsDisabled: true,
    },
  );

  const catalogItemsTotal = filteredCatalogItems.length;

  const paginatedCatalogItems = paginate(filteredCatalogItems, {
    currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="w-full sm:w-2/3">
        <StoreSearchLink catalog={catalog} isPreview />
      </div>

      {paginatedCatalogItems.length === 0 ? (
        <CatalogNoResults query={query} page={currentPage} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCatalogItems.map((catalogItem) => (
              <PublicCatalogItem
                key={catalogItem.id}
                catalogItem={catalogItem}
                basePath={routes.preview.url}
                unoptimized
              />
            ))}
          </div>

          {catalogItemsTotal > ITEMS_PER_PAGE && (
            <CatalogPagination
              totalItems={catalogItemsTotal}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
