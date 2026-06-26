"use server";

import { authActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/prisma";
import { createCompanySchema } from "@/schemas/company";

export const createCompanyAction = authActionClient
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
        session: { user },
      },
    }) => {
      const company = await prisma.company.create({
        data: {
          name,
          businessTypeDescription,
          description,
          mainSiteUrl,
          phoneNumber,
          catalogId: user.currentCatalogId,
        },
      });

      return {
        company,
      };
    },
  );
