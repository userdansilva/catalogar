"use server"

import { z } from "zod"
import { authActionClient } from "./safe-action"
import { revalidateTag } from "next/cache"

export const switchCatalogAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .metadata({
    actionName: "switch-catalog-action"
  })
  .action(async ({
    parsedInput: { id },
    ctx: { accessToken }
  }) => {
    const res = await fetch(`${process.env.API_URL}/api/v1/users/me/current-catalog/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })

    if (!res.ok) return;

    revalidateTag("user")
  })
