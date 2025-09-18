"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { productTypeStatusToggleSchema } from "./schema";
import { tags } from "@/tags";
import { getProductTypeById } from "@/services/get-product-type-by-id";
import { ExpectedError } from "@/classes/ExpectedError";
import { putProductType } from "@/services/put-product-type";
import { getUser } from "@/services/get-user";

export const toggleProductTypeStatusAction = authActionClient
  .inputSchema(productTypeStatusToggleSchema)
  .metadata({
    actionName: "switch-product-type-enable",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [getProductTypeError, getProductTypeData] =
      await getProductTypeById(id);

    if (getProductTypeError) {
      throw new ExpectedError(getProductTypeError);
    }

    const productType = getProductTypeData.data;

    const [putProdutTypeError, putProductTypeData] = await putProductType(id, {
      name: productType.name,
      slug: productType.slug,
      isDisabled: !productType.isDisabled,
    });

    if (putProdutTypeError) {
      throw new ExpectedError(putProdutTypeError);
    }

    revalidateTag(tags.productTypes.getAll);
    revalidateTag(tags.productTypes.getById(id));

    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    if (!userData.data.currentCatalog) {
      throw new Error("Catálogo atual não definido");
    }

    if (
      userData.data.currentCatalog.isPublished &&
      userData.data.currentCatalog.slug
    ) {
      revalidateTag(
        tags.publicCatalog.getBySlug(userData.data.currentCatalog.slug),
      );
    }

    return {
      productType: putProductTypeData.data,
      message: putProductTypeData.meta?.message,
    };
  });
