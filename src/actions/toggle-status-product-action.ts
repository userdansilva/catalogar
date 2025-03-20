"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { getProductById } from "@/services/get-product-by-id";
import { Product } from "@/types/api-types";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { api } from "./api";
import { authActionClient } from "./safe-action";
import { productStatusToggleSchema } from "./schema";

export const toggleProductStatusAction = authActionClient
  .schema(productStatusToggleSchema)
  .metadata({
    actionName: "switch-product-enable",
  })
  .action(async ({
    parsedInput: {
      id, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const { data: product } = await getProductById(id);

      const res = await api.put<ApiResponse<Product>>(`/v1/products/${id}`, {
        ...product,
        isDisabled: !product.isDisabled,
        redirectTo,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.products.getAll);
      if (id) {
        revalidateTag(tags.products.getById(id));
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { product: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, productStatusToggleSchema);
      throw e;
    }
  });
