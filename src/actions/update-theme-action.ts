"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { themeSchema } from "./schema";
import { Theme } from "@/types/api-types";
import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";

export const updateThemeAction = authActionClient
  .schema(themeSchema)
  .metadata({
    actionName: "update-theme",
  })
  .action(
    async ({
      parsedInput: { primaryColor, secondaryColor, logo },
      ctx: { Authorization, user },
    }) => {
      try {
        const res = await api.put<ApiResponse<Theme>>(
          "/v1/themes",
          {
            primaryColor,
            secondaryColor,
            logo,
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

        return { theme: res.data.data, message: res.data.meta?.message };
      } catch (e) {
        returnValidationErrorsIfExists(e, themeSchema);
        throw e;
      }
    },
  );
