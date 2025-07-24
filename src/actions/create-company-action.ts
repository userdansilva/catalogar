"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { companySchema } from "./schema";
import { Company } from "@/types/api-types";
import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";

export const createCompanyAction = authActionClient
  .schema(companySchema)
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
      ctx: { Authorization },
    }) => {
      try {
        const res = await api.post<ApiResponse<Company>>(
          "/v1/companies",
          {
            name,
            description,
            mainSiteUrl,
            phoneNumber,
            businessTypeDescription,
          },
          {
            headers: {
              Authorization,
            },
          },
        );

        revalidateTag(tags.users.me);

        return { company: res.data.data, message: res.data.meta?.message };
      } catch (e) {
        returnValidationErrorsIfExists(e, companySchema);
        throw e;
      }
    },
  );
