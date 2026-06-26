"use server";

import { filterDefaultIdTokenClaims } from "@auth0/nextjs-auth0/server";
import { auth0 } from "@/lib/auth0";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCatalogSchema } from "@/schemas/catalog";

export const createCatalogAction = authActionClientWithUser
  .inputSchema(createCatalogSchema)
  .metadata({
    actionName: "create-catalog",
  })
  .action(async ({ parsedInput: { name }, ctx: { user, session } }) => {
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

    await auth0.updateSession({
      ...session,
      user: {
        ...filterDefaultIdTokenClaims(session.user),
        name: session.user.name,
        email: session.user.email,
        currentCatalogId: catalog.id,
      },
    });

    return {
      catalog,
    };
  });
