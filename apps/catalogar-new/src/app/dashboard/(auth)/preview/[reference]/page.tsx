import { notFound, RedirectType, redirect } from "next/navigation";
import { PublicCatalogItemDetail } from "@/components/catalog/public-catalog-item-detail";
import { ExpectedError } from "@/components/error-handling/expected-error";
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
  const [userError, userData] = await getUser();

  if (userError) {
    return <ExpectedError error={userError} />;
  }

  const user = userData.data;

  if (!user.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const [catalogItemsError, catalogItemsData] = await getCatalogItems();

  if (catalogItemsError) {
    return <ExpectedError error={catalogItemsError} />;
  }

  const catalogItems = catalogItemsData.data;

  const { reference } = await params;

  const catalogItem = catalogItems.find(
    (item) => item.reference === Number(reference),
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

  if (!user.currentCatalog.theme) {
    redirect(routes.theme.sub.new.url, RedirectType.replace);
  }

  if (!user.currentCatalog.company) {
    redirect(routes.company.sub.new.url, RedirectType.replace);
  }

  return (
    <div className="max-w-7xl space-y-6 md:container">
      <PrevButton url={routes.public.url(routes.preview.url)} />

      <PublicCatalogItemDetail
        baseUrl={routes.preview.url}
        catalogItem={catalogItem}
        company={user.currentCatalog.company}
        relatedCatalogItems={paginatedCatalogItems}
      />
    </div>
  );
}
