"use server";

import { filterDefaultIdTokenClaims } from "@auth0/nextjs-auth0/server";
import { z } from "zod";
import { auth0 } from "@/lib/auth0";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";

export const switchCatalogAction = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .metadata({
    actionName: "switch-catalog-action",
  })
  .action(async ({ parsedInput: { id }, ctx: { session } }) => {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        currentCatalogId: id,
      },
    });

    await auth0.updateSession({
      ...session,
      user: {
        ...filterDefaultIdTokenClaims(session.user),
        name: session.user.name,
        email: session.user.email,
        currentCatalogId: id,
      },
    });
  });
