"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { productTypeStatusToggleSchema } from "@/schemas/product-type";

export const toggleProductTypeStatusAction = authActionClient
  .inputSchema(productTypeStatusToggleSchema)
  .metadata({
    actionName: "switch-product-type-enable",
  })
  .action(
    async ({
      parsedInput: { id, isDisabled },
      ctx: {
        session: { user },
      },
    }) => {
      const productType = await prisma.productType.update({
        where: {
          id,
          catalogId: user.currentCatalogId,
        },
        data: {
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
