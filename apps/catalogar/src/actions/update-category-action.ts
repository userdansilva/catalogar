"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateCategorySchema } from "@/schemas/category";

export const updateCategoryAction = authActionClient
  .inputSchema(updateCategorySchema)
  .metadata({
    actionName: "update-category",
  })
  .action(
    async ({
      parsedInput: { id, name, textColor, backgroundColor, isDisabled },
      ctx: {
        session: { user },
      },
    }) => {
      // Verify by slug unique
      const existingCategory = await prisma.category.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: user.currentCatalogId,
          id: {
            not: id,
          },
        },
      });

      if (existingCategory) {
        return returnValidationErrors(updateCategorySchema, {
          name: {
            _errors: ["Já existe uma categoria com esse nome"],
          },
        });
      }

      const category = await prisma.category.update({
        where: {
          id,
          catalogId: user.currentCatalogId,
        },
        data: {
          name,
          slug: slugify(name, { lower: true }),
          textColor,
          backgroundColor,
          disabledAt: isDisabled ? new Date() : null,
        },
        include: {
          catalog: true,
        },
      });

      if (category.catalog.publishedAt && category.catalog.slug) {
        revalidateTag(`public-catalog-${category.catalog.slug}`, "max");
      }

      return { category };
    },
  );
