"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiResponse } from "@/types/api-response";
import { tags } from "@/tags";
import { CatalogItem } from "@/types/api-types";
import { routes } from "@/routes";
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
      const res = await api.post<ApiResponse<CatalogItem>>("/v1/catalog-items", {
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

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        const path = routes.public.url(user.currentCatalog.slug);
        revalidatePath(path, "layout");
      }

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
