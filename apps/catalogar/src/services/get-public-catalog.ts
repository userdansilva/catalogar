import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";

export async function getPublicCatalog(slug: string) {
  "use cache";
  cacheTag(`public-catalog-${slug}`);

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

  return { catalog };
}
