"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { putTheme } from "@/services/put-theme";
import { ExpectedError } from "@/classes/ExpectedError";
import { getUser } from "@/services/get-user";
import { authActionClient } from "@/lib/next-safe-action";
import { updateThemeSchema } from "@/schemas/theme";

export const updateThemeAction = authActionClient
  .inputSchema(updateThemeSchema)
  .metadata({
    actionName: "update-theme",
  })
  .action(async ({ parsedInput: { primaryColor, secondaryColor, logo } }) => {
    const [putThemeError, putThemeData] = await putTheme({
      primaryColor,
      secondaryColor,
      logo:
        logo && logo.fileName
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

    if (putThemeError) {
      throw new ExpectedError(putThemeError);
    }

    revalidateTag(tags.users.me);

    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    const { currentCatalog } = userData.data;

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
    }

    return { theme: putThemeData.data, message: putThemeData.meta?.message };
  });
