import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  const { user } = await authenticateUseCase.execute({ email, password });

  return reply.status(200).send({ user });
}
