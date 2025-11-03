import { notFound } from "next/navigation";
import { PrevButton } from "@/components/inputs/prev-button";
import { PublicCatalogItemDetail } from "@/components/catalog/public-catalog-item-detail";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { ExpectedError } from "@/components/error-handling/expected-error";

export default async function Page({
  params,
}: {
  params: Promise<{
    reference: string;
  }>;
}) {
  const { reference } = await params;

  const [error, data] = await getPublicCatalogBySlug();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const catalog = data.data;

  const catalogItem = catalog.catalogItems.find(
    (item) => item.reference === Number(reference),
  );

  if (!catalogItem) {
    notFound();
  }

  const relatedCatalogItems = filterCatalogItems(
    catalog.catalogItems,
    {
      query: `${catalogItem.categories.map((category) => category.name).toString()}, ${catalogItem.productType.name}`,
    },
    {
      hideIfProductTypeIsDisabled: true,
    },
  );

  const paginatedCatalogItems = paginate(relatedCatalogItems, {
    perPage: 6,
    currentPage: 1,
  });

  return (
    <div className="max-w-7xl space-y-6 md:container">
      <PrevButton url={process.env.NEXT_PUBLIC_BASE_URL as string} />

      <PublicCatalogItemDetail
        baseUrl={process.env.NEXT_PUBLIC_BASE_URL as string}
        catalogItem={catalogItem}
        company={catalog.company}
        relatedCatalogItems={paginatedCatalogItems}
      />
    </div>
  );
}
