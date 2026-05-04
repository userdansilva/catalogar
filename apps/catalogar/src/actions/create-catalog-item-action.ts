"use server";

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
      parsedInput: { title, caption, productTypeId, categoryIds, images },
      ctx: { user },
    }) => {
      const reference = await generateUniqueReference({
        currentCatalogId: user.currentCatalog.id,
      });

      const catalogItem = await prisma.catalogItem.create({
        data: {
          title,
          caption,
          reference,
          catalogId: user.currentCatalog.id,
          productTypeId,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
          images: {
            createMany: {
              data: images.map((image) => ({
                catalogId: user.currentCatalog.id,
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
