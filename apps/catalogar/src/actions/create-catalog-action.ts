"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/tags";
import { postCatalog } from "@/services/post-catalog";
import { ExpectedError } from "@/classes/ExpectedError";
import { createCatalogSchema } from "@/schemas/catalog";
import { authActionClient } from "@/lib/next-safe-action";

export const createCatalogAction = authActionClient
  .inputSchema(createCatalogSchema)
  .metadata({
    actionName: "create-catalog",
  })
  .action(async ({ parsedInput: { name } }) => {
    const [error, data] = await postCatalog({
      name,
    });

    if (error) {
      throw new ExpectedError(error);
    }

    revalidateTag(tags.users.me);

    return { catalog: data.data, message: data.meta?.message };
  });
