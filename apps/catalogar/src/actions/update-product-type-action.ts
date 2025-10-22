"use server";

import slugify from "slugify";
import { revalidateTag } from "next/cache";
import { putProductType } from "@/services/put-product-type";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { updateProductTypeSchema } from "@/schemas/product-type";
import { tags } from "@/tags";

export const updateProductTypeAction = authActionClientWithUser
  .inputSchema(updateProductTypeSchema)
  .metadata({
    actionName: "update-product-type",
  })
  .action(
    async ({
      parsedInput: { id, name, isDisabled },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await putProductType(id, {
        name,
        slug: slugify(name, { lower: true }),
        isDisabled,
      });

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        productType: data.data,
        message: data.meta?.message,
      };
    },
  );
