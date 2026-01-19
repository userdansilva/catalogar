import type { FastifyReply, FastifyRequest } from "fastify";
import z, { ZodError } from "zod";
import { env } from "@/env";
import { InvalidCredentialsError } from "./invalid-credentials-error";
import { UniqueFieldConflitError } from "./unique-field-conflict-error";

export function defaultErrorHandler(
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  /** Validation Errors */
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Há dados inválidos na requisição",
      errors: z.treeifyError(error),
    });
  }

  /** Custom Errors */
  if (error instanceof UniqueFieldConflitError) {
    return reply.status(409).send({
      message: error.message,
    });
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({
      message: error.message,
    });
  }

  /** Logging */
  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  /** Default Error */
  return reply.status(500).send({
    message: "Ocorreu um erro inesperado!",
  });
}
