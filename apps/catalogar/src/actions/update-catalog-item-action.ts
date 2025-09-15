"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { catalogItemSchema } from "./schema";
import { tags } from "@/tags";
import { putCatalogItem } from "@/services/put-catalog-item";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";

export const updateCatalogItemAction = authActionClient
  .inputSchema(catalogItemSchema)
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
    }) => {
      if (!id) throw new Error("Id não encontrado");

      const [catalogItemError, catalogItemData] = await putCatalogItem(id, {
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
      revalidateTag(tags.catalogItems.getById(id));

      const { currentCatalog } = userData.data;

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
      }

      return {
        catalogItem: catalogItemData.data,
        message: catalogItemData.meta.message,
      };
    },
  );
