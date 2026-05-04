"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { deleteSchema } from "@/schemas/others";

export const deleteCategoryAction = authActionClientWithUser
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-category-item",
  })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    await prisma.category.delete({
      where: {
        id,
        catalogId: user.currentCatalog.id,
      },
    });
  });
