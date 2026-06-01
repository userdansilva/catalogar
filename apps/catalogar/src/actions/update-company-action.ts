"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateCompanySchema } from "@/schemas/company";

export const updateCompanyAction = authActionClient
  .inputSchema(updateCompanySchema)
  .metadata({
    actionName: "update-company",
  })
  .action(
    async ({
      parsedInput: {
        name,
        businessTypeDescription,
        description,
        mainSiteUrl,
        phoneNumber,
      },
      ctx: {
        session: { user },
      },
    }) => {
      const company = await prisma.company.update({
        where: {
          catalogId: user.currentCatalogId,
        },
        data: {
          name,
          businessTypeDescription,
          description,
          mainSiteUrl,
          phoneNumber,
        },
        include: {
          catalog: true,
        },
      });

      if (company.catalog.publishedAt && company.catalog.slug) {
        revalidateTag(`public-catalog-${company.catalog.slug}`, "max");
      }

      return {
        company,
      };
    },
  );
