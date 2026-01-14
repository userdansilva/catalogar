import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { SignupUseCase } from "@/use-cases/signup";

export async function signup(request: FastifyRequest, reply: FastifyReply) {
  const signupSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = signupSchema.parse(request.body);

  try {
    const usersRespository = new PrismaUsersRepository();
    const signupUseCase = new SignupUseCase(usersRespository);

    const user = await signupUseCase.execute({ name, email, password });

    return reply.status(201).send({ user });
  } catch (err) {
    const error = err as Error;

    return reply.status(400).send({
      message: error.message,
    });
  }
}
