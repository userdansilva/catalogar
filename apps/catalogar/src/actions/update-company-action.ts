"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { putCompany } from "@/services/put-company";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";
import { authActionClient } from "@/lib/next-safe-action";
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
        description,
        mainSiteUrl,
        phoneNumber,
        businessTypeDescription,
      },
    }) => {
      const [putCompanyError, putCompanyData] = await putCompany({
        name,
        description,
        mainSiteUrl,
        phoneNumber,
        businessTypeDescription,
      });

      if (putCompanyError) {
        throw new ExpectedError(putCompanyError);
      }

      revalidateTag(tags.users.me);

      const [userError, userData] = await getUser();

      if (userError) {
        throw new ExpectedError(userError);
      }

      const { currentCatalog } = userData.data;

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
      }

      return {
        company: putCompanyData.data,
        message: putCompanyData.meta?.message,
      };
    },
  );
