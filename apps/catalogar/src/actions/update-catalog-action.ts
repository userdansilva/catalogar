"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { updateCatalogSchema } from "@/schemas/catalog";

export const updateCatalogAction = authActionClientWithUser
  .inputSchema(updateCatalogSchema)
  .metadata({
    actionName: "update-catalog",
  })
  .action(
    async ({
      parsedInput: { name, isPublished, slug },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const existingCatalogWithSlug = await prisma.catalog.findFirst({
        where: {
          slug,
          id: {
            not: currentCatalog.id,
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

      // Publicar pela a primeira vez
      if (isPublished && !currentCatalog.publishedAt) {
        await prisma.catalog.update({
          where: {
            id: currentCatalog.id,
          },
          data: {
            name,
            slug,
          },
        });

        return {
          redirectTo: routes.catalog.sub.prePublish.url,
        };
      }

      // Alterar normalmente (caso já tenha publicado antes)
      const catalog = await prisma.catalog.update({
        where: {
          id: currentCatalog.id,
        },
        data: {
          name,
          publishedAt: isPublished ? new Date() : null,
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
