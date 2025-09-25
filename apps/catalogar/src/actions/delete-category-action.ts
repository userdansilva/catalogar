"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { deleteCategory } from "@/services/delete-category";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";
import { deleteSchema } from "@/schemas/others";
import { authActionClient } from "@/lib/next-safe-action";

export const deleteCategoryAction = authActionClient
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-category-item",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [categoryError] = await deleteCategory(id);

    if (categoryError) {
      throw new ExpectedError(categoryError);
    }

    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    revalidateTag(tags.catalogItems.getAll);
    revalidateTag(tags.catalogItems.getByIdAny);
    revalidateTag(tags.categories.getAll);
    revalidateTag(tags.categories.getById(id));

    const { currentCatalog } = userData.data;

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
    }
  });
