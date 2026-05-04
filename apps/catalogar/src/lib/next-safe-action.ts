import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { getUser } from "@/services/get-user";

export const authActionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError() {
    return {
      message: "Ops! Algo deu errado. Por favor, tente novamente",
    };
  },
});

export const authActionClientWithUser = authActionClient.use(
  async ({ next }) => {
    const user = await getUser();

    return next({ ctx: { user } });
  },
);
