"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateProductTypeSchema } from "@/schemas/product-type";

export const updateProductTypeAction = authActionClientWithUser
  .inputSchema(updateProductTypeSchema)
  .metadata({
    actionName: "update-product-type",
  })
  .action(
    async ({
      parsedInput: { id, name, isDisabled },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const existingProductType = await prisma.productType.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: currentCatalog.id,
          NOT: {
            id,
          },
        },
      });

      if (existingProductType) {
        return returnValidationErrors(updateProductTypeSchema, {
          name: {
            _errors: ["Já existe um tipo de produto com esse nome"],
          },
        });
      }

      const productType = await prisma.productType.update({
        where: {
          id,
        },
        data: {
          name,
          slug: slugify(name, { lower: true }),
          disabledAt: isDisabled ? new Date() : null,
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return {
        productType,
      };
    },
  );
