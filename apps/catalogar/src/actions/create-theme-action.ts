"use server";

import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClient } from "@/lib/next-safe-action";
import { createThemeSchema } from "@/schemas/theme";
import { postTheme } from "@/services/post-theme";

export const createThemeAction = authActionClient
  .inputSchema(createThemeSchema)
  .metadata({
    actionName: "create-theme",
  })
  .action(async ({ parsedInput }) => {
    const [error, data] = await postTheme(parsedInput);

    if (error) {
      throw new ExpectedError(error);
    }

    return { theme: data.data, message: data.meta?.message };
  });
