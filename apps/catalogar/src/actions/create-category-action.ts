"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCategorySchema } from "@/schemas/category";

export const createCategoryAction = authActionClient
  .inputSchema(createCategorySchema)
  .metadata({
    actionName: "create-category",
  })
  .action(
    async ({
      parsedInput: { name, textColor, backgroundColor },
      ctx: {
        session: { user },
      },
    }) => {
      const existingCategory = await prisma.category.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: user.currentCatalogId,
        },
      });

      if (existingCategory) {
        return returnValidationErrors(createCategorySchema, {
          name: {
            _errors: ["Já existe uma categoria com esse nome"],
          },
        });
      }

      const category = await prisma.category.create({
        data: {
          name: name,
          slug: slugify(name, { lower: true }),
          textColor: textColor,
          backgroundColor: backgroundColor,
          disabledAt: null,
          catalogId: user.currentCatalogId,
        },
        include: {
          catalog: true,
        },
      });

      if (category.catalog.publishedAt && category.catalog.slug) {
        revalidateTag(`public-catalog-${category.catalog.slug}`, "max");
      }

      return {
        category,
      };
    },
  );
