"use server";

import { revalidateTag } from "next/cache";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { updateCompanySchema } from "@/schemas/company";
import { putCompany } from "@/services/put-company";
import { tags } from "@/tags";

export const updateCompanyAction = authActionClientWithUser
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
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await putCompany({
        name,
        description,
        mainSiteUrl,
        phoneNumber,
        businessTypeDescription,
      });

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        company: data.data,
        message: data.meta?.message,
      };
    },
  );
