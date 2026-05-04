"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { catalogItemStatusToggleSchema } from "@/schemas/catalog-item";

export const toggleCatalogItemStatusAction = authActionClientWithUser
  .inputSchema(catalogItemStatusToggleSchema)
  .metadata({
    actionName: "toggle-catalog-item-status",
  })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const existingCatalogItem = await prisma.catalogItem.findFirst({
      where: {
        id,
        catalogId: user.currentCatalog.id,
      },
    });

    if (!existingCatalogItem) {
      return {
        error: {
          message: "Item de catálogo não encontrado",
        },
      };
    }

    const catalogItem = await prisma.catalogItem.update({
      where: {
        id,
        catalogId: user.currentCatalog.id,
      },
      data: {
        disabledAt: existingCatalogItem.disabledAt ? null : new Date(),
      },
    });

    return {
      catalogItem,
    };
  });
