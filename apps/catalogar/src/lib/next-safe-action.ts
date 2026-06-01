import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { getSession } from "@/utils/get-session";
import prisma from "./prisma";

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
}).use(async ({ next }) => {
  const session = await getSession();

  return next({ ctx: { session } });
});

export const authActionClientWithUser = authActionClient.use(
  async ({ next, ctx: { session } }) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email,
      },
    });

    return next({ ctx: { user } });
  },
);
