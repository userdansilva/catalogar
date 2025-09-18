"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { deleteSchema } from "./schema";
import { tags } from "@/tags";
import { deleteCatalogItem } from "@/services/delete-catalog-item";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";

export const deleteCatalogItemAction = authActionClient
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-catalog-item",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [catalogItemError] = await deleteCatalogItem(id);

    if (catalogItemError) {
      throw new ExpectedError(catalogItemError);
    }

    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    revalidateTag(tags.catalogItems.getAll);
    revalidateTag(tags.catalogItems.getByIdAny);

    const { currentCatalog } = userData.data;

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
    }
  });
