import { notFound } from "next/navigation";
import { PublicCatalogItemDetail } from "@/components/catalog/public-catalog-item-detail";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getPublicCatalog } from "@/services/get-public-catalog";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { Metadata } from "next";

const ASCIIforAt = "%40"; // @

export const instant = false;

type PageProps = {
  params: Promise<{
    reference: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: slugWithAt, reference } = await params;
  const slug = slugWithAt.replace("@", "");

  try {
    const { catalog } = await getPublicCatalog(slug);
    const { catalogItems, company } = catalog;

    const catalogItem = catalogItems.find(
      (item) => Number(item.reference) === Number(reference),
    );

    return {
      title: `${catalogItem?.title} - ${company?.name}`,
      description: catalogItem?.caption,
    };
  } catch {
    return {
      title: "Não Encontrado",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug: slugWithAt, reference } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  const { catalog } = await getPublicCatalog(slug);

  if (!catalog) {
    notFound();
  }

  if (!catalog.company) {
    throw new Error("Company not found for catalog");
  }

  const { catalogItems, company, ...currentCatalog } = catalog;

  const catalogItem = catalogItems.find(
    (item) => Number(item.reference) === Number(reference),
  );

  if (!catalogItem) {
    notFound();
  }

  const relatedCatalogItems = filterCatalogItems(
    catalogItems.filter((c) => c.id !== catalogItem.id),
    {
      query: "",
      categorySlug: catalogItem.categories[0]?.slug,
      productTypeSlug: catalogItem.productType.slug,
    },
    {
      hideIfProductTypeIsDisabled: true,
      hideIfCategoryIsDisabled: true,
    },
  );

  const paginatedCatalogItems = paginate(relatedCatalogItems, {
    perPage: 6,
    currentPage: 1,
  });

  return (
    <div className="max-w-7xl space-y-6 md:container">
      <PrevButton
        fallbackUrl={routes.public.url(slug)}
        className="text-black"
      />

      <PublicCatalogItemDetail
        baseUrl={routes.public.url(slug)}
        catalogItem={catalogItem}
        company={company}
        relatedCatalogItems={paginatedCatalogItems}
        catalog={currentCatalog}
      />
    </div>
  );
}
