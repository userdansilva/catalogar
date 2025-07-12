"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/api-types";
import { tags } from "@/tags";
import slugify from "slugify";
import { authActionClient } from "./safe-action";
import { categorySchema } from "./schema";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";

export const updateCategoryAction = authActionClient
  .schema(categorySchema)
  .metadata({
    actionName: "update-category",
  })
  .action(
    async ({
      parsedInput: { id, name, textColor, backgroundColor, isDisabled },
      ctx: { accessToken, user },
    }) => {
      try {
        const res = await api.put<ApiResponse<Category>>(
          `/v1/categories/${id}`,
          {
            name,
            slug: slugify(name, { lower: true }),
            textColor,
            backgroundColor,
            isDisabled,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        revalidateTag(tags.categories.getAll);

        if (id) {
          revalidateTag(tags.categories.getById(id));
        }

        if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
          revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
        }

        return { category: res.data.data, message: res.data.meta?.message };
      } catch (e) {
        returnValidationErrorsIfExists(e, categorySchema);
        throw e;
      }
    },
  );
