"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@catalogar/shared/next-safe-action";
import { DefaultApiError } from "@catalogar/shared/classes/default-api-error";
import { tag as sharedTag } from "@catalogar/shared/tags";
import { deleteCategorySchema } from "@/schemas";
import { deleteCategory } from "@/services/delete-category";
import { tag } from "@/tag";

export const deleteCategoryAction = authActionClient
  .inputSchema(deleteCategorySchema)
  .metadata({
    actionName: "delete-category-item",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [categoryError] = await deleteCategory(id);

    if (categoryError) {
      throw new DefaultApiError(categoryError);
    }

    revalidateTag(sharedTag.getCategories);
    revalidateTag(tag.category(id));

    // Desenvolver estratégias para revalidateTag no Router
    // Provavelmente chamando uma api para revalidate onDemand
  });
