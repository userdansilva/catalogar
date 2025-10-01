"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/next-safe-action";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { putUserCurrentCatalog } from "@/services/put-user-current-catalog";
import { DefaultApiError } from "@/classes/default-api-error";
import { tag } from "@/tag";

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
