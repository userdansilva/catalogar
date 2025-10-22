"use server";

import slugify from "slugify";
import { revalidateTag } from "next/cache";
import { putCategory } from "@/services/put-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { updateCategorySchema } from "@/schemas/category";
import { tags } from "@/tags";

export const updateCategoryAction = authActionClientWithUser
  .inputSchema(updateCategorySchema)
  .metadata({
    actionName: "update-category",
  })
  .action(
    async ({
      parsedInput: { id, name, textColor, backgroundColor, isDisabled },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await putCategory(id, {
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
