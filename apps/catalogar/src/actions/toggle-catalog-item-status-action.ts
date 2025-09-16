"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { catalogItemStatusToggleSchema } from "./schema";
import { tags } from "@/tags";
import { getCatalogItemById } from "@/services/get-catalog-item-by-id";
import { ExpectedError } from "@/classes/ExpectedError";
import { putCatalogItem } from "@/services/put-catalog-item";
import { getUser } from "@/services/get-user";

export const toggleCatalogItemStatusAction = authActionClient
  .inputSchema(catalogItemStatusToggleSchema)
  .metadata({
    actionName: "toggle-catalog-item-status",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [getCatalogItemError, getCatalogItemData] =
      await getCatalogItemById(id);

    if (getCatalogItemError) {
      throw new ExpectedError(getCatalogItemError);
    }

    const catalogItem = getCatalogItemData.data;

    const [putCatalogItemError, putCatalogItemData] = await putCatalogItem(id, {
      title: catalogItem.title,
      caption: catalogItem.caption,
      productTypeId: catalogItem.productType.id,
      images: catalogItem.images.map((image) => ({
        fileName: image.fileName,
        position: image.position,
      })),
      price: catalogItem.price,
      categoryIds: catalogItem.categories.map((category) => category.id),
      isDisabled: !catalogItem.isDisabled,
    });

    if (putCatalogItemError) {
      throw new ExpectedError(putCatalogItemError);
    }

    revalidateTag(tags.catalogItems.getAll);
    revalidateTag(tags.catalogItems.getById(id));

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
      catalogItem: putCatalogItemData.data,
      message: putCatalogItemData.meta.message,
    };
  });
