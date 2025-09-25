"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { getCategoryById } from "@/services/get-category-by-id";
import { ExpectedError } from "@/classes/ExpectedError";
import { putCategory } from "@/services/put-category";
import { getUser } from "@/services/get-user";
import { authActionClient } from "@/lib/next-safe-action";
import { categoryStatusToggleSchema } from "@/schemas/category";

export const toggleCategoryStatusAction = authActionClient
  .inputSchema(categoryStatusToggleSchema)
  .metadata({
    actionName: "toggle-status-category",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [getCategoryError, getCategoryData] = await getCategoryById(id);

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

    revalidateTag(tags.categories.getAll);
    revalidateTag(tags.categories.getById(id));

    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    if (!userData.data.currentCatalog) {
      throw new Error("Catálogo atual não definido");
    }

    if (
      userData.data.currentCatalog.isPublished &&
      userData.data.currentCatalog.slug
    ) {
      revalidateTag(
        tags.publicCatalog.getBySlug(userData.data.currentCatalog.slug),
      );
    }

    return {
      category: putCategoryData.data,
      message: putCategoryData.meta?.message,
    };
  });
