import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const usersRespository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRespository);

  return authenticateUseCase;
}
