import { notFound } from "next/navigation";
import { PublicCatalogItemDetail } from "@/components/catalog/public-catalog-item-detail";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { getSession } from "@/utils/get-session";
import { paginate } from "@/utils/paginate";

export default async function Page({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const session = await getSession();

  const { catalogItems, company, ...catalog } =
    await prisma.catalog.findUniqueOrThrow({
      where: {
        id: session.user.currentCatalogId,
      },
      include: {
        catalogItems: {
          include: {
            categories: true,
            productType: true,
            images: true,
          },
        },
        company: true,
      },
    });

  const { reference } = await params;

  const catalogItem = catalogItems.find(
    (item) => Number(item.reference) === Number(reference),
  );

  if (!catalogItem) {
    notFound();
  }

  const relatedCatalogItems = filterCatalogItems(
    catalogItems.map((item) => ({
      ...item,
      price: item.price?.toString() ?? null,
    })),
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
        catalog={catalog}
        baseUrl={routes.preview.url}
        catalogItem={{
          ...catalogItem,
          price: catalogItem.price?.toString() ?? null,
        }}
        company={company || undefined}
        relatedCatalogItems={paginatedCatalogItems.map((item) => ({
          ...item,
          price: catalogItem.price?.toString() ?? null,
        }))}
      />
    </div>
  );
}
