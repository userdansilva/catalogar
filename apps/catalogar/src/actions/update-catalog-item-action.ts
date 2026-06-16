"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateCatalogItemSchema } from "@/schemas/catalog-item";

export const updateCatalogItemAction = authActionClient
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
        price,
      },
      ctx: {
        session: { user },
      },
    }) => {
      const catalogItem = await prisma.catalogItem.update({
        where: {
          id,
          catalogId: user.currentCatalogId,
        },
        data: {
          title,
          caption,
          price: price ? price.replace(",", ".") : null,
          productTypeId,
          categories: {
            set: categoryIds.map((id) => ({ id })),
          },
          disabledAt: isDisabled ? new Date() : null,
          images: {
            deleteMany: {},
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
          categories: true,
          images: true,
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
