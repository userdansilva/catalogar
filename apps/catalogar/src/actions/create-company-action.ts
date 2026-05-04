"use server";

import { authActionClientWithUser } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCompanySchema } from "@/schemas/company";

export const createCompanyAction = authActionClientWithUser
  .inputSchema(createCompanySchema)
  .metadata({
    actionName: "create-company",
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
      const company = await prisma.company.create({
        data: {
          name,
          businessTypeDescription,
          description,
          mainSiteUrl,
          phoneNumber,
          catalogId: currentCatalog.id,
        },
      });

      return {
        company,
      };
    },
  );
