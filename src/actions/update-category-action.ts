"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/api-types";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { authActionClient } from "./safe-action";
import { categorySchema } from "./schema";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";

export const updateCategoryAction = authActionClient
  .schema(categorySchema)
  .metadata({
    actionName: "update-category",
  })
  .action(async ({
    parsedInput: {
      id, name, slug, textColor, backgroundColor, isDisabled, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.put<ApiResponse<Category>>(`/v1/categories/${id}`, {
        name, slug, textColor, backgroundColor, isDisabled,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.categories.getAll);

      if (id) {
        revalidateTag(tags.categories.getById(id));
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { category: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, categorySchema);
      throw e;
    }
  });
