import { AxiosError } from "axios";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { getUser } from "@/services/get-user";
import { ApiError } from "@/types/api-error";
import { UserWithCatalog } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

const authMiddleware = createMiddleware<{
  ctx: { Authorization: string; user: UserWithCatalog };
  metada: { actionName: string };
}>().define(async ({ ctx, next }) =>
  next({
    ctx: {
      Authorization: ctx.Authorization,
    },
  }),
);

export const authActionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError(e) {
    if (e instanceof AxiosError) {
      return (e as AxiosError<ApiError>).response?.data;
    }

    return {
      message: "Ops! Algo deu errado. Por favor, tente novamente",
      errors: [],
    };
  },
})
  .use(async ({ next }) => {
    const { Authorization } = await getSession();
    const { data: user } = await getUser();

    return next({ ctx: { Authorization, user } });
  })
  .use(authMiddleware);
