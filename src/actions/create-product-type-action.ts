"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiResponse } from "@/types/api-response";
import { ProductType } from "@/types/api-types";
import { tags } from "@/tags";
import slugify from "slugify";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { productTypeSchema } from "./schema";

export const createProductTypeAction = authActionClient
  .schema(productTypeSchema)
  .metadata({
    actionName: "create-product-type",
  })
  .action(async ({
    parsedInput: {
      name, isDisabled, redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      const res = await api.post<ApiResponse<ProductType>>("/v1/product-types", {
        name, slug: slugify(name, { lower: true }), isDisabled,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.productTypes.getAll);

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { productType: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      console.error(e);

      returnValidationErrorsIfExists(e, productTypeSchema);
      throw e;
    }
  });
