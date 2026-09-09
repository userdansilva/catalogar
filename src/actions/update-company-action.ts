"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateCompanySchema } from "@/schemas/company";
import { trackServerEvent } from "@/lib/amplitude-server";

export const updateCompanyAction = authActionClient
  .inputSchema(updateCompanySchema)
  .metadata({
    actionName: "update-company",
  })
  .action(
    async ({
      parsedInput: data,
      ctx: {
        session: { user },
      },
      metadata: { actionName },
    }) => {
      const company = await prisma.company.update({
        where: {
          catalogId: user.currentCatalogId,
        },
        data,
        include: {
          catalog: true,
        },
      });

      if (company.catalog.publishedAt && company.catalog.slug) {
        updateTag(`public-catalog-${company.catalog.slug}`);
      }

      await trackServerEvent(actionName, user.email);

      return {
        company,
      };
    },
  );
