import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { auth } from "@/lib/auth";
import { signup } from "./controllers/signup";

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  // Convert Fastify headers to standard Headers object
  const headers = new Headers();
  Object.entries(request.headers).forEach(([key, value]) => {
    if (value) headers.append(key, value.toString());
  });

  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    reply.status(401).send({
      error: "Unauthorized",
      code: "UNAUTHORIZED",
    });
    return null;
  }

  console.log("session", session);
}

export async function routes(app: FastifyInstance) {
  app.post("/users", signup);
  app.post("/sessions", authenticate);

  /** Authenticated */
  app.get(
    "/me",
    {
      preHandler: [authenticate],
    },
    async (_, reply) => {
      return reply.status(200).send({
        message: "Authenticated profile data",
      });
    },
  );
}
