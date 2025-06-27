import { PrevButton } from "@/components/prev-button";
import { PublicCatalogItemDetail } from "@/components/public-catalog-item-detail";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getUser } from "@/services/get-user";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";

export default async function Page({
  params,
}: {
  params: Promise<{ reference: string }>
}) {
  const { data: user } = await getUser();

  const { reference } = await params;
  const { data: catalogItems } = await getCatalogItems();

  const catalogItem = catalogItems
    .find((item) => item.reference === Number(reference));

  if (!catalogItem) return null;

  const relatedCatalogItems = filterCatalogItems(catalogItems, {
    query: `${catalogItem.categories.map((category) => category.name).toString()}, ${catalogItem.productType.name}`,
  }, {
    hideIfProductTypeIsDisabled: true,
  });

  const paginatedCatalogItems = paginate(relatedCatalogItems, {
    perPage: 6,
    currentPage: 1,
  });

  if (!user.currentCatalog.theme || !user.currentCatalog.company) {
    return null;
  }

  return (
    <div className="max-w-7xl space-y-6 md:container">
      <PrevButton
        fallbackUrl={routes.public.url(routes.preview.url)}
      />

      <PublicCatalogItemDetail
        baseUrl={routes.preview.url}
        catalogItem={catalogItem}
        theme={user.currentCatalog.theme}
        company={user.currentCatalog.company}
        relatedCatalogItems={paginatedCatalogItems}
      />
    </div>
  );
}
