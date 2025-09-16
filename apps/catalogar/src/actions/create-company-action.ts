"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { companySchema } from "./schema";
import { tags } from "@/tags";
import { postCompany } from "@/services/post-company";
import { ExpectedError } from "@/classes/ExpectedError";

export const createCompanyAction = authActionClient
  .inputSchema(companySchema)
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

      revalidateTag(tags.users.me);

      return { company: data.data, message: data.meta?.message };
    },
  );
