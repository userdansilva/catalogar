import { Separator } from "@/components/ui/separator";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CategoriesFilter } from "@/components/filters/categories-filter";
import { ProductTypesFilter } from "@/components/filters/product-types-filter";
import { QueryFilter } from "@/components/filters/query-filter";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";
import { buttonVariants } from "@/components/ui/button";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { CatalogNoResults } from "@/components/catalog/catalog-no-results";
import { PrivateCatalogItem } from "@/components/catalog/private-catalog-item";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";

export const instant = false;

export const metadata: Metadata = {
  title: routes.catalogItems.title,
};

const ITEMS_PER_PAGE = 16;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    p?: string;
    busca?: string;
    categoria?: string;
    produto?: string;
  }>;
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

  const normalizedCatalogItems = catalogItems.map((catalogItem) => ({
    ...catalogItem,
    price: catalogItem.price?.toString() ?? null,
  }));

  const filteredCatalogItems = filterCatalogItems(
    normalizedCatalogItems,
    {
      query: query ?? "",
      productTypeSlug,
      categorySlug,
    },
    {
      hideIfProductTypeIsDisabled: false,
      hideIfCategoryIsDisabled: false,
    },
  );

  const catalogItemsTotal = filteredCatalogItems.length;

  const paginatedCatalogItems = paginate(filteredCatalogItems, {
    currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-6">
        <div className="flex flex-row gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {routes.catalogItems.title}
          </h2>

          <Link
            href={{
              pathname: routes.preview.url,
              query: {
                callbackUrl: routes.catalogItems.url,
              },
            }}
            className={buttonVariants({
              variant: "link",
              className: "underline underline-offset-2",
            })}
          >
            <SquareArrowOutUpRight /> Acessar Preview
          </Link>
        </div>

        <Separator />
      </div>

      <Link
        href={routes.catalogItems.sub.new.url}
        className={buttonVariants({
          size: "lg",
        })}
      >
        <Plus />
        Adicionar
      </Link>

      <div className="flex flex-col gap-2 lg:flex-row">
        <QueryFilter currentQuery={query} />

        <div className="flex flex-row gap-2 *:flex-1">
          <ProductTypesFilter
            productTypes={productTypes}
            currentProductTypeSlug={productTypeSlug}
          />

          <CategoriesFilter
            categories={categories}
            currentCategorySlug={categorySlug}
          />
        </div>
      </div>

      {paginatedCatalogItems.length === 0 ? (
        <CatalogNoResults query={query} page={currentPage} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCatalogItems.map((catalogItem) => (
              <PrivateCatalogItem
                key={catalogItem.id}
                catalogItem={catalogItem}
              />
            ))}
          </div>

          {catalogItemsTotal > ITEMS_PER_PAGE && (
            <CatalogPagination
              totalItems={catalogItemsTotal}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
