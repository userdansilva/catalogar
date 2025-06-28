"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { deleteSchema } from "./schema";

export const deleteCategoryAction = authActionClient
  .schema(deleteSchema)
  .metadata({
    actionName: "delete-category-item",
  })
  .action(async ({
    parsedInput: {
      id,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      await api.delete<void>(`/v1/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.catalogItems.getAll);
      revalidateTag(tags.catalogItems.getByIdAny);

      revalidateTag(tags.categories.getAll);
      revalidateTag(tags.categories.getById(id));

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
