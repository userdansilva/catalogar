"use server";

import { revalidateTag } from "next/cache";
import { deleteCategory } from "@/services/delete-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { deleteSchema } from "@/schemas/others";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { tags } from "@/tags";

export const deleteCategoryAction = authActionClientWithUser
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-category-item",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error] = await deleteCategory(id);

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }
    },
  );
