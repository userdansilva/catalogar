"use server";

import { z } from "zod";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClient } from "@/lib/next-safe-action";
import { putUserCurrentCatalog } from "@/services/put-user-current-catalog";

export const switchCatalogAction = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .metadata({
    actionName: "switch-catalog-action",
  })
  .action(async ({ parsedInput: { id } }) => {
    const [error] = await putUserCurrentCatalog(id);

    if (error) {
      throw new ExpectedError(error);
    }
  });
