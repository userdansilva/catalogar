"use server";

import { revalidateTag } from "next/cache";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClientWithUser } from "@/lib/next-safe-action";
import { publishCatalogSchema } from "@/schemas/catalog";
import { getUser } from "@/services/get-user";
import { putCatalog } from "@/services/put-catalog";
import { tags } from "@/tags";

export const publishCatalogAction = authActionClientWithUser
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

    if (currentCatalog?.isPublished && currentCatalog.slug) {
      revalidateTag(tags.publicCatalog.getBySlug(currentCatalog.slug), "max");
    }

    return { catalog: catalogData.data, message: catalogData.meta?.message };
  });
