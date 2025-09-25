"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { postTheme } from "@/services/post-theme";
import { ExpectedError } from "@/classes/ExpectedError";
import { createThemeSchema } from "@/schemas/theme";
import { authActionClient } from "@/lib/next-safe-action";

export const createThemeAction = authActionClient
  .inputSchema(createThemeSchema)
  .metadata({
    actionName: "create-theme",
  })
  .action(async ({ parsedInput: { primaryColor, secondaryColor, logo } }) => {
    const [error, data] = await postTheme({
      primaryColor,
      secondaryColor,
      logo: logo?.fileName
        ? {
            fileName: logo.fileName,
            url: logo.url,
            sizeInBytes: logo.sizeInBytes,
            width: logo.width,
            height: logo.height,
            altText: logo.altText,
          }
        : undefined,
    });

    if (error) {
      throw new ExpectedError(error);
    }

    revalidateTag(tags.users.me);

    return { theme: data.data, message: data.meta?.message };
  });
