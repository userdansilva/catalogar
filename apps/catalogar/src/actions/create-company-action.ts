"use server";

import { postCompany } from "@/services/post-company";
import { ExpectedError } from "@/classes/ExpectedError";
import { createCompanySchema } from "@/schemas/company";
import { authActionClient } from "@/lib/next-safe-action";

export const createCompanyAction = authActionClient
  .inputSchema(createCompanySchema)
  .metadata({
    actionName: "create-company",
  })
  .action(
    async ({
      parsedInput: {
        name,
        description,
        mainSiteUrl,
        phoneNumber,
        businessTypeDescription,
      },
    }) => {
      const [error, data] = await postCompany({
        name,
        description,
        mainSiteUrl,
        phoneNumber,
        businessTypeDescription,
      });

      if (error) {
        throw new ExpectedError(error);
      }

      return { company: data.data, message: data.meta?.message };
    },
  );
