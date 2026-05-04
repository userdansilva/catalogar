"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { productTypeStatusToggleSchema } from "@/schemas/product-type";

export const toggleProductTypeStatusAction = authActionClientWithUser
  .inputSchema(productTypeStatusToggleSchema)
  .metadata({
    actionName: "switch-product-type-enable",
  })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const existingProductType = await prisma.productType.findFirst({
      where: {
        id,
        catalogId: user.currentCatalog.id,
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
        catalogId: user.currentCatalog.id,
      },
      data: {
        disabledAt: existingProductType.disabledAt ? null : new Date(),
      },
    });

    return {
      productType,
    };
  });
