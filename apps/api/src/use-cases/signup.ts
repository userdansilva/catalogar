import { hash } from "bcryptjs";
import type { User } from "generated/prisma/client";
import type { UsersRepository } from "@/repositories/users-repository";
import { UniqueFieldConflictError } from "@/use-cases/errors/unique-field-conflict-error";

type SignupUseCaseRequest = {
  email: string;
  password: string;
};

type SignupUseCaseResponse = {
  user: User;
};

export class SignupUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: SignupUseCaseRequest): Promise<SignupUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const existsByEmail = await this.usersRepository.existsByEmail(email);

    if (existsByEmail) {
      throw new UniqueFieldConflictError(
        `Usuário com email: ${email} já cadastrado.`,
      );
    }

    const user = await this.usersRepository.create({
      email,
      passwordHash,
    });

    return { user };
  }
}
