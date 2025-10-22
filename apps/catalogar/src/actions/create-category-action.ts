"use server";

import slugify from "slugify";
import { revalidateTag } from "next/cache";
import { postCategory } from "@/services/post-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { createCategorySchema } from "@/schemas/category";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { tags } from "@/tags";

export const createCategoryAction = authActionClientWithUser
  .inputSchema(createCategorySchema)
  .metadata({
    actionName: "create-category",
  })
  .action(
    async ({
      parsedInput: { name, textColor, backgroundColor, isDisabled },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await postCategory({
        name,
        slug: slugify(name, { lower: true }),
        textColor,
        backgroundColor,
        isDisabled,
      });

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        category: data.data,
        message: data.meta?.message,
      };
    },
  );
