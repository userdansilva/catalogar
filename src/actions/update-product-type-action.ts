"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { ProductType } from "@/types/api-types";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { productTypeSchema } from "./schema";

export const updateProductTypeAction = authActionClient
  .schema(productTypeSchema)
  .metadata({
    actionName: "update-product-type",
  })
  .action(async ({
    parsedInput: {
      id, name, slug, isDisabled, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.put<ApiResponse<ProductType>>(`/v1/product-types/${id}`, {
        name, slug, isDisabled,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.productTypes.getAll);

      if (id) {
        revalidateTag(tags.productTypes.getById(id));
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { productType: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, productTypeSchema);
      throw e;
    }
  });
