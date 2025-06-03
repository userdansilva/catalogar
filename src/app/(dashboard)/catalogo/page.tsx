import { CatalogItems } from "@/components/catalog/catalog-items";
import CatalogItemsSkeleton from "@/components/catalog/catalog-items-skeleton";
import { CategoriesFilter } from "@/components/catalog/categories-filter";
import { ProductTypesFilter } from "@/components/catalog/product-types-filter";
import { QueryFilter } from "@/components/catalog/query-filter";
import { Button } from "@/components/inputs/button";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: routes.catalogItems.title,
};

const ITEMS_PER_PAGE = 6;

export default async function Page(props: {
  searchParams?: Promise<{
    categoria?: string
    produto?: string
    q?: string
    p?: string
  }>
}) {
  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

  const searchParams = await props.searchParams;

  const query = searchParams?.q || "";
  const productTypeSlug = searchParams?.produto || "";
  const categorySlug = searchParams?.categoria || "";
  const currentPage = Number(searchParams?.p) || 1;

  return (
    <Section>
      <SectionHeader
        title="Meus itens"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <div className="space-y-6">
          <Button asChild size="lg">
            <Link href={routes.catalogItems.sub.new.url}>
              <Plus className="size-4" />
              Criar item
            </Link>
          </Button>

          <div className="flex space-x-2">
            <QueryFilter
              mode="dashboard"
              currentQuery={query}
            />

            <ProductTypesFilter
              mode="dashboard"
              productTypes={productTypes}
              currentProductTypeSlug={productTypeSlug}
            />

            <CategoriesFilter
              mode="dashboard"
              categories={categories}
              currentCategorySlug={categorySlug}
            />
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
              withActions
            />
          </Suspense>
        </div>
      </SectionContent>
    </Section>
  );
}
