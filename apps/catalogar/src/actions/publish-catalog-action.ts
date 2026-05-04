"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { publishCatalogSchema } from "@/schemas/catalog";

export const publishCatalogAction = authActionClientWithUser
  .inputSchema(publishCatalogSchema)
  .metadata({
    actionName: "publish-catalog",
  })
  .action(async ({ parsedInput: { slug }, ctx: { user } }) => {
    const isSlugTaken = await prisma.catalog.findFirst({
      where: {
        slug,
        id: {
          not: user.currentCatalog.id,
        },
      },
    });

    if (isSlugTaken) {
      return {
        error: {
          message: "O link já está em uso por outro catálogo.",
        },
      };
    }

    const catalog = await prisma.catalog.update({
      where: {
        id: user.currentCatalog.id,
      },
      data: {
        publishedAt: new Date(),
      },
    });

    return {
      catalog,
    };
  });
