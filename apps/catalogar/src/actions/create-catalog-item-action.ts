"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCatalogItemSchema } from "@/schemas/catalog-item";

export const createCatalogItemAction = authActionClient
  .inputSchema(createCatalogItemSchema)
  .metadata({
    actionName: "create-catalog-item",
  })
  .action(
    async ({
      parsedInput: {
        title,
        caption,
        productTypeId,
        categoryIds,
        images,
        price,
      },
      ctx: {
        session: { user },
      },
    }) => {
      const reference = await generateUniqueReference({
        currentCatalogId: user.currentCatalogId,
      });

      const catalogItem = await prisma.catalogItem.create({
        data: {
          title,
          caption,
          price: price ? price.replace(",", ".") : null,
          reference,
          catalogId: user.currentCatalogId,
          productTypeId,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
          images: {
            createMany: {
              data: images.map((image) => ({
                catalogId: user.currentCatalogId,
                name: image.fileName,
                position: image.position,
                size: image.size,
                width: image.width,
                height: image.height,
                altText: image.altText,
                url: image.url,
              })),
            },
          },
        },
        include: {
          catalog: true,
        },
      });

      if (catalogItem.catalog.publishedAt && catalogItem.catalog.slug) {
        revalidateTag(`public-catalog-${catalogItem.catalog.slug}`, "max");
      }

      return {
        catalogItem: {
          ...catalogItem,
          price: catalogItem.price?.toString() ?? null,
        },
      };
    },
  );

async function generateUniqueReference({
  currentCatalogId,
}: {
  currentCatalogId: string;
}) {
  // Gerar entre 1_000 e 9_999
  let reference = 0;
  let isUnique = false;

  while (!isUnique) {
    reference = Math.floor(1000 + Math.random() * 9000); // Gera um número de 4 dígitos

    const existingItem = await prisma.catalogItem.findFirst({
      where: {
        reference,
        catalogId: currentCatalogId,
      },
    });

    if (!existingItem) {
      isUnique = true; // Se não existir, é único
    }
  }

  return reference;
}
