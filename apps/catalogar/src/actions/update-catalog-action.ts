"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/classes/ExpectedError";
import { putCatalog } from "@/services/put-catalog";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { updateCatalogSchema } from "@/schemas/catalog";
import { tags } from "@/tags";

export const updateCatalogAction = authActionClientWithUser
  .inputSchema(updateCatalogSchema)
  .metadata({
    actionName: "update-catalog",
  })
  .action(
    async ({
      parsedInput: { name, isPublished },
      ctx: {
        user: { currentCatalog },
      },
    }) => {
      const [userError, userData] = await getUser();

      if (userError) {
        throw new ExpectedError(userError);
      }

      const user = userData.data;

      if (!user.currentCatalog) {
        throw new Error("Catálogo atual não definido");
      }

      // Publicar pela a primeira vez
      if (isPublished && !user.currentCatalog?.slug) {
        const [putCatalogError] = await putCatalog({
          name,
        });

        if (putCatalogError) {
          throw new ExpectedError(putCatalogError);
        }

        redirect(routes.catalog.sub.prePublish.url);
      }

      // Alterar normalmente (caso já tenha publicado antes)
      const [putCatalogError, putCatalogData] = await putCatalog({
        name,
        isPublished,
        slug: user.currentCatalog.slug,
      });

      if (putCatalogError) {
        throw new ExpectedError(putCatalogError);
      }

      if (currentCatalog?.isPublished && currentCatalog.slug) {
        revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
      }

      return {
        catalog: putCatalogData.data,
        message: putCatalogData.meta?.message,
      };
    },
  );
