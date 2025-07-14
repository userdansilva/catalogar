"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { deleteSchema } from "./schema";
import { tags } from "@/tags";

export const deleteProductTypeAction = authActionClient
  .schema(deleteSchema)
  .metadata({
    actionName: "delete-product-type",
  })
  .action(async ({ parsedInput: { id }, ctx: { accessToken, user } }) => {
    try {
      await api.delete<void>(`/v1/product-types/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.catalogItems.getAll);
      revalidateTag(tags.catalogItems.getByIdAny);

      revalidateTag(tags.productTypes.getAll);
      revalidateTag(tags.productTypes.getById(id));

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
