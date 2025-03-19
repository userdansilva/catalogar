"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Catalog } from "@/types/api-types";
import { tags } from "@/tags";
import { authActionClient } from "./safe-action";
import { catalogSchema } from "./schema";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";

export const updateCatalogAction = authActionClient
  .schema(catalogSchema)
  .metadata({
    actionName: "update-catalog",
  })
  .action(async ({
    parsedInput: { name, slug, isPublished },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.put<ApiResponse<Catalog>>("/v1/catalogs", {
        name, slug, isPublished,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.users.me);

      return { catalog: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, catalogSchema);
      throw e;
    }
  });
