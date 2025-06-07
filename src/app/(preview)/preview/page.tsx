import { CatalogItems } from "@/components/catalog/catalog-items";
import CatalogItemsSkeleton from "@/components/catalog/catalog-items-skeleton";
import { CategoriesFilter } from "@/components/catalog/categories-filter";
import { ProductTypesFilter } from "@/components/catalog/product-types-filter";
import { QueryFilter } from "@/components/catalog/query-filter";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: routes.preview.title,
};

const ITEMS_PER_PAGE = 16;

export default async function Preview(props: {
  searchParams?: Promise<{
    categoria?: string
    produto?: string
    q?: string
    p?: string
  }>
}) {
  const { data: user } = await getUser();
  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

  const searchParams = await props.searchParams;

  const query = searchParams?.q || "";
  const productTypeSlug = searchParams?.produto || "";
  const categorySlug = searchParams?.categoria || "";
  const currentPage = Number(searchParams?.p) || 1;

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full sm:w-2/3">
          <QueryFilter
            mode="preview"
            currentQuery={query}
            primaryColor={user.currentCatalog.theme?.primaryColor}
            secondaryColor={user.currentCatalog.theme?.secondaryColor}
          />
        </div>

        {productTypes.length >= 2 && (
          <ProductTypesFilter
            mode="preview"
            productTypes={productTypes}
            currentProductTypeSlug={productTypeSlug}
          />
        )}

        {categories.length >= 2 && (
          <CategoriesFilter
            mode="preview"
            categories={categories}
            currentCategorySlug={categorySlug}
          />
        )}
      </div>

      <Suspense
        key={query + productTypeSlug + categorySlug + currentPage}
        fallback={<CatalogItemsSkeleton />}
      >
        <CatalogItems
          query={query}
          productTypeSlug={productTypeSlug}
          categorySlug={categorySlug}
          currentPage={currentPage}
          perPage={ITEMS_PER_PAGE}
          hideIfProductTypeIsDisabled
        />
      </Suspense>
    </div>
  );
}
