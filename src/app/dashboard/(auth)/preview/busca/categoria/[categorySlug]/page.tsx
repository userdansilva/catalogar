import { notFound } from "next/navigation";
import { StoreQueryFilter } from "@/components/filters/store-query-filter";
import { ProductType } from "@/generated/prisma/client";
import { StoreProductTypesFilter } from "@/components/filters/store-product-types-filter";
import { routes } from "@/routes";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { CatalogNoResults } from "@/components/catalog/catalog-no-results";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { PublicCatalogItem } from "@/components/catalog/public-catalog-item";
import { getSession } from "@/utils/get-session";
import { getPreviewCatalog } from "@/services/get-preview-catalog";

const ITEMS_PER_PAGE = 16;

export const instant = false;

type PageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    p?: string;
    busca?: string;
    produto?: string;
  }>;
};

/**
 * Melhorar maps, tem em excesso
 */
export default async function Page({ params, searchParams }: PageProps) {
  const { categorySlug } = await params;

  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  const { busca, produto, p } = await searchParams;

  const query = busca || "";

  const currentCategory = catalog.categories.find(
    (category) => category.slug === categorySlug,
  );

  if (!currentCategory) {
    notFound();
  }

  const productTypeSlug = produto || "";
  const currentPage = p ? Number(p) : 1;

  const filteredProductTypes = catalog.catalogItems
    .filter((catalogItem) =>
      catalogItem.categories.find((category) => category.slug === categorySlug),
    )
    .reduce((accumulator, currentValue) => {
      if (
        !accumulator.find(
          ({ id }) =>
            id === currentValue.productType.id &&
            !currentValue.productType.disabledAt,
        )
      ) {
        accumulator.push(currentValue.productType);
      }

      return accumulator;
    }, [] as ProductType[])
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredCatalogItems = filterCatalogItems(
    catalog.catalogItems,
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
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        <div className="w-full self-center sm:w-2/3">
          <StoreQueryFilter
            currentQuery={query}
            sendTo={routes.preview.sub.searchCategory.url(categorySlug)}
          />
        </div>

        <h1 className="text-center text-3xl font-semibold">
          {currentCategory.name}
        </h1>

        {filteredProductTypes.length >= 2 && (
          <StoreProductTypesFilter
            productTypes={filteredProductTypes}
            currentproductTypeSlug={productTypeSlug}
          />
        )}

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
    </div>
  );
}
