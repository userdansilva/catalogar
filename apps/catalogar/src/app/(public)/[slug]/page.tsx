import { notFound } from "next/navigation";
import { CategoriesFilter } from "@/components/filters/categories-filter";
import { ProductTypesFilter } from "@/components/filters/product-types-filter";
import { QueryFilter } from "@/components/filters/query-filter";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { CatalogItems } from "@/components/catalog/catalog-items";
import type { SearchParams } from "@/types/system";
import { defineSearchParamNames } from "@/utils/define-search-param-names";
import { ExpectedError } from "@/components/error-handling/expected-error";

const ASCIIforAt = "%40"; // @
const ITEMS_PER_PAGE = 16;

const SEARCH_PARAM_NAMES = defineSearchParamNames({
  page: "p",
  query: "busca",
  categorySlug: "categoria",
  productSlug: "produto",
});

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams<typeof SEARCH_PARAM_NAMES>>;
}) {
  const { slug: slugWithAt } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  const [error, data] = await getPublicCatalogBySlug(slug);

  if (error) {
    return <ExpectedError error={error} />;
  }

  const catalog = data.data;

  const { busca, categoria, p, produto } = await searchParams;

  const query = busca || "";
  const productTypeSlug = produto || "";
  const categorySlug = categoria || "";
  const currentPage = Number(p) || 1;

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full sm:w-2/3">
          <QueryFilter
            mode="preview"
            currentQuery={query}
            primaryColor={catalog.theme.primaryColor}
            secondaryColor={catalog.theme.secondaryColor}
            searchParamNames={SEARCH_PARAM_NAMES}
          />
        </div>

        {catalog.productTypes.length >= 2 && (
          <ProductTypesFilter
            mode="preview"
            productTypes={catalog.productTypes}
            currentProductTypeSlug={productTypeSlug}
            searchParamNames={SEARCH_PARAM_NAMES}
          />
        )}

        {catalog.categories.length >= 2 && (
          <CategoriesFilter
            mode="preview"
            categories={catalog.categories}
            currentCategorySlug={categorySlug}
            searchParamNames={SEARCH_PARAM_NAMES}
          />
        )}
      </div>

      <CatalogItems
        query={query}
        catalogItems={catalog.catalogItems}
        productTypeSlug={productTypeSlug}
        categorySlug={categorySlug}
        currentPage={currentPage}
        perPage={ITEMS_PER_PAGE}
        isPublic
        searchParamNames={SEARCH_PARAM_NAMES}
      />
    </div>
  );
}
