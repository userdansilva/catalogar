"use server";

import { revalidateTag } from "next/cache";
import { deleteCatalogItem } from "@/services/delete-catalog-item";
import { ExpectedError } from "@/classes/ExpectedError";
import { deleteSchema } from "@/schemas/others";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { tags } from "@/tags";

export const deleteCatalogItemAction = authActionClientWithUser
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-catalog-item",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error] = await deleteCatalogItem(id);

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }
    },
  );
