"use server";

import { revalidateTag } from "next/cache";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { catalogItemStatusToggleSchema } from "@/schemas/catalog-item";
import { getCatalogItem } from "@/services/get-catalog-item";
import { putCatalogItem } from "@/services/put-catalog-item";
import { tags } from "@/tags";

export const toggleCatalogItemStatusAction = authActionClientWithUser
  .inputSchema(catalogItemStatusToggleSchema)
  .metadata({
    actionName: "toggle-catalog-item-status",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [getCatalogItemError, getCatalogItemData] =
        await getCatalogItem(id);

      if (getCatalogItemError) {
        throw new ExpectedError(getCatalogItemError);
      }

      const catalogItem = getCatalogItemData.data;

      const [putCatalogItemError, putCatalogItemData] = await putCatalogItem({
        ...catalogItem,
        productTypeId: catalogItem.productType.id,
        categoryIds: catalogItem.categories.map((category) => category.id),
        isDisabled: !catalogItem.isDisabled,
      });

      if (putCatalogItemError) {
        throw new ExpectedError(putCatalogItemError);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        catalogItem: putCatalogItemData.data,
        message: putCatalogItemData.meta?.message,
      };
    },
  );
