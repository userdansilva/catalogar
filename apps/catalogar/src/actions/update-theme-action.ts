"use server";

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
      ctx: { user },
    }) => {
      console.log("logo", logo);

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
                    catalogId: user.currentCatalog.id,
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
            : { delete: !!user.currentCatalog.theme?.logo },
        },
        where: {
          catalogId: user.currentCatalog.id,
        },
      });

      // if (currentCatalog?.isPublished && currentCatalog.slug) {
      //   revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      // }

      return { theme };
    },
  );
