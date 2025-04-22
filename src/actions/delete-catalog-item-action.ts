"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { catalogItemSchema, deleteSchema } from "./schema";

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
    ctx: { accessToken },
  }) => {
    try {
      await api.delete<void>(`/v1/catalog-items/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.catalogItems.getAll);
      revalidateTag(tags.catalogItems.getById(id));

      if (redirectTo) {
        redirect(redirectTo);
      }
    } catch (e) {
      console.error(e);
      returnValidationErrorsIfExists(e, catalogItemSchema);
      throw e;
    }
  });
