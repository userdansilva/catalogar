import { notFound } from "next/navigation";
import { PublicCatalogItemDetail } from "@/components/catalog/public-catalog-item-detail";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";

const ASCIIforAt = "%40"; // @

export default async function Page({
  params,
}: {
  params: Promise<{
    reference: string;
    slug: string;
  }>;
}) {
  const { slug: slugWithAt, reference } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  const catalog = await prisma.catalog.findFirst({
    where: {
      slug,
      publishedAt: { not: null },
    },
    include: {
      productTypes: {
        where: {
          disabledAt: null,
        },
      },
      categories: {
        where: {
          disabledAt: null,
        },
      },
      theme: {
        include: {
          logo: true,
        },
      },
      company: true,
      catalogItems: {
        where: {
          disabledAt: null,
        },
        include: {
          productType: true,
          categories: true,
          images: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!catalog) {
    notFound();
  }

  if (!catalog.company) {
    throw new Error("Company not found for catalog");
  }

  const catalogItem = catalog.catalogItems.find(
    (item) => Number(item.reference) === Number(reference),
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
      <PrevButton url={routes.public.url(slug)} />

      <PublicCatalogItemDetail
        baseUrl={routes.public.url(slug)}
        catalogItem={catalogItem}
        company={catalog.company}
        relatedCatalogItems={paginatedCatalogItems}
      />
    </div>
  );
}
