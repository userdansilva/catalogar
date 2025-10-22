"use server";

import { revalidateTag } from "next/cache";
import { getProductTypeById } from "@/services/get-product-type-by-id";
import { ExpectedError } from "@/classes/ExpectedError";
import { putProductType } from "@/services/put-product-type";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { productTypeStatusToggleSchema } from "@/schemas/product-type";
import { tags } from "@/tags";

export const toggleProductTypeStatusAction = authActionClientWithUser
  .inputSchema(productTypeStatusToggleSchema)
  .metadata({
    actionName: "switch-product-type-enable",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [getProductTypeError, getProductTypeData] =
        await getProductTypeById(id);

      if (getProductTypeError) {
        throw new ExpectedError(getProductTypeError);
      }

      const productType = getProductTypeData.data;

      const [putProdutTypeError, putProductTypeData] = await putProductType(
        id,
        {
          name: productType.name,
          slug: productType.slug,
          isDisabled: !productType.isDisabled,
        },
      );

      if (putProdutTypeError) {
        throw new ExpectedError(putProdutTypeError);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        productType: putProductTypeData.data,
        message: putProductTypeData.meta?.message,
      };
    },
  );
