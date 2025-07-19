import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CatalogItems } from "@/components/catalog-items";
import { CategoriesFilter } from "@/components/filters/categories-filter";
import { Button } from "@/components/inputs/button";
import { ProductTypesFilter } from "@/components/filters/product-types-filter";
import { QueryFilter } from "@/components/filters/query-filter";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { SearchParams } from "@/types/system";

export const metadata: Metadata = {
  title: routes.catalogItems.title,
};

const ITEMS_PER_PAGE = 16;

const SEARCH_PARAM_NAMES = {
  page: "p",
  query: "busca",
  categorySlug: "categoria",
  productSlug: "produto",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams<typeof SEARCH_PARAM_NAMES>;
}) {
  const { data: catalogItems } = await getCatalogItems();

  if (catalogItems.length === 0) {
    redirect(routes.catalogItems.sub.createFirst.url);
  }

  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

  const { categoria, p, produto, busca } = await searchParams;

  const query = busca;
  const productTypeSlug = produto;
  const categorySlug = categoria;
  const currentPage = p ? Number(p) : 1;

  return (
    <div className="space-y-6">
      <Button asChild size="lg">
        <Link href={routes.catalogItems.sub.new.url}>
          <Plus />
          Adicionar Item
        </Link>
      </Button>

      <div className="flex flex-col gap-2 lg:flex-row">
        <QueryFilter
          mode="dashboard"
          currentQuery={query}
          searchParamNames={SEARCH_PARAM_NAMES}
        />

        <div className="flex flex-row gap-2 *:flex-1">
          <ProductTypesFilter
            mode="dashboard"
            productTypes={productTypes}
            currentProductTypeSlug={productTypeSlug}
            searchParamNames={SEARCH_PARAM_NAMES}
          />

          <CategoriesFilter
            mode="dashboard"
            categories={categories}
            currentCategorySlug={categorySlug}
            searchParamNames={SEARCH_PARAM_NAMES}
          />
        </div>
      </div>

      <CatalogItems
        query={query}
        catalogItems={catalogItems}
        productTypeSlug={productTypeSlug}
        categorySlug={categorySlug}
        currentPage={currentPage}
        perPage={ITEMS_PER_PAGE}
        searchParamNames={SEARCH_PARAM_NAMES}
      />
    </div>
  );
}
