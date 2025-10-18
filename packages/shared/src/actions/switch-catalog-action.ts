"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { authActionClient } from "@catalogar/shared/next-safe-action";
import { getAuthHeaders } from "@catalogar/shared/get-auth-headers";
import { putUserCurrentCatalog } from "@catalogar/shared/put-user-current-catalog";
import { DefaultApiError } from "@catalogar/shared/classes/default-api-error";
import { tag } from "@catalogar/shared/tags";

export const switchCatalogAction = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .metadata({
    actionName: "switch-catalog-action",
  })
  .action(async ({ parsedInput: { id } }) => {
    const headers = await getAuthHeaders();

    const [error] = await putUserCurrentCatalog(id, {
      headers,
    });

    if (error) {
      throw new DefaultApiError(error);
    }

    revalidateTag(tag.getUser);
  });
