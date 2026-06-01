"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { deleteSchema } from "@/schemas/others";

export const deleteCategoryAction = authActionClient
  .inputSchema(deleteSchema)
  .metadata({
    actionName: "delete-category-item",
  })
  .action(
    async ({
      parsedInput: { id },
      ctx: {
        session: { user },
      },
    }) => {
      const category = await prisma.category.delete({
        where: {
          id,
          catalogId: user.currentCatalogId,
        },
        include: {
          catalog: true,
        },
      });

      if (category.catalog.publishedAt && category.catalog.slug) {
        revalidateTag(`public-catalog-${category.catalog.slug}`, "max");
      }
    },
  );
