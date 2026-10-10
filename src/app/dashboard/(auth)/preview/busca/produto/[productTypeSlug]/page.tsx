import { ProductCard } from "@/components/(store)/cards/product-card";
import { CatalogNoResults } from "@/components/catalog/catalog-no-results";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { PublicCatalogItem } from "@/components/catalog/public-catalog-item";
import { StoreCategoriesFilter } from "@/components/filters/store-categories-filter";
import { StoreQueryFilter } from "@/components/filters/store-query-filter";
import { Category } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { getPreviewCatalog } from "@/services/get-preview-catalog";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { getSession } from "@/utils/get-session";
import { paginate } from "@/utils/paginate";
import { notFound } from "next/navigation";

const ITEMS_PER_PAGE = 16;

export const instant = false;

type PageProps = {
  params: Promise<{
    productTypeSlug: string;
  }>;
  searchParams: Promise<{
    p?: string;
    busca?: string;
    categoria?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { productTypeSlug } = await params;

  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  const { busca, categoria, p } = await searchParams;

  const query = busca || "";

  const currentProductType = catalog.productTypes.find(
    (productType) => productType.slug === productTypeSlug,
  );

  if (!currentProductType) {
    notFound();
  }

  const categorySlug = categoria || "";
  const currentPage = p ? Number(p) : 1;

  const filteredCategories = catalog.catalogItems
    .filter((catalogItem) => catalogItem.productType.slug === productTypeSlug)
    .reduce((accumulator, currentValue) => {
      currentValue.categories.forEach((category) => {
        if (
          !accumulator.find(
            ({ id }) => id === category.id && !category.disabledAt,
          )
        ) {
          accumulator.push(category);
        }
      });

      return accumulator;
    }, [] as Category[])
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

  const productTypeImage = currentProductType.catalogItems[0].images[0];

  return (
    <div className="max-w-7xl space-y-6 md:container">
      <div className="flex flex-col space-y-6">
        <div className="w-full sm:w-2/3">
          <StoreQueryFilter
            currentQuery={query}
            sendTo={routes.preview.sub.searchProductType.url(productTypeSlug)}
          />
        </div>

        <ProductCard
          imageUrl={productTypeImage.url}
          name={currentProductType.name}
        />

        {filteredCategories.length >= 1 && (
          <StoreCategoriesFilter
            categories={filteredCategories}
            currentCategorySlug={categorySlug}
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
    </div>
  );
}
