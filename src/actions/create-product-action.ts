"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiResponse } from "@/types/api-response";
import { Product } from "@/types/api-types";
import { tags } from "@/tags";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { productSchema } from "./schema";

export const createProductAction = authActionClient
  .schema(productSchema)
  .metadata({
    actionName: "create-product",
  })
  .action(async ({
    parsedInput: {
      name, slug, isDisabled, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.post<ApiResponse<Product>>("/v1/products", {
        name, slug, isDisabled,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.products.getAll);

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { product: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, productSchema);
      throw e;
    }
  });
