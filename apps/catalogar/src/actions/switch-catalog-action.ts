"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { putUserCurrentCatalog } from "@/services/put-user-current-catalog";
import { ExpectedError } from "@/classes/ExpectedError";
import { tags } from "@/tags";

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

    // Como lidar com outras validações que existe?
    revalidateTag(tags.users.me);
  });
