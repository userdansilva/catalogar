"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { updateCatalogSchema } from "./schema";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/classes/ExpectedError";
import { putCatalog } from "@/services/put-catalog";

export const updateCatalogAction = authActionClient
  .inputSchema(updateCatalogSchema)
  .metadata({
    actionName: "update-catalog",
  })
  .action(async ({ parsedInput: { name, isPublished } }) => {
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

      revalidateTag(tags.users.me);
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

    revalidateTag(tags.users.me);

    if (user.currentCatalog.isPublished && user.currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(user.currentCatalog.slug));
    }

    return {
      catalog: putCatalogData.data,
      message: putCatalogData.meta?.message,
    };
  });
