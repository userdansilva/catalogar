"use server";

import { revalidateTag } from "next/cache";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { productTypeStatusToggleSchema } from "@/schemas/product-type";

export const toggleProductTypeStatusAction = authActionClientWithUser
  .inputSchema(productTypeStatusToggleSchema)
  .metadata({
    actionName: "switch-product-type-enable",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const existingProductType = await prisma.productType.findFirst({
        where: {
          id,
          catalogId: currentCatalog.id,
        },
      });

      if (!existingProductType) {
        return {
          error: {
            message: "Tipo de produto não encontrado",
          },
        };
      }

      const productType = await prisma.productType.update({
        where: {
          id,
          catalogId: currentCatalog.id,
        },
        data: {
          disabledAt: existingProductType.disabledAt ? null : new Date(),
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
