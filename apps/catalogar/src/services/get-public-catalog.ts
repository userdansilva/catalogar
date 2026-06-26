import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";

export async function getPublicCatalog(slug: string) {
  "use cache";
  cacheTag(`public-catalog-${slug}`);

  const catalog = await prisma.catalog.findUniqueOrThrow({
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
          categories: {
            where: {
              disabledAt: null,
            },
          },
          images: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  const normalizedCatalog = {
    ...catalog,
    catalogItems:
      catalog?.catalogItems.map((catalogItem) => ({
        ...catalogItem,
        price: catalogItem.price ? catalogItem.price.toString() : null,
      })) || [],
  };

  return { catalog: normalizedCatalog };
}
