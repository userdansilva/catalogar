import { notFound } from "next/navigation";
import { getPublicCatalog } from "@/services/get-public-catalog";
import { Metadata } from "next";
import { StoreSearchLink } from "@/components/store-search-link";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { CatalogNoResults } from "@/components/catalog/catalog-no-results";
import { PublicCatalogItem } from "@/components/catalog/public-catalog-item";
import { routes } from "@/routes";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";

const ASCIIforAt = "%40"; // @
const ITEMS_PER_PAGE = 16;

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    p: string;
    busca: string;
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
      title: `${catalog.company?.name}${catalog.company?.slogan ? `: ${catalog.company.slogan} ` : ""}`,
      description: catalog.company?.description,
    };
  } catch {
    return {
      title: "Não Encontrado",
    };
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug: slugWithAt } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  const { catalog } = await getPublicCatalog(slug);

  if (!catalog) {
    return notFound();
  }

  const { busca, p } = await searchParams;

  const query = busca || "";
  const currentPage = Number(p) || 1;

  const filteredCatalogItems = filterCatalogItems(
    catalog.catalogItems,
    {
      query: query ?? "",
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
    <div className="flex flex-col items-center space-y-10">
      <div className="w-full sm:w-2/3">
        <StoreSearchLink catalog={catalog} currentQuery={query} />
      </div>

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
  );
}
