"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { publishCatalogSchema } from "@/schemas/catalog";

export const publishCatalogAction = authActionClient
  .inputSchema(publishCatalogSchema)
  .metadata({
    actionName: "publish-catalog",
  })
  .action(
    async ({
      parsedInput: { slug },
      ctx: {
        session: { user },
      },
    }) => {
      const isSlugTaken = await prisma.catalog.findFirst({
        where: {
          slug,
          id: {
            not: user.currentCatalogId,
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
          id: user.currentCatalogId,
        },
        data: {
          publishedAt: new Date(),
          slug,
        },
      });

      if (catalog.publishedAt && catalog.slug) {
        revalidateTag(`public-catalog-${catalog.slug}`, "max");
      }

      return {
        catalog,
      };
    },
  );
