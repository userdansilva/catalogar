"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { deleteSchema } from "@/schemas/others";

export const deleteCatalogItemAction = authActionClient
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-catalog-item",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        session: { user },
      },
    }) => {
      const catalogItem = await prisma.catalogItem.delete({
        where: {
          id,
          catalogId: user.currentCatalogId,
        },
        include: {
          catalog: true,
        },
      });

      if (catalogItem.catalog.publishedAt && catalogItem.catalog.slug) {
        updateTag(`public-catalog-${catalogItem.catalog.slug}`);
      }
    },
  );
