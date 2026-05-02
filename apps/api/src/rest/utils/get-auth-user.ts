import type { FastifyReply, FastifyRequest } from "fastify";
import { getUser } from "@/queries/users";
import { getSession } from "./get-session";

export async function getAuthUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const session = await getSession(request);

  if (!session) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "You must be logged in to access this resource",
    });
  }

  const user = await getUser({
    id: session.user.id,
  });

  if (!user) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "User not found",
    });
  }

  if (!user.catalog?.id) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "User does not have a catalog",
    });
  }

  return {
    ...user,
    catalog: user.catalog,
  };
}
