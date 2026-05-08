"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateCategorySchema } from "@/schemas/category";

export const updateCategoryAction = authActionClientWithUser
  .inputSchema(updateCategorySchema)
  .metadata({
    actionName: "update-category",
  })
  .action(
    async ({
      parsedInput: { id, name, textColor, backgroundColor, isDisabled },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      // Verify by slug unique
      const existingCategory = await prisma.category.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: currentCatalog.id,
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
          catalogId: currentCatalog.id,
        },
        data: {
          name,
          slug: slugify(name, { lower: true }),
          textColor,
          backgroundColor,
          disabledAt: isDisabled ? new Date() : null,
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return { category };
    },
  );
