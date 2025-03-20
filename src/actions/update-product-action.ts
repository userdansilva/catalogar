"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { Product } from "@/types/api-types";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { productSchema } from "./schema";

export const updateProductAction = authActionClient
  .schema(productSchema)
  .metadata({
    actionName: "update-product",
  })
  .action(async ({
    parsedInput: {
      id, name, slug, isDisabled, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.put<ApiResponse<Product>>(`/v1/products/${id}`, {
        name, slug, isDisabled,
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
      returnValidationErrorsIfExists(e, productSchema);
      throw e;
    }
  });
