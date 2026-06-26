"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { catalogItemStatusToggleSchema } from "@/schemas/catalog-item";

export const toggleCatalogItemStatusAction = authActionClient
  .inputSchema(catalogItemStatusToggleSchema)
  .metadata({
    actionName: "toggle-catalog-item-status",
  })
  .action(
    async ({
      parsedInput: { id, isDisabled },
      ctx: {
        session: { user },
      },
    }) => {
      const catalogItem = await prisma.catalogItem.update({
        where: {
          id,
          catalogId: user.currentCatalogId,
        },
        data: {
          disabledAt: isDisabled ? new Date() : null,
        },
        include: {
          catalog: true,
        },
      });

      if (catalogItem.catalog.publishedAt && catalogItem.catalog.slug) {
        revalidateTag(`public-catalog-${catalogItem.catalog.slug}`, "max");
      }

      return {
        catalogItem,
      };
    },
  );
