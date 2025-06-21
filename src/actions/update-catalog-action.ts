"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Catalog } from "@/types/api-types";
import { tags } from "@/tags";
import { getUser } from "@/services/get-user";
import { redirect } from "next/navigation";
import { routes } from "@/routes";
import { authActionClient } from "./safe-action";
import { updateCatalogSchema } from "./schema";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";

export const updateCatalogAction = authActionClient
  .schema(updateCatalogSchema)
  .metadata({
    actionName: "update-catalog",
  })
  .action(async ({
    parsedInput: { name, isPublished },
    ctx: { accessToken },
  }) => {
    try {
      const { data: user } = await getUser();

      // Publicar pela a primeira vez
      if (isPublished && !user.currentCatalog.slug) {
        await api.put<ApiResponse<Catalog>>("/v1/catalogs", {
          name,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        revalidateTag(tags.users.me);
        redirect(routes.catalog.sub.prePublish.url);
      }

      // Alterar normalmente (caso já tenha publicado antes)
      const res = await api.put<ApiResponse<Catalog>>("/v1/catalogs", {
        name,
        isPublished,
        slug: user.currentCatalog.slug,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.users.me);

      return { catalog: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, updateCatalogSchema);
      throw e;
    }
  });
