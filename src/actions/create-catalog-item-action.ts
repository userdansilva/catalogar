"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiResponse } from "@/types/api-response";
import { tags } from "@/tags";
import { CatalogItem } from "@/types/api-types";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { catalogItemSchema } from "./schema";

export const createCatalogItemAction = authActionClient
  .schema(catalogItemSchema)
  .metadata({
    actionName: "create-catalog-item",
  })
  .action(async ({
    parsedInput: {
      title,
      caption,
      productId,
      images,
      price,
      categoryIds,
      isDisabled,
      redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.post<ApiResponse<CatalogItem>>("/v1/catalog-items", {
        title,
        caption,
        productId,
        images: images.map((image) => ({
          name: image.name,
          position: image.position,
        })),
        price,
        categoryIds,
        isDisabled,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.catalogItems.getAll);

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { catalogItem: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      console.error(e);
      returnValidationErrorsIfExists(e, catalogItemSchema);
      throw e;
    }
  });
