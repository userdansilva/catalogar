"use server";

import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClient } from "@/lib/next-safe-action";
import { createCompanySchema } from "@/schemas/company";
import { postCompany } from "@/services/post-company";

export const createCompanyAction = authActionClient
  .inputSchema(createCompanySchema)
  .metadata({
    actionName: "create-company",
  })
  .action(async ({ parsedInput }) => {
    const [error, data] = await postCompany(parsedInput);

    if (error) {
      throw new ExpectedError(error);
    }

    return { company: data.data, message: data.meta?.message };
  });
