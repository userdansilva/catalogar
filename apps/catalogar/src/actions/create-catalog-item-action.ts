"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { catalogItemSchema } from "./schema";
import { tags } from "@/tags";
import { postCatalogItem } from "@/services/post-catalog-item";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";

export const createCatalogItemAction = authActionClient
  .inputSchema(catalogItemSchema)
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
    }) => {
      const [catalogItemError, catalogItemData] = await postCatalogItem({
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

      if (catalogItemError) {
        throw new ExpectedError(catalogItemError);
      }

      const [userError, userData] = await getUser();

      if (userError) {
        throw new ExpectedError(userError);
      }

      revalidateTag(tags.catalogItems.getAll);

      const { currentCatalog } = userData.data;

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
      }

      return {
        category: catalogItemData.data,
        message: catalogItemData.meta.message,
      };
    },
  );
