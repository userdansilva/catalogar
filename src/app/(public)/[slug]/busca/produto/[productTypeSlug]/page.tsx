import { notFound } from "next/navigation";
import { getPublicCatalog } from "@/services/get-public-catalog";
import { Metadata } from "next";
import { StoreQueryFilter } from "@/components/filters/store-query-filter";
import Image from "next/image";
import { StoreCategoriesFilter } from "@/components/filters/store-categories-filter";
import { Category } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { CatalogNoResults } from "@/components/catalog/catalog-no-results";
import { PublicCatalogItem } from "@/components/catalog/public-catalog-item";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";

const ASCIIforAt = "%40"; // @
const ITEMS_PER_PAGE = 16;

export const instant = false;

type PageProps = {
  params: Promise<{
    slug: string;
    productTypeSlug: string;
  }>;
  searchParams: Promise<{
    p?: string;
    busca?: string;
    categoria?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: slugWithAt } = await params;
  const slug = slugWithAt.replace("@", "");

  try {
    const { catalog } = await getPublicCatalog(slug);

    return {
      title: `Busca - ${catalog.company?.name}`,
    };
  } catch {
    return {
      title: "Não Encontrado",
    };
  }
}

/**
 * Melhorar maps, tem em excesso
 */
export default async function Page({ params, searchParams }: PageProps) {
  const { slug: slugWithAt, productTypeSlug } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");
  const { catalog } = await getPublicCatalog(slug);

  if (!catalog) {
    return notFound();
  }

  const { busca, categoria, p } = await searchParams;

  const query = busca || "";

  const currentProductType = catalog.productTypes.find(
    (productType) => productType.slug === productTypeSlug,
  );

  if (!currentProductType) {
    notFound();
  }

  const categorySlug = categoria || "";
  const currentPage = p ? Number(p) : 1;

  const filteredCategories = catalog.catalogItems
    .filter((catalogItem) => catalogItem.productType.slug === productTypeSlug)
    .reduce((accumulator, currentValue) => {
      currentValue.categories.forEach((category) => {
        if (
          !accumulator.find(
            ({ id }) => id === category.id && !category.disabledAt,
          )
        ) {
          accumulator.push(category);
        }
      });

      return accumulator;
    }, [] as Category[])
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredCatalogItems = filterCatalogItems(
    catalog.catalogItems,
    {
      query: query ?? "",
      productTypeSlug,
      categorySlug,
    },
    {
      hideIfProductTypeIsDisabled: true,
      hideIfCategoryIsDisabled: true,
    },
  );

  const catalogItemsTotal = filteredCatalogItems.length;

  const paginatedCatalogItems = paginate(filteredCatalogItems, {
    currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  return (
    <div className="max-w-7xl space-y-6 md:container">
      <div className="flex flex-col space-y-6">
        <div className="w-full sm:w-2/3">
          <StoreQueryFilter
            currentQuery={query}
            sendTo={routes.public.sub.searchProductType.url(
              slug,
              productTypeSlug,
            )}
          />
        </div>

        <div className="border-input flex w-full flex-row items-center gap-3 rounded-lg border p-2">
          <div className="size-16">
            <Image
              src={currentProductType.catalogItems[0].images[0].url}
              width={600}
              height={600}
              alt=""
              className="rounded-full"
            />
          </div>
          <h1 className="text-xl font-semibold">{currentProductType.name}</h1>
        </div>

        {filteredCategories.length >= 1 && (
          <StoreCategoriesFilter
            categories={filteredCategories}
            currentCategorySlug={categorySlug}
          />
        )}

        {paginatedCatalogItems.length === 0 ? (
          <CatalogNoResults query={query} page={currentPage} />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedCatalogItems.map((catalogItem) => (
                <PublicCatalogItem
                  key={catalogItem.id}
                  catalogItem={catalogItem}
                  basePath={routes.public.url(slug)}
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
    </div>
  );
}
