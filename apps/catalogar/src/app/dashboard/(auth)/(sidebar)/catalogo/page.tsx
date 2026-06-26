import { Separator } from "@catalogar/ui/components/separator";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CatalogItems } from "@/components/catalog/catalog-items";
import { CategoriesFilter } from "@/components/filters/categories-filter";
import { ProductTypesFilter } from "@/components/filters/product-types-filter";
import { QueryFilter } from "@/components/filters/query-filter";
import { Button } from "@/components/inputs/button";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import type { SearchParams } from "@/types/system";
import { defineSearchParamNames } from "@/utils/define-search-param-names";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.catalogItems.title,
};

const ITEMS_PER_PAGE = 16;

const SEARCH_PARAM_NAMES = defineSearchParamNames({
  page: "p",
  query: "busca",
  categorySlug: "categoria",
  productSlug: "produto",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams<typeof SEARCH_PARAM_NAMES>>;
}) {
  const session = await getSession();

  const { catalogItems, productTypes, categories } =
    await prisma.catalog.findUniqueOrThrow({
      where: {
        id: session.user.currentCatalogId,
      },
      include: {
        productTypes: true,
        categories: true,
        catalogItems: {
          include: {
            categories: true,
            productType: true,
            images: true,
          },
        },
      },
    });

  const { categoria, p, produto, busca } = await searchParams;

  const query = busca;
  const productTypeSlug = produto;
  const categorySlug = categoria;
  const currentPage = p ? Number(p) : 1;

  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-6">
        <div className="flex gap-4 flex-row">
          <h2 className="text-2xl font-bold tracking-tight">
            {routes.catalogItems.title}
          </h2>

          <Button
            variant="link"
            className="underline underline-offset-2"
            asChild
          >
            <Link
              href={{
                pathname: routes.preview.url,
                query: {
                  callbackUrl: routes.catalogItems.url,
                },
              }}
            >
              <SquareArrowOutUpRight /> Acessar Preview
            </Link>
          </Button>
        </div>

        <Separator />
      </div>

      <Button asChild size="lg">
        <Link href={routes.catalogItems.sub.new.url}>
          <Plus />
          Adicionar
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
        catalogItems={catalogItems.map((catalogItem) => ({
          ...catalogItem,
          price: catalogItem.price?.toString() ?? null,
        }))}
        productTypeSlug={productTypeSlug}
        categorySlug={categorySlug}
        currentPage={currentPage}
        perPage={ITEMS_PER_PAGE}
        searchParamNames={SEARCH_PARAM_NAMES}
      />
    </div>
  );
}
