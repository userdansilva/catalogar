"use server";

import { revalidateTag } from "next/cache";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { updateThemeSchema } from "@/schemas/theme";
import { putTheme } from "@/services/put-theme";
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
        logo: logo ?? undefined,
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
