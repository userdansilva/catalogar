"use server";

import { revalidateTag } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createProductTypeSchema } from "@/schemas/product-type";

export const createProductTypeAction = authActionClient
  .inputSchema(createProductTypeSchema)
  .metadata({
    actionName: "create-product-type",
  })
  .action(
    async ({
      parsedInput: { name },
      ctx: {
        session: { user },
      },
    }) => {
      const existingProductType = await prisma.productType.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: user.currentCatalogId,
        },
      });

      if (existingProductType) {
        return returnValidationErrors(createProductTypeSchema, {
          name: {
            _errors: ["Já existe um tipo de produto com esse nome"],
          },
        });
      }

      const productType = await prisma.productType.create({
        data: {
          name,
          slug: slugify(name, { lower: true }),
          catalogId: user.currentCatalogId,
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
