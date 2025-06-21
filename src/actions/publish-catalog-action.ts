"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { Catalog } from "@/types/api-types";
import { redirect } from "next/navigation";
import { tags } from "@/tags";
import { getUser } from "@/services/get-user";
import { routes } from "@/routes";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { publishCatalogSchema } from "./schema";

export const publishCatalogAction = authActionClient
  .schema(publishCatalogSchema)
  .metadata({
    actionName: "publish-catalog",
  })
  .action(async ({
    parsedInput: {
      slug, redirectTo,
    },
    ctx: { accessToken },
  }) => {
    const { data: user } = await getUser();

    /** Criar endpoint específico no backend para isso */
    try {
      const res = await api.put<ApiResponse<Catalog>>("/v1/catalogs", {
        name: user.currentCatalog.name,
        slug,
        isPublished: true,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.users.me);

      if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
        revalidatePath(routes.public.url(user.currentCatalog.slug), "layout");
      }

      if (redirectTo) {
        redirect(redirectTo);
      }

      return { catalog: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      returnValidationErrorsIfExists(e, publishCatalogSchema);
      throw e;
    }
  });
