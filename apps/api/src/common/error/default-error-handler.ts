import type { FastifyReply, FastifyRequest } from "fastify";
import z, { ZodError } from "zod";
import { env } from "@/env";
import { UniqueFieldConflitError } from "./unique-field-conflict-error";

export function defaultErrorHandler(
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Há dados inválidos na requisição",
      errors: z.treeifyError(error),
    });
  }

  if (error instanceof UniqueFieldConflitError) {
    return reply.status(409).send({
      message: error.message,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({
    message: "Ocorreu um erro inesperado!",
  });
}
