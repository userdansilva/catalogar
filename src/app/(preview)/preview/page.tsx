import { CatalogItems } from "@/components/catalog/catalog-items";
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

type PreviewProps = {
  searchParams?: Promise<{
    categoria?: string;
    produto?: string;
    q?: string;
    p?: string;
  }>
}

export default async function Preview(props: PreviewProps) {
  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();

  const searchParams = await props.searchParams;

  const currentQuery = searchParams?.q || "";
  const currentProductSlug = searchParams?.produto || "";
  const currentCategorySlug = searchParams?.categoria || "";
  const currentPage = Number(searchParams?.p) || 1;

  return (
    <div className="container space-y-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-2/3">
          <QueryFilter
            currentQuery={currentQuery}
          />
        </div>

        <ProductsFilter
          products={products}
          currentProductSlug={currentProductSlug}
        />

        <CategoriesFilter
          categories={categories}
          currentCategorySlug={currentCategorySlug}
        />
      </div>

      <Suspense
        key={currentQuery
          + currentProductSlug
          + currentCategorySlug
          + currentPage}
        fallback={<span>Loading...</span>}
      >
        <CatalogItems
          query={currentQuery}
          productSlug={currentProductSlug}
          categorySlug={currentCategorySlug}
        // currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}
