"use server";

import { returnValidationErrors } from "next-safe-action";
import slugify from "slugify";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createProductTypeSchema } from "@/schemas/product-type";

export const createProductTypeAction = authActionClientWithUser
  .inputSchema(createProductTypeSchema)
  .metadata({
    actionName: "create-product-type",
  })
  .action(
    async ({
      parsedInput: { name },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const existingProductType = await prisma.productType.findFirst({
        where: {
          slug: slugify(name, { lower: true }),
          catalogId: currentCatalog.id,
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
          catalogId: currentCatalog.id,
        },
      });

      // if (currentCatalog?.isPublished && currentCatalog.slug) {
      //   revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      // }

      return {
        productType,
      };
    },
  );
