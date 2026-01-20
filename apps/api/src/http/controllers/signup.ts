import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeSignupUseCase } from "@/use-cases/factories/make-signup-use-case";

export async function signup(request: FastifyRequest, reply: FastifyReply) {
  const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = signupSchema.parse(request.body);

  const signupUseCase = makeSignupUseCase();

  const { user } = await signupUseCase.execute({ email, password });

  return reply.status(201).send({ user });
}
