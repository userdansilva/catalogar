"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { catalogItemSchema } from "./schema";
import { CatalogItem } from "@/types/api-types";
import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";

export const createCatalogItemAction = authActionClient
  .schema(catalogItemSchema)
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
      ctx: { Authorization, user },
    }) => {
      try {
        const res = await api.post<ApiResponse<CatalogItem>>(
          "/v1/catalog-items",
          {
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
          },
          {
            headers: {
              Authorization,
            },
          }
        );

        revalidateTag(tags.catalogItems.getAll);

        if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
          revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
        }

        return { catalogItem: res.data.data, message: res.data.meta?.message };
      } catch (e) {
        console.error(e);
        returnValidationErrorsIfExists(e, catalogItemSchema);
        throw e;
      }
    }
  );
