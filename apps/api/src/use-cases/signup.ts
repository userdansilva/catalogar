import { hash } from "bcryptjs";
import type { User } from "generated/prisma/client";
import { UniqueFieldConflitError } from "@/common/error/unique-field-conflict-error";
import type { UsersRepository } from "@/repositories/users-repository";

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
    const password_hash = await hash(password, 6);

    const existsByEmail = await this.usersRepository.existsByEmail(email);

    if (existsByEmail) {
      throw new UniqueFieldConflitError(
        `Usuário com email: ${email} já cadastrado.`,
      );
    }

    const user = await this.usersRepository.create({
      email,
      password_hash,
    });

    return { user };
  }
}
