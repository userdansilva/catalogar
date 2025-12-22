"use server";

import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClient } from "@/lib/next-safe-action";
import { createCatalogSchema } from "@/schemas/catalog";
import { postCatalog } from "@/services/post-catalog";

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

    return { catalog: data.data, message: data.meta?.message };
  });
