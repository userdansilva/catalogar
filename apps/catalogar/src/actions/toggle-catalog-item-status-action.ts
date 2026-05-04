"use server";

import { revalidateTag } from "next/cache";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { catalogItemStatusToggleSchema } from "@/schemas/catalog-item";

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
      const existingCatalogItem = await prisma.catalogItem.findFirst({
        where: {
          id,
          catalogId: currentCatalog.id,
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
          catalogId: currentCatalog.id,
        },
        data: {
          disabledAt: existingCatalogItem.disabledAt ? null : new Date(),
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return {
        catalogItem,
      };
    },
  );
