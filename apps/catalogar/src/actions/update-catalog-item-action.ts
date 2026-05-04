"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateCatalogItemSchema } from "@/schemas/catalog-item";

export const updateCatalogItemAction = authActionClientWithUser
  .inputSchema(updateCatalogItemSchema)
  .metadata({
    actionName: "update-catalog-item",
  })
  .action(
    async ({
      parsedInput: {
        id,
        title,
        images,
        isDisabled,
        caption,
        productTypeId,
        categoryIds,
      },
      ctx: { user },
    }) => {
      const catalogItem = await prisma.catalogItem.update({
        where: {
          id,
          catalogId: user.currentCatalog.id,
        },
        data: {
          title,
          caption,
          productTypeId,
          categories: {
            set: categoryIds.map((id) => ({ id })),
          },
          disabledAt: isDisabled ? new Date() : null,
          images: {
            deleteMany: {},
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
