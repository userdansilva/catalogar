"use server";

import { revalidateTag } from "next/cache";
import { putTheme } from "@/services/put-theme";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { updateThemeSchema } from "@/schemas/theme";
import { tags } from "@/tags";

export const updateThemeAction = authActionClientWithUser
  .inputSchema(updateThemeSchema)
  .metadata({
    actionName: "update-theme",
  })
  .action(
    async ({
      parsedInput: { primaryColor, secondaryColor, logo },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [error, data] = await putTheme({
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

      if (error) {
        throw new ExpectedError(error);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return { theme: data.data, message: data.meta?.message };
    },
  );
