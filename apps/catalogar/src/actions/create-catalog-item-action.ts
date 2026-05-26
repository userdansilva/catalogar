"use server";

import { revalidateTag } from "next/cache";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCatalogItemSchema } from "@/schemas/catalog-item";

export const createCatalogItemAction = authActionClientWithUser
  .inputSchema(createCatalogItemSchema)
  .metadata({
    actionName: "create-catalog-item",
  })
  .action(
    async ({
      parsedInput: { title, caption, productTypeId, categoryIds, images, price },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const reference = await generateUniqueReference({
        currentCatalogId: currentCatalog.id,
      });

      const catalogItem = await prisma.catalogItem.create({
        data: {
          title,
          caption,
          price: price ? price.replace(",", ".") : null,
          reference,
          catalogId: currentCatalog.id,
          productTypeId,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
          images: {
            createMany: {
              data: images.map((image) => ({
                catalogId: currentCatalog.id,
                name: image.fileName,
                position: image.position,
                size: image.sizeInBytes,
                width: image.width,
                height: image.height,
                altText: image.altText,
                url: image.url,
              })),
            },
          },
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return {
        catalogItem,
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
