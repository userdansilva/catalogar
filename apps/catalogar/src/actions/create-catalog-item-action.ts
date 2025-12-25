"use server";

import { revalidateTag } from "next/cache";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { createCatalogItemSchema } from "@/schemas/catalog-item";
import { postCatalogItem } from "@/services/post-catalog-item";
import { tags } from "@/tags";

export const createCatalogItemAction = authActionClientWithUser
  .inputSchema(createCatalogItemSchema)
  .metadata({
    actionName: "create-catalog-item",
  })
  .action(
    async ({
      parsedInput,
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await postCatalogItem(parsedInput);

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "");
      }

      return {
        category: data.data,
        message: data.meta?.message,
      };
    },
  );
