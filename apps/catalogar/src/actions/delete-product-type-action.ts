"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { deleteSchema } from "@/schemas/others";

export const deleteProductTypeAction = authActionClient
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-product-type",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        session: { user },
      },
    }) => {
      const productType = await prisma.productType.delete({
        where: {
          id,
          catalogId: user.currentCatalogId,
        },
        include: {
          catalog: true,
        },
      });

      if (productType.catalog.publishedAt && productType.catalog.slug) {
        revalidateTag(`public-catalog-${productType.catalog.slug}`, "max");
      }
    },
  );
