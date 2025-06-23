import { CatalogItems } from "@/components/catalog-items";
import { CategoriesFilter } from "@/components/categories-filter";
import { Button } from "@/components/inputs/button";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { ProductTypesFilter } from "@/components/product-types-filter";
import { QueryFilter } from "@/components/query-filter";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: routes.catalogItems.title,
};

const ITEMS_PER_PAGE = 16;

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
  const { data: catalogItems } = await getCatalogItems();

  const searchParams = await props.searchParams;

  const query = searchParams?.q || "";
  const productTypeSlug = searchParams?.produto || "";
  const categorySlug = searchParams?.categoria || "";
  const currentPage = Number(searchParams?.p) || 1;

  return (
    <Section>
      <SectionHeader
        title="Meus Itens"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <div className="space-y-6">
          <Button asChild size="lg">
            <Link href={routes.catalogItems.sub.new.url}>
              <Plus className="size-4" />
              Criar Item
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

          <CatalogItems
            query={query}
            catalogItems={catalogItems}
            productTypeSlug={productTypeSlug}
            categorySlug={categorySlug}
            currentPage={currentPage}
            perPage={ITEMS_PER_PAGE}
          />
        </div>
      </SectionContent>
    </Section>
  );
}
