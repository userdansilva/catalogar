"use server";

import { revalidateTag } from "next/cache";
import slugify from "slugify";
import { authActionClient } from "./safe-action";
import { categorySchema } from "./schema";
import { tags } from "@/tags";
import { postCategory } from "@/services/post-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";

export const createCategoryAction = authActionClient
  .inputSchema(categorySchema)
  .metadata({
    actionName: "create-category",
  })
  .action(
    async ({
      parsedInput: { name, textColor, backgroundColor, isDisabled },
    }) => {
      const [categoryError, categoryData] = await postCategory({
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

      revalidateTag(tags.categories.getAll);

      const { currentCatalog } = userData.data;

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
      }

      return {
        category: categoryData.data,
        message: categoryData.meta?.message,
      };
    },
  );
