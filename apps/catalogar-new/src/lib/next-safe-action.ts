import { headers } from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError(error, { metadata }) {
    console.log("error", error);

    return {
      message:
        error.message || `An error occurred in action ${metadata.actionName}`,
    };
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const headersList = await headers();

  const authHeaders = {
    headers: {
      Cookie: headersList.get("cookie") || "",
    },
  };

  return next({
    ctx: {
      authHeaders,
    },
  });
});
