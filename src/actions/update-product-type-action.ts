"use server";

import { revalidateTag } from "next/cache";
import slugify from "slugify";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { productTypeSchema } from "./schema";
import { ProductType } from "@/types/api-types";
import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";

export const updateProductTypeAction = authActionClient
  .schema(productTypeSchema)
  .metadata({
    actionName: "update-product-type",
  })
  .action(
    async ({
      parsedInput: { id, name, isDisabled },
      ctx: { Authorization, user },
    }) => {
      try {
        const res = await api.put<ApiResponse<ProductType>>(
          `/v1/product-types/${id}`,
          {
            name,
            slug: slugify(name, { lower: true }),
            isDisabled,
          },
          {
            headers: {
              Authorization,
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
        returnValidationErrorsIfExists(e, productTypeSchema);
        throw e;
      }
    },
  );
