import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { SignupUseCase } from "../signup";

export function makeSignupUseCase() {
  const usersRespository = new PrismaUsersRepository();
  const signupUseCase = new SignupUseCase(usersRespository);

  return signupUseCase;
}
