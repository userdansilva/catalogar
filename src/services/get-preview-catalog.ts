import prisma from "@/lib/prisma";
import { cache } from "react";

export const getPreviewCatalog = cache(async (catalogId: string) => {
  const catalog = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: catalogId,
    },
    include: {
      productTypes: {
        where: {
          disabledAt: null,
        },
        include: {
          catalogItems: {
            take: 1,
            select: {
              images: {
                take: 1,
                orderBy: {
                  position: "asc",
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
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

  const normalizedCatalog = {
    ...catalog,
    catalogItems:
      catalog?.catalogItems.map((catalogItem) => ({
        ...catalogItem,
        price: catalogItem.price ? catalogItem.price.toString() : null,
      })) || [],
  };

  return { catalog: normalizedCatalog };
});
