import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { Session, User } from "better-auth";
import { auth } from "@/lib/auth";
import { getUserById } from "@/queries/users";

type TRPCContext = {
  session: {
    session: Session;
    user: User;
  } | null;
};

export async function createTRPCContext({
  req,
}: CreateFastifyContextOptions): Promise<TRPCContext> {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (value) headers.append(key, value.toString());
  });

  const session = await auth.api.getSession({
    headers,
  });

  return { session };
}

export const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;

const isAuthed = t.middleware(async function isAuthed(opts) {
  const { ctx } = opts;

  const userId = ctx.session?.user.id;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Não autorizado.",
    });
  }

  const user = await getUserById(userId);

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Usuário não encontrado.",
    });
  }

  if (!user.catalog) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Catálogo não encontrado.",
    });
  }

  return opts.next({
    ctx: {
      user,
      catalog: user.catalog,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
