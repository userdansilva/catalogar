"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { categoryStatusToggleSchema } from "@/schemas/category";
import { trackServerEvent } from "@/lib/amplitude-server";

export const toggleCategoryStatusAction = authActionClient
  .inputSchema(categoryStatusToggleSchema)
  .metadata({
    actionName: "toggle-status-category",
  })
  .action(
    async ({
      parsedInput: { id, isDisabled },
      ctx: {
        session: { user },
      },
      metadata: { actionName },
    }) => {
      const category = await prisma.category.update({
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

      if (category.catalog.publishedAt && category.catalog.slug) {
        updateTag(`public-catalog-${category.catalog.slug}`);
      }

      await trackServerEvent(actionName, user.email);

      return {
        category,
      };
    },
  );
