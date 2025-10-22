"use server";

import { revalidateTag } from "next/cache";
import { postCatalogItem } from "@/services/post-catalog-item";
import { ExpectedError } from "@/classes/ExpectedError";
import { createCatalogItemSchema } from "@/schemas/catalog-item";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { tags } from "@/tags";

export const createCatalogItemAction = authActionClientWithUser
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
        images,
        price,
        categoryIds,
        isDisabled,
      },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await postCatalogItem({
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
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "");
      }

      return {
        category: data.data,
        message: data.meta?.message,
      };
    },
  );
