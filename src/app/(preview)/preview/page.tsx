import { CatalogItems } from "@/components/catalog/catalog-items";
import CatalogItemsSkeleton from "@/components/catalog/catalog-items-skeleton";
import { CategoriesFilter } from "@/components/catalog/categories-filter";
import { ProductsFilter } from "@/components/catalog/products-filter";
import { QueryFilter } from "@/components/catalog/query-filter";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { getProducts } from "@/services/get-products";
import { Metadata } from "next";
import { Suspense } from "react";

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

  const searchParams = await props.searchParams;

  const query = searchParams?.q || "";
  const productSlug = searchParams?.produto || "";
  const categorySlug = searchParams?.categoria || "";
  const currentPage = Number(searchParams?.p) || 1;

  return (
    <div className="container space-y-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-2/3">
          <QueryFilter
            mode="preview"
            currentQuery={query}
          />
        </div>

        <ProductsFilter
          mode="preview"
          products={products}
          currentProductSlug={productSlug}
        />

        <CategoriesFilter
          mode="preview"
          categories={categories}
          currentCategorySlug={categorySlug}
        />
      </div>

      <Suspense
        key={query + productSlug + categorySlug + currentPage}
        fallback={<CatalogItemsSkeleton />}
      >
        <CatalogItems
          query={query}
          productSlug={productSlug}
          categorySlug={categorySlug}
          currentPage={currentPage}
          perPage={ITEMS_PER_PAGE}
          hideIfProductIsDisabled
        />
      </Suspense>
    </div>
  );
}
