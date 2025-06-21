"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/api-types";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { getCategoryById } from "@/services/get-category-by-id";
import { routes } from "@/routes";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { api } from "./api";
import { authActionClient } from "./safe-action";
import { categoryStatusToggleSchema } from "./schema";

export const toggleCategoryStatusAction = authActionClient
  .schema(categoryStatusToggleSchema)
  .metadata({
    actionName: "toggle-status-category",
  })
  .action(async ({
    parsedInput: {
      id, redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      const { data: category } = await getCategoryById(id);

      const res = await api.put<ApiResponse<Category>>(`/v1/categories/${id}`, {
        ...category,
        isDisabled: !category.isDisabled,
        redirectTo,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.categories.getAll);
      if (id) {
        revalidateTag(tags.categories.getById(id));
      }

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidatePath(routes.public.url(user.currentCatalog.slug), "layout");
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { category: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, categoryStatusToggleSchema);
      throw e;
    }
  });
