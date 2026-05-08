"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCatalogSchema } from "@/schemas/catalog";

export const createCatalogAction = authActionClientWithUser
  .inputSchema(createCatalogSchema)
  .metadata({
    actionName: "create-catalog",
  })
  .action(async ({ parsedInput: { name }, ctx: { user } }) => {
    const catalog = await prisma.catalog.create({
      data: {
        name,
        userId: user.id,
      },
    });

    // set as current catalog
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentCatalogId: catalog.id,
      },
    });

    return {
      catalog,
    };
  });
