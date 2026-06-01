"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { categoryStatusToggleSchema } from "@/schemas/category";

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
        revalidateTag(`public-catalog-${category.catalog.slug}`, "max");
      }

      return {
        category,
      };
    },
  );
