import { hash } from "bcryptjs";
import { UniqueFieldConflitError } from "@/common/error/unique-field-conflict-error";
import type { UsersRepository } from "@/repositories/users-repository";

type SignupUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

export class SignupUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: SignupUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const existsByEmail = await this.usersRepository.existsByEmail(email);

    if (existsByEmail) {
      throw new UniqueFieldConflitError(
        `Usuário com email: ${email} já cadastrado.`,
      );
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return user;
  }
}
