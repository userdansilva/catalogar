"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { createCatalogSchema } from "./schema";
import { tags } from "@/tags";
import { Catalog } from "@/types/api-types";
import { ApiResponse } from "@/types/api-response";

export const createCatalogAction = authActionClient
  .schema(createCatalogSchema)
  .metadata({
    actionName: "create-catalog",
  })
  .action(async ({ parsedInput: { name }, ctx: { Authorization } }) => {
    try {
      const res = await api.post<ApiResponse<Catalog>>(
        "/v1/catalogs",
        {
          name,
        },
        {
          headers: {
            Authorization,
          },
        },
      );

      revalidateTag(tags.users.me);

      return { catalog: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, createCatalogSchema);
      throw e;
    }
  });
