"use server";

import { revalidateTag } from "next/cache";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { updateCatalogItemSchema } from "@/schemas/catalog-item";
import { putCatalogItem } from "@/services/put-catalog-item";
import { tags } from "@/tags";

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
        caption,
        productTypeId,
        images,
        price,
        categoryIds,
        isDisabled,
      },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await putCatalogItem({
        id,
        title,
        caption,
        productTypeId,
        images: images.map((image) => ({
          fileName: image.fileName,
          url: image.url,
          sizeInBytes: image.sizeInBytes,
          width: image.width,
          height: image.height,
          altText: image.altText,
          position: image.position,
        })),
        price,
        categoryIds,
        isDisabled,
      });

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        catalogItem: data.data,
        message: data.meta?.message,
      };
    },
  );
