import { compare } from "bcryptjs";
import type { User } from "generated/prisma/client";
import type { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError("E-mail e/ou senha incorretos!");
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError("E-mail e/ou senha incorretos!");
    }

    return { user };
  }
}
