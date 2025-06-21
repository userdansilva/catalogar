"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { Company } from "@/types/api-types";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { companySchema } from "./schema";

export const createCompanyAction = authActionClient
  .schema(companySchema)
  .metadata({
    actionName: "create-company",
  })
  .action(async ({
    parsedInput: {
      name, description, mainSiteUrl, phoneNumber, businessTypeDescription, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.post<ApiResponse<Company>>("/v1/companies", {
        name, description, mainSiteUrl, phoneNumber, businessTypeDescription,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.users.me);

      /**
       * Não é necessário por que criação de empresa é antes de publicação do catálogo
       */
      // if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
      //   revalidatePath(routes.public.url(user.currentCatalog.slug));
      // }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { company: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, companySchema);
      throw e;
    }
  });
