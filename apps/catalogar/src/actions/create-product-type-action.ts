"use server";

import slugify from "slugify";
import { revalidateTag } from "next/cache";
import { postProductType } from "@/services/post-product-type";
import { ExpectedError } from "@/classes/ExpectedError";
import { createProductTypeSchema } from "@/schemas/product-type";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { tags } from "@/tags";

export const createProductTypeAction = authActionClientWithUser
  .inputSchema(createProductTypeSchema)
  .metadata({
    actionName: "create-product-type",
  })
  .action(
    async ({
      parsedInput: { name, isDisabled },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await postProductType({
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
