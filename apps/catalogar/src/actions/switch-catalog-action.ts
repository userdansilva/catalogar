"use server";

import { z } from "zod";
import { putUserCurrentCatalog } from "@/services/put-user-current-catalog";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClient } from "@/lib/next-safe-action";

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
