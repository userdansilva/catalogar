"use server";

import { revalidateTag } from "next/cache";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { updateCompanySchema } from "@/schemas/company";

export const updateCompanyAction = authActionClientWithUser
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
        user: { currentCatalog },
      },
    }) => {
      const company = await prisma.company.update({
        where: {
          id: currentCatalog.company?.id || "",
        },
        data: {
          name,
          businessTypeDescription,
          description,
          mainSiteUrl,
          phoneNumber,
        },
      });

      if (currentCatalog.publishedAt && currentCatalog.slug) {
        revalidateTag(`public-catalog-${currentCatalog.slug}`, "max");
      }

      return {
        company,
      };
    },
  );
