"use server";

import { revalidateTag } from "next/cache";
import slugify from "slugify";
import { authActionClient } from "./safe-action";
import { categorySchema } from "./schema";
import { tags } from "@/tags";
import { putCategory } from "@/services/put-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";

export const updateCategoryAction = authActionClient
  .inputSchema(categorySchema)
  .metadata({
    actionName: "update-category",
  })
  .action(
    async ({
      parsedInput: { id, name, textColor, backgroundColor, isDisabled },
    }) => {
      if (!id) throw new Error("Id não encontrado");

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

      revalidateTag(tags.categories.getAll);
      revalidateTag(tags.categories.getById(id));

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
