"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCategorySchema } from "@/schemas/category";

export const createCategoryAction = authActionClientWithUser
  .inputSchema(createCategorySchema)
  .metadata({
    actionName: "create-category",
  })
  .action(
    async ({
      parsedInput: { name, textColor, backgroundColor },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const existingCategory = await prisma.category.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: currentCatalog.id,
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
          catalogId: currentCatalog.id,
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return {
        category,
      };
    },
  );
