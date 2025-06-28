"use server";

import { revalidateTag } from "next/cache";
import { ApiResponse } from "@/types/api-response";
import { tags } from "@/tags";
import { Theme } from "@/types/api-types";
import { authActionClient } from "./safe-action";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { themeSchema } from "./schema";

export const createThemeAction = authActionClient
  .schema(themeSchema)
  .metadata({
    actionName: "create-theme",
  })
  .action(async ({
    parsedInput: {
      primaryColor, secondaryColor, logo,
    },
    ctx: { accessToken },
  }) => {
    try {
      const res = await api.post<ApiResponse<Theme>>("/v1/themes", {
        primaryColor,
        secondaryColor,
        logo,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      revalidateTag(tags.users.me);

      return { theme: res.data.data, message: res.data.meta?.message };
    } catch (e) {
      console.error(e);
      returnValidationErrorsIfExists(e, themeSchema);
      throw e;
    }
  });
