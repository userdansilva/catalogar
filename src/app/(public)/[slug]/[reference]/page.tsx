import { PublicCatalogItemDetail } from "@/components/public-catalog-item-detail";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { notFound } from "next/navigation";

const ASCIIforAt = "%40"; // @

export default async function Page({
  params,
}: {
  params: Promise<{
    reference: string
    slug: string
  }>
}) {
  const { slug: slugWithAt, reference } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  const { data: catalog } = await getPublicCatalogBySlug(slug);

  const catalogItem = catalog.catalogItems
    .find((item) => item.reference === Number(reference));

  if (!catalogItem) return null;

  const relatedCatalogItems = filterCatalogItems(catalog.catalogItems, {
    query: `${catalogItem.categories.map((category) => category.name).toString()}, ${catalogItem.productType.name}`,
  }, {
    hideIfProductTypeIsDisabled: true,
  });

  const paginatedCatalogItems = paginate(relatedCatalogItems, {
    perPage: 6,
    currentPage: 1,
  });

  return (
    <PublicCatalogItemDetail
      catalogItem={catalogItem}
      theme={catalog.theme}
      company={catalog.company}
      relatedCatalogItems={paginatedCatalogItems}
    />
  );
}
