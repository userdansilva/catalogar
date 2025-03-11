"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { catalogSchema } from "./schema";
import { api } from "./api";

export const createCatalogAction = authActionClient
  .schema(catalogSchema)
  .metadata({
    actionName: "create-catalog"
  })
  .action(async ({
    parsedInput: { name, slug, isPublished },
    ctx: { accessToken }
  }) => {
    await api.post("/v1/catalogs", {
      name, slug, isPublished
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    revalidateTag("user")
  })
