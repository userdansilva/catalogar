"use server";

import { revalidateTag } from "next/cache";
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
      parsedInput: { primaryColor, secondaryColor, logo },
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
                    size: logo.sizeInBytes,
                    width: logo.width,
                    height: logo.height,
                    altText: logo.altText,
                    catalogId: user.currentCatalogId,
                  },
                  update: {
                    name: logo.name,
                    url: logo.url,
                    size: logo.sizeInBytes,
                    width: logo.width,
                    height: logo.height,
                    altText: logo.altText,
                  },
                },
              }
            : { delete: true },
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
        revalidateTag(`public-catalog-${theme.catalog.slug}`, "max");
      }

      return { theme };
    },
  );
