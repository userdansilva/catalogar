"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { routes } from "@/routes";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { deleteSchema } from "./schema";

export const deleteProductTypeAction = authActionClient
  .schema(deleteSchema)
  .metadata({
    actionName: "delete-product-type",
  })
  .action(async ({
    parsedInput: {
      id,
      redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
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
        const path = routes.public.url(user.currentCatalog.slug);
        revalidatePath(path, "layout");
      }

      if (redirectTo) {
        redirect(redirectTo);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
