"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { catalogSchema } from "./schema";
import { redirect } from "next/navigation";

export const createCatalogAction = authActionClient
  .schema(catalogSchema)
  .metadata({
    actionName: "create-catalog"
  })
  .action(async ({
    parsedInput: { name, slug, isPublished },
    ctx: { accessToken }
  }) => {
    const res = await fetch(`${process.env.API_URL}/api/v1/catalogs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, slug, isPublished
      })
    })

    if (!res.ok) return;

    revalidateTag("user")
    redirect("/")
  })
