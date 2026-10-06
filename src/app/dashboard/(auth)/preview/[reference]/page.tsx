import { notFound } from "next/navigation";
import { PublicCatalogItemDetail } from "@/components/catalog/public-catalog-item-detail";
import { routes } from "@/routes";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { getSession } from "@/utils/get-session";
import { paginate } from "@/utils/paginate";
import { getPreviewCatalog } from "@/services/get-preview-catalog";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;

  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

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
    <PublicCatalogItemDetail
      baseUrl={routes.preview.url}
      catalogItem={catalogItem}
      company={company || undefined}
      relatedCatalogItems={paginatedCatalogItems}
      catalog={currentCatalog}
      unoptimized
    />
  );
}
