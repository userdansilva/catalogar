"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { getProductTypeById } from "@/services/get-product-type-by-id";
import { ProductType } from "@/types/api-types";
import { routes } from "@/routes";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { api } from "./api";
import { authActionClient } from "./safe-action";
import { productTypeStatusToggleSchema } from "./schema";

export const toggleProductTypeStatusAction = authActionClient
  .schema(productTypeStatusToggleSchema)
  .metadata({
    actionName: "switch-product-type-enable",
  })
  .action(async ({
    parsedInput: {
      id, redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      const { data: productType } = await getProductTypeById(id);

      const res = await api.put<ApiResponse<ProductType>>(`/v1/product-types/${id}`, {
        ...productType,
        isDisabled: !productType.isDisabled,
        redirectTo,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.productTypes.getAll);
      if (id) {
        revalidateTag(tags.productTypes.getById(id));
      }

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        const path = routes.public.url(user.currentCatalog.slug);
        revalidatePath(path, "layout");
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { productType: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, productTypeStatusToggleSchema);
      throw e;
    }
  });
