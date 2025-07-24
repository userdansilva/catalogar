"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { publishCatalogSchema } from "./schema";
import { ApiResponse } from "@/types/api-response";
import { Catalog } from "@/types/api-types";
import { tags } from "@/tags";
import { getUser } from "@/services/get-user";

export const publishCatalogAction = authActionClient
  .schema(publishCatalogSchema)
  .metadata({
    actionName: "publish-catalog",
  })
  .action(async ({ parsedInput: { slug }, ctx: { Authorization } }) => {
    const { data: user } = await getUser();

    try {
      const res = await api.put<ApiResponse<Catalog>>(
        "/v1/catalogs",
        {
          name: user.currentCatalog.name,
          slug,
          isPublished: true,
        },
        {
          headers: {
            Authorization,
          },
        },
      );

      revalidateTag(tags.users.me);

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
      }

      return { catalog: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, publishCatalogSchema);
      throw e;
    }
  });
