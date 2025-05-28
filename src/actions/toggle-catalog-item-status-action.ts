"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { CatalogItem } from "@/types/api-types";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { getCatalogItemById } from "@/services/get-catalog-item-by-id";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { api } from "./api";
import { authActionClient } from "./safe-action";
import { catalogItemStatusToggleSchema } from "./schema";

export const toggleCatalogItemStatusAction = authActionClient
  .schema(catalogItemStatusToggleSchema)
  .metadata({
    actionName: "toggle-catalog-item-status",
  })
  .action(async ({
    parsedInput: {
      id, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const { data: catalogItem } = await getCatalogItemById(id);

      const res = await api.put<ApiResponse<CatalogItem>>(`/v1/catalog-items/${id}`, {
        title: catalogItem.title,
        caption: catalogItem.caption,
        productId: catalogItem.product.id,
        images: catalogItem.images.map((image) => ({
          fileName: image.fileName,
          position: image.position,
        })),
        price: catalogItem.price,
        categoryIds: catalogItem.categories.map((category) => category.id),
        isDisabled: !catalogItem.isDisabled,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.catalogItems.getAll);
      if (id) {
        revalidateTag(tags.catalogItems.getById(id));
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { catalogItem: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, catalogItemStatusToggleSchema);
      throw e;
    }
  });
