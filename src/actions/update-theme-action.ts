"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateThemeSchema } from "@/schemas/theme";

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

      return { theme };
    },
  );
