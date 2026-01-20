import type { User } from "generated/prisma/client";
import type { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type GetUserProfileUseCaseRequest = {
  userId: string;
};

type GetUserProfileUseCaseResponse = {
  user: User;
};

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError("Usuário não encontrado.");
    }

    return { user };
  }
}
