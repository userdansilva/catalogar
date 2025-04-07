import { CatalogItems } from "@/components/catalog/catalog-items";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { CategoriesFilter } from "@/components/catalog/categories-filter";
import { ProductsFilter } from "@/components/catalog/products-filter";
import { QueryFilter } from "@/components/catalog/query-filter";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProducts } from "@/services/get-products";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.preview.title,
};

const ITEMS_PER_PAGE = 6;

export default async function Preview(props: {
  searchParams?: Promise<{
    categoria?: string
    produto?: string
    q?: string
    p?: string
  }>
}) {
  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();
  const { data: catalogItems } = await getCatalogItems();

  const searchParams = await props.searchParams;

  const query = searchParams?.q || "";
  const productSlug = searchParams?.produto || "";
  const categorySlug = searchParams?.categoria || "";
  const currentPage = Number(searchParams?.p) || 1;

  const filteredCatalogItems = filterCatalogItems(catalogItems, {
    query,
    productSlug,
    categorySlug,
    currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  const catalogItemsTotal = filteredCatalogItems.length;

  const paginatedCatalogItems = paginate(filteredCatalogItems, {
    currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  return (
    <div className="container space-y-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-2/3">
          <QueryFilter
            currentQuery={query}
          />
        </div>

        <ProductsFilter
          products={products}
          currentProductSlug={productSlug}
        />

        <CategoriesFilter
          categories={categories}
          currentCategorySlug={categorySlug}
        />
      </div>

      <CatalogItems
        catalogItems={paginatedCatalogItems}
      />

      {catalogItemsTotal > ITEMS_PER_PAGE && (
        <CatalogPagination
          totalItems={catalogItemsTotal}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
