"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateThemeSchema } from "@/schemas/theme";
import { trackServerEvent } from "@/lib/amplitude-server";

export const updateThemeAction = authActionClient
  .inputSchema(updateThemeSchema)
  .metadata({
    actionName: "update-theme",
  })
  .action(
    async ({
      parsedInput: { primaryColor, secondaryColor, logo, shouldDeleteLogo },
      ctx: {
        session: { user },
      },
      metadata: { actionName },
    }) => {
      const theme = await prisma.theme.update({
        data: {
          primaryColor,
          secondaryColor,
          logo: logo
            ? {
                upsert: {
                  create: {
                    name: logo.name,
                    url: logo.url,
                    size: logo.size,
                    width: logo.width,
                    height: logo.height,
                    altText: logo.altText,
                    catalogId: user.currentCatalogId,
                  },
                  update: {
                    name: logo.name,
                    url: logo.url,
                    size: logo.size,
                    width: logo.width,
                    height: logo.height,
                    altText: logo.altText,
                  },
                },
              }
            : { delete: shouldDeleteLogo },
        },
        where: {
          catalogId: user.currentCatalogId,
        },
        include: {
          logo: true,
          catalog: true,
        },
      });

      if (theme.catalog.publishedAt && theme.catalog.slug) {
        updateTag(`public-catalog-${theme.catalog.slug}`);
      }

      await trackServerEvent(actionName, user.email);

      return { theme };
    },
  );
