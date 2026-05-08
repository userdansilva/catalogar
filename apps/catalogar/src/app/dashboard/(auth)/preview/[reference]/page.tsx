import { notFound } from "next/navigation";
import { PublicCatalogItemDetail } from "@/components/catalog/public-catalog-item-detail";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getUser } from "@/services/get-user";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";

export default async function Page({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const user = await getUser();

  const { catalogItems } = await getCatalogItems();
  const { reference } = await params;

  const catalogItem = catalogItems.find(
    (item) => Number(item.reference) === Number(reference),
  );

  if (!catalogItem) {
    notFound();
  }

  const relatedCatalogItems = filterCatalogItems(
    catalogItems,
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
      <PrevButton fallbackUrl={routes.preview.url} />

      <PublicCatalogItemDetail
        baseUrl={routes.preview.url}
        catalogItem={catalogItem}
        company={user.currentCatalog.company || undefined}
        relatedCatalogItems={paginatedCatalogItems}
      />
    </div>
  );
}
