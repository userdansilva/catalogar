"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { deleteSchema } from "./schema";

export const deleteCatalogItemAction = authActionClient
  .schema(deleteSchema)
  .metadata({
    actionName: "delete-catalog-item",
  })
  .action(async ({
    parsedInput: {
      id,
      redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      await api.delete<void>(`/v1/catalog-items/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.catalogItems.getAll);
      revalidateTag(tags.catalogItems.getById(id));

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
      }

      if (redirectTo) {
        redirect(redirectTo);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
