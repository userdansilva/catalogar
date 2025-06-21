"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { CatalogItem } from "@/types/api-types";
import { routes } from "@/routes";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { catalogItemSchema } from "./schema";

export const updateCatalogItemAction = authActionClient
  .schema(catalogItemSchema)
  .metadata({
    actionName: "update-catalog-item",
  })
  .action(async ({
    parsedInput: {
      id,
      title,
      caption,
      productTypeId,
      images,
      price,
      categoryIds,
      isDisabled,
      redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      const res = await api.put<ApiResponse<CatalogItem>>(`/v1/catalog-items/${id}`, {
        title,
        caption,
        productTypeId,
        images: images.map((image) => ({
          fileName: image.fileName,
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

      if (id) {
        revalidateTag(tags.catalogItems.getById(id));
      }

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidatePath(routes.public.url(user.currentCatalog.slug), "layout");
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { catalogItem: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, catalogItemSchema);
      throw e;
    }
  });
