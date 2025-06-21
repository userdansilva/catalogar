"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Catalog } from "@/types/api-types";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { createCatalogSchema } from "./schema";

export const createCatalogAction = authActionClient
  .schema(createCatalogSchema)
  .metadata({
    actionName: "create-catalog",
  })
  .action(async ({
    parsedInput: {
      name, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.post<ApiResponse<Catalog>>("/v1/catalogs", {
        name,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.users.me);

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { catalog: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, createCatalogSchema);
      throw e;
    }
  });
