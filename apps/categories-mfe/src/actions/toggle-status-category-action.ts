"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@catalogar/shared/next-safe-action";
import { DefaultApiError } from "@catalogar/shared/classes/default-api-error";
import { getUser } from "@catalogar/shared/get-user";
import { tag as sharedTag } from "@catalogar/shared/tags";
import { getAuthHeaders } from "@catalogar/shared/get-auth-headers";
import { categoryStatusToggleSchema } from "@/schemas";
import { getCategory } from "@/services/get-category";
import { putCategory } from "@/services/put-category";
import { tag } from "@/tag";

export const toggleCategoryStatusAction = authActionClient
  .inputSchema(categoryStatusToggleSchema)
  .metadata({
    actionName: "toggle-status-category",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [getCategoryError, getCategoryData] = await getCategory(id);

    if (getCategoryError) {
      throw new DefaultApiError(getCategoryError);
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
      throw new DefaultApiError(putCategoryError);
    }

    revalidateTag(sharedTag.getCategories);
    revalidateTag(tag.category(id));

    const headers = await getAuthHeaders();

    const [userError, userData] = await getUser({
      headers,
    });

    if (userError) {
      throw new DefaultApiError(userError);
    }

    if (!userData.data.currentCatalog) {
      throw new Error("Catálogo atual não definido");
    }

    // Desenvolver estratégias para revalidateTag no Router
    // Provavelmente chamando uma api para revalidate onDemand

    return {
      category: putCategoryData.data,
      message: putCategoryData.meta?.message,
    };
  });
