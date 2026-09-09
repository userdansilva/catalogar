"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { productTypeStatusToggleSchema } from "@/schemas/product-type";
import { trackServerEvent } from "@/lib/amplitude-server";

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
      metadata: { actionName },
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
        updateTag(`public-catalog-${productType.catalog.slug}`);
      }

      await trackServerEvent(actionName, user.email);

      return {
        productType,
      };
    },
  );
