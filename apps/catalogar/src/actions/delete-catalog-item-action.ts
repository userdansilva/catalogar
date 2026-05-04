"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { deleteSchema } from "@/schemas/others";

export const deleteCatalogItemAction = authActionClientWithUser
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-catalog-item",
  })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    await prisma.catalogItem.delete({
      where: {
        id,
        catalogId: user.currentCatalog.id,
      },
    });
  });
