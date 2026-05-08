"use server";

import { z } from "zod";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";

export const switchCatalogAction = authActionClientWithUser
  .inputSchema(z.object({ id: z.string() }))
  .metadata({
    actionName: "switch-catalog-action",
  })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const catalog = await prisma.catalog.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!catalog) {
      return {
        error: "Catálogo não encontrado",
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentCatalogId: id,
      },
    });
  });
