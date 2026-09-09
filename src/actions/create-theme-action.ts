"use server";

import { trackServerEvent } from "@/lib/amplitude-server";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createThemeSchema } from "@/schemas/theme";

export const createThemeAction = authActionClient
  .inputSchema(createThemeSchema)
  .metadata({
    actionName: "create-theme",
  })
  .action(
    async ({
      parsedInput: { primaryColor, secondaryColor, logo },
      ctx: {
        session: { user },
      },
      metadata: { actionName },
    }) => {
      const theme = await prisma.theme.create({
        data: {
          primaryColor,
          secondaryColor,
          catalogId: user.currentCatalogId,
          logo: logo
            ? {
                create: {
                  name: logo.name,
                  url: logo.url,
                  size: logo.size,
                  width: logo.width,
                  height: logo.height,
                  altText: logo.altText,
                  catalogId: user.currentCatalogId,
                },
              }
            : undefined,
        },
      });

      await trackServerEvent(actionName, user.email);

      return { theme };
    },
  );
