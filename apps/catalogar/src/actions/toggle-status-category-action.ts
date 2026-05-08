"use server";

import { revalidateTag } from "next/cache";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { categoryStatusToggleSchema } from "@/schemas/category";

export const toggleCategoryStatusAction = authActionClientWithUser
  .inputSchema(categoryStatusToggleSchema)
  .metadata({
    actionName: "toggle-status-category",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const existingCategory = await prisma.category.findFirst({
        where: {
          id,
          catalogId: currentCatalog.id,
        },
      });

      if (!existingCategory) {
        return {
          error: {
            message: "Categoría não encontrada",
          },
        };
      }

      const category = await prisma.category.update({
        where: {
          id,
          catalogId: currentCatalog.id,
        },
        data: {
          disabledAt: existingCategory.disabledAt ? null : new Date(),
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return {
        category,
      };
    },
  );
