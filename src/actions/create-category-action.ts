"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/api-types";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import slugify from "slugify";
import { routes } from "@/routes";
import { authActionClient } from "./safe-action";
import { categorySchema } from "./schema";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";

export const createCategoryAction = authActionClient
  .schema(categorySchema)
  .metadata({
    actionName: "create-category",
  })
  .action(async ({
    parsedInput: {
      name, textColor, backgroundColor, isDisabled, redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      const res = await api.post<ApiResponse<Category>>("/v1/categories", {
        name,
        slug: slugify(name, { lower: true }),
        textColor,
        backgroundColor,
        isDisabled,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.categories.getAll);

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        const path = routes.public.url(user.currentCatalog.slug);
        revalidatePath(path, "layout");
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
