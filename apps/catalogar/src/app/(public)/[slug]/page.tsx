import { notFound } from "next/navigation";
import { CatalogItems } from "@/components/catalog/catalog-items";
import { CategoriesFilter } from "@/components/filters/categories-filter";
import { ProductTypesFilter } from "@/components/filters/product-types-filter";
import { QueryFilter } from "@/components/filters/query-filter";
import prisma from "@/lib/prisma";
import type { SearchParams } from "@/types/system";
import { defineSearchParamNames } from "@/utils/define-search-param-names";

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

  const catalog = await prisma.catalog.findFirst({
    where: {
      slug,
      publishedAt: { not: null },
    },
    include: {
      productTypes: {
        where: {
          disabledAt: null,
        },
      },
      categories: {
        where: {
          disabledAt: null,
        },
      },
      theme: {
        include: {
          logo: true,
        },
      },
      company: true,
      catalogItems: {
        where: {
          disabledAt: null,
        },
        include: {
          productType: true,
          categories: true,
          images: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!catalog) {
    return notFound();
  }

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
            primaryColor={catalog.theme?.primaryColor || "var(--foreground)"}
            secondaryColor={
              catalog.theme?.secondaryColor || "var(--background)"
            }
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
