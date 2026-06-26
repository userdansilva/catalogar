"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { updateCatalogSchema } from "@/schemas/catalog";

export const updateCatalogAction = authActionClient
  .inputSchema(updateCatalogSchema)
  .metadata({
    actionName: "update-catalog",
  })
  .action(
    async ({
      parsedInput: { name, isPublished, isCartEnabled, slug },
      ctx: {
        session: { user },
      },
    }) => {
      const existingCatalogWithSlug = await prisma.catalog.findFirst({
        where: {
          slug,
          id: {
            not: user.currentCatalogId,
          },
        },
      });

      if (existingCatalogWithSlug) {
        return returnValidationErrors(updateCatalogSchema, {
          slug: {
            _errors: ["Já existe um catálogo com esse link"],
          },
        });
      }

      const currentCatalog = await prisma.catalog.findUniqueOrThrow({
        where: {
          id: user.currentCatalogId,
        },
      });

      // Publicar pela a primeira vez
      if (isPublished && !currentCatalog.publishedAt) {
        await prisma.catalog.update({
          where: {
            id: currentCatalog.id,
          },
          data: {
            name,
            slug,
            isCartEnabled,
          },
        });

        return {
          redirectTo: routes.catalog.sub.prePublish.url,
        };
      }

      // Alterar normalmente (caso já tenha publicado antes)
      const catalog = await prisma.catalog.update({
        where: {
          id: user.currentCatalogId,
        },
        data: {
          name,
          publishedAt: isPublished ? new Date() : null,
          isCartEnabled,
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
