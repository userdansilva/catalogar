"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createThemeSchema } from "@/schemas/theme";

export const createThemeAction = authActionClientWithUser
  .inputSchema(createThemeSchema)
  .metadata({
    actionName: "create-theme",
  })
  .action(
    async ({
      parsedInput: { primaryColor, secondaryColor, logo },
      ctx: { user },
    }) => {
      const theme = await prisma.theme.create({
        data: {
          primaryColor,
          secondaryColor,
          catalogId: user.currentCatalog.id,
          logo: logo
            ? {
                create: {
                  name: logo.name,
                  url: logo.url,
                  size: logo.sizeInBytes,
                  width: logo.width,
                  height: logo.height,
                  altText: logo.altText,
                  catalogId: user.currentCatalog.id,
                },
              }
            : undefined,
        },
      });

      return { theme };
    },
  );
