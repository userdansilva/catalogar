"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { catalogItemStatusToggleSchema } from "@/schemas/catalog-item";
import { trackServerEvent } from "@/lib/amplitude-server";

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
      metadata: { actionName },
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
        updateTag(`public-catalog-${catalogItem.catalog.slug}`);
      }

      await trackServerEvent(actionName, user.email);

      return {
        catalogItem,
      };
    },
  );
