"use server";

import { revalidateTag } from "next/cache";
import slugify from "slugify";
import { tags } from "@/tags";
import { putCategory } from "@/services/put-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";
import { authActionClient } from "@/lib/next-safe-action";
import { updateCategorySchema } from "@/schemas/category";

export const updateCategoryAction = authActionClient
  .inputSchema(updateCategorySchema)
  .metadata({
    actionName: "update-category",
  })
  .action(
    async ({
      parsedInput: { id, name, textColor, backgroundColor, isDisabled },
    }) => {
      const [categoryError, categoryData] = await putCategory(id, {
        name,
        slug: slugify(name, { lower: true }),
        textColor,
        backgroundColor,
        isDisabled,
      });

      if (categoryError) {
        throw new ExpectedError(categoryError);
      }

      const [userError, userData] = await getUser();

      if (userError) {
        throw new ExpectedError(userError);
      }

      // revalidateTag(tags.categories.getAll);
      // revalidateTag(tags.categories.getById(id));

      const { currentCatalog } = userData.data;

      // if (currentCatalog?.isPublished && currentCatalog.slug) {
      //   revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
      // }

      return {
        category: categoryData.data,
        message: categoryData.meta?.message,
      };
    },
  );
