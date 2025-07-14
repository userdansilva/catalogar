"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { api } from "./api";
import { authActionClient } from "./safe-action";
import { productTypeStatusToggleSchema } from "./schema";
import { ApiResponse } from "@/types/api-response";
import { tags } from "@/tags";
import { getProductTypeById } from "@/services/get-product-type-by-id";
import { ProductType } from "@/types/api-types";

export const toggleProductTypeStatusAction = authActionClient
  .schema(productTypeStatusToggleSchema)
  .metadata({
    actionName: "switch-product-type-enable",
  })
  .action(async ({ parsedInput: { id }, ctx: { accessToken, user } }) => {
    try {
      const { data: productType } = await getProductTypeById(id);

      const res = await api.put<ApiResponse<ProductType>>(
        `/v1/product-types/${id}`,
        {
          ...productType,
          isDisabled: !productType.isDisabled,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      revalidateTag(tags.productTypes.getAll);
      if (id) {
        revalidateTag(tags.productTypes.getById(id));
      }

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
      }

      return { productType: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, productTypeStatusToggleSchema);
      throw e;
    }
  });
