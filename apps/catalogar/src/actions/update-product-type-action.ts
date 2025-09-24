"use server";

import { revalidateTag } from "next/cache";
import slugify from "slugify";
import { tags } from "@/tags";
import { putProductType } from "@/services/put-product-type";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";
import { authActionClient } from "@/lib/next-safe-action";
import { updateProductTypeSchema } from "@/schemas/product-type";

export const updateProductTypeAction = authActionClient
  .inputSchema(updateProductTypeSchema)
  .metadata({
    actionName: "update-product-type",
  })
  .action(async ({ parsedInput: { id, name, isDisabled } }) => {
    const [productTypeError, productTypeData] = await putProductType(id, {
      name,
      slug: slugify(name, { lower: true }),
      isDisabled,
    });

    if (productTypeError) {
      throw new ExpectedError(productTypeError);
    }

    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    revalidateTag(tags.productTypes.getAll);
    revalidateTag(tags.productTypes.getById(id));

    const { currentCatalog } = userData.data;

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
    }

    return {
      productType: productTypeData.data,
      message: productTypeData.meta?.message,
    };
  });
