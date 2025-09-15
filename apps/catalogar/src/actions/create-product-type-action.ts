"use server";

import { revalidateTag } from "next/cache";
import slugify from "slugify";
import { authActionClient } from "./safe-action";
import { productTypeSchema } from "./schema";
import { tags } from "@/tags";
import { postProductType } from "@/services/post-product-type";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";

export const createProductTypeAction = authActionClient
  .inputSchema(productTypeSchema)
  .metadata({
    actionName: "create-product-type",
  })
  .action(async ({ parsedInput: { name, isDisabled } }) => {
    const [productTypeError, productTypeData] = await postProductType({
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

    const { currentCatalog } = userData.data;

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
    }

    return {
      productType: productTypeData.data,
      message: productTypeData.meta.message,
    };
  });
