"use server";

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
    async ({ parsedInput: { name, isPublished, slug }, ctx: { user } }) => {
      const existingCatalogWithSlug = await prisma.catalog.findFirst({
        where: {
          slug,
          id: {
            not: user.currentCatalog.id,
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
      if (isPublished && !user.currentCatalog.publishedAt) {
        await prisma.catalog.update({
          where: {
            id: user.currentCatalog.id,
          },
          data: {
            name,
            slug,
          },
        });

        redirect(routes.catalog.sub.prePublish.url);
      }

      // Alterar normalmente (caso já tenha publicado antes)
      const catalog = await prisma.catalog.update({
        where: {
          id: user.currentCatalog.id,
        },
        data: {
          name,
          publishedAt: isPublished ? new Date() : null,
          slug,
        },
      });

      // if (currentCatalog?.isPublished && currentCatalog.slug) {
      //   revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      // }

      return {
        catalog,
      };
    },
  );
