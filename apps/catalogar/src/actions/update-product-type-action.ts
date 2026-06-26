"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateProductTypeSchema } from "@/schemas/product-type";

export const updateProductTypeAction = authActionClient
  .inputSchema(updateProductTypeSchema)
  .metadata({
    actionName: "update-product-type",
  })
  .action(
    async ({
      parsedInput: { id, name, isDisabled },
      ctx: {
        session: { user },
      },
    }) => {
      const existingProductType = await prisma.productType.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: user.currentCatalogId,
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
          catalogId: user.currentCatalogId,
        },
        data: {
          name,
          slug: slugify(name, { lower: true }),
          disabledAt: isDisabled ? new Date() : null,
        },
        include: {
          catalog: true,
        },
      });

      if (productType.catalog.publishedAt && productType.catalog.slug) {
        revalidateTag(`public-catalog-${productType.catalog.slug}`, "max");
      }

      return {
        productType,
      };
    },
  );
