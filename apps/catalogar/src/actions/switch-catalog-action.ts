"use server";

import { z } from "zod";
import { authActionClient } from "./safe-action";

export const switchCatalogAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .metadata({
    actionName: "switch-catalog-action",
  })
  .action(async ({ parsedInput: { id }, ctx: { Authorization } }) => {
    await fetch(
      `${process.env.API_URL}/api/v1/users/me/current-catalog/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization,
        },
      },
    );
  });
