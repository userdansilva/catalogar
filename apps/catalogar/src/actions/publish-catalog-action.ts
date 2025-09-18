"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { publishCatalogSchema } from "./schema";
import { tags } from "@/tags";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/classes/ExpectedError";
import { putCatalog } from "@/services/put-catalog";

export const publishCatalogAction = authActionClient
  .inputSchema(publishCatalogSchema)
  .metadata({
    actionName: "publish-catalog",
  })
  .action(async ({ parsedInput: { slug } }) => {
    const [userError, userData] = await getUser();

    if (userError) {
      throw new ExpectedError(userError);
    }

    const { currentCatalog } = userData.data;

    if (!currentCatalog) {
      throw new Error("Catálogo atual não definido");
    }

    const [catalogError, catalogData] = await putCatalog({
      name: currentCatalog.name,
      slug,
      isPublished: true,
    });

    if (catalogError) {
      throw new ExpectedError(catalogError);
    }

    revalidateTag(tags.users.me);

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug));
    }

    return { catalog: catalogData.data, message: catalogData.meta?.message };
  });
