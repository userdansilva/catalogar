"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { tags } from "@/tags";
import { Company } from "@/types/api-types";
import { redirect } from "next/navigation";
import { routes } from "@/routes";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { companySchema } from "./schema";

export const updateCompanyAction = authActionClient
  .schema(companySchema)
  .metadata({
    actionName: "update-company",
  })
  .action(async ({
    parsedInput: {
      name, description, mainSiteUrl, phoneNumber, businessTypeDescription, redirectTo,
    },
    ctx: { accessToken, user },
  }) => {
    try {
      const res = await api.put<ApiResponse<Company>>("/v1/companies", {
        name, description, mainSiteUrl, phoneNumber, businessTypeDescription,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.users.me);

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        const path = routes.public.url(user.currentCatalog.slug);
        revalidatePath(path, "layout");
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { company: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, companySchema);
      throw e;
    }
  });
