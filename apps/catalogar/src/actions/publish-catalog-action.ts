"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { publishCatalogSchema } from "@/schemas/catalog";

export const publishCatalogAction = authActionClientWithUser
  .inputSchema(publishCatalogSchema)
  .metadata({
    actionName: "publish-catalog",
  })
  .action(
    async ({
      parsedInput: { slug },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const isSlugTaken = await prisma.catalog.findFirst({
        where: {
          slug,
          id: {
            not: currentCatalog.id,
          },
        },
      });

      if (isSlugTaken) {
        return returnValidationErrors(publishCatalogSchema, {
          slug: {
            _errors: ["O link já está em uso por outro catálogo."],
          },
        });
      }

      const catalog = await prisma.catalog.update({
        where: {
          id: currentCatalog.id,
        },
        data: {
          publishedAt: new Date(),
          slug,
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return {
        catalog,
      };
    },
  );
