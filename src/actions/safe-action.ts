import { auth } from "@/auth"
import { createMiddleware, createSafeActionClient } from "next-safe-action"
import { z } from "zod"

const authMiddleware = createMiddleware<{
  ctx: { accessToken: string }
  metada: { actionName: string }
}>().define(async ({ ctx, next }) => {
  return next({
    ctx: {
      accessToken: ctx.accessToken
    }
  })
})

export const authActionClient = createSafeActionClient({
  defineMetadataSchema: () => {
    return z.object({
      actionName: z.string()
    })
  }
})
  .use(async ({ next }) => {
    const session = await auth();

    if (!session) {
      throw new Error("Session not found!")
    }

    const accessToken = session.accessToken

    return next({ ctx: { accessToken } })
  })
  .use(authMiddleware)
