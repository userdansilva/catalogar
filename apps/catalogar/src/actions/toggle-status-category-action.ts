"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { categoryStatusToggleSchema } from "@/schemas/category";

export const toggleCategoryStatusAction = authActionClientWithUser
  .inputSchema(categoryStatusToggleSchema)
  .metadata({
    actionName: "toggle-status-category",
  })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const existingCategory = await prisma.category.findFirst({
      where: {
        id,
        catalogId: user.currentCatalog.id,
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
        catalogId: user.currentCatalog.id,
      },
      data: {
        disabledAt: existingCategory.disabledAt ? null : new Date(),
      },
    });

    return {
      category,
    };
  });
