import { CatalogItems } from "@/components/catalog/catalog-items";
import { CategoriesFilter } from "@/components/catalog/categories-filter";
import { ProductsFilter } from "@/components/catalog/products-filter";
import { QueryFilter } from "@/components/catalog/query-filter";
import { getCategories } from "@/services/get-categories";
import { getProducts } from "@/services/get-products";
import { Suspense } from "react";

export default async function Preview() {
  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();

  return (
    <div className="container space-y-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-2/3">
          <QueryFilter />
        </div>

        <ProductsFilter products={products} />

        <CategoriesFilter categories={categories} />
      </div>

      <Suspense fallback={<span>Carregando catálogo...</span>}>
        <CatalogItems currentPage={1} />
      </Suspense>
    </div>
  );
}
