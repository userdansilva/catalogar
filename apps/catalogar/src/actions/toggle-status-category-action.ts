"use server";

import { revalidateTag } from "next/cache";
import { getCategory } from "@/services/get-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { putCategory } from "@/services/put-category";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { categoryStatusToggleSchema } from "@/schemas/category";
import { tags } from "@/tags";

export const toggleCategoryStatusAction = authActionClientWithUser
  .inputSchema(categoryStatusToggleSchema)
  .metadata({
    actionName: "toggle-status-category",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [getCategoryError, getCategoryData] = await getCategory(id);

      if (getCategoryError) {
        throw new ExpectedError(getCategoryError);
      }

      const category = getCategoryData.data;

      const [putCategoryError, putCategoryData] = await putCategory(id, {
        name: category.name,
        slug: category.slug,
        textColor: category.textColor,
        backgroundColor: category.backgroundColor,
        isDisabled: !category.isDisabled,
      });

      if (putCategoryError) {
        throw new ExpectedError(putCategoryError);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        category: putCategoryData.data,
        message: putCategoryData.meta?.message,
      };
    },
  );
