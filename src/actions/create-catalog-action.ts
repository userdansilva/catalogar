"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { catalogSchema } from "./schema";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { ApiResponse } from "@/types/api-response";
import { Catalog } from "@/types/api-types";
import { redirect } from "next/navigation";

export const createCatalogAction = authActionClient
  .schema(catalogSchema)
  .metadata({
    actionName: "create-catalog"
  })
  .action(async ({
    parsedInput: { name, slug, isPublished, redirectTo },
    ctx: { accessToken }
  }) => {
    try {
      const res = await api.post<ApiResponse<Catalog>>("/v1/catalogs", {
        name, slug, isPublished
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      revalidateTag("user")

      if (redirectTo) {
        redirect(redirectTo)
      }

      return { catalog: res.data.data, message: res.data.meta?.message }
    } catch (e) {
      returnValidationErrorsIfExists(e, catalogSchema)
      throw e
    }
  })
