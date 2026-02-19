"use server";

import { revalidateTag } from "next/cache";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { deleteSchema } from "@/schemas/others";
import { deleteProductType } from "@/services/delete-product-type";
import { tags } from "@/tags";

export const deleteProductTypeAction = authActionClientWithUser
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-product-type",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error] = await deleteProductType(id);

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }
    },
  );
