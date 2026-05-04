"use server";

import { revalidateTag } from "next/cache";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateThemeSchema } from "@/schemas/theme";

export const updateThemeAction = authActionClientWithUser
  .inputSchema(updateThemeSchema)
  .metadata({
    actionName: "update-theme",
  })
  .action(
    async ({
      parsedInput: { primaryColor, secondaryColor, logo },
      ctx: {
        user: { currentCatalog },
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
                    catalogId: currentCatalog.id,
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
            : { delete: !!currentCatalog.theme?.logo },
        },
        where: {
          catalogId: currentCatalog.id,
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return { theme };
    },
  );
