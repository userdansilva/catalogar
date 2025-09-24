"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { deleteProductType } from "@/services/delete-product-type";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";
import { deleteSchema } from "@/schemas/others";
import { authActionClient } from "@/lib/next-safe-action";

export const deleteProductTypeAction = authActionClient
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-product-type",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [productTypeError] = await deleteProductType(id);

    if (productTypeError) {
      throw new ExpectedError(productTypeError);
    }

    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    revalidateTag(tags.catalogItems.getAll);
    revalidateTag(tags.catalogItems.getByIdAny);
    revalidateTag(tags.productTypes.getAll);
    revalidateTag(tags.productTypes.getById(id));

    const { currentCatalog } = userData.data;

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
    }
  });
