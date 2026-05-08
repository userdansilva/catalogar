"use server";

import { revalidateTag } from "next/cache";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { deleteSchema } from "@/schemas/others";

export const deleteProductTypeAction = authActionClientWithUser
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-product-type",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      await prisma.productType.delete({
        where: {
          id,
          catalogId: currentCatalog.id,
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }
    },
  );
