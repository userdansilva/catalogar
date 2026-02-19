import type { Catalog } from "generated/prisma/client";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type CreateCatalogUseCaseRequest = {
  userId: string;
};

type CreateCatalogUseCaseResponse = {
  catalog: Catalog;
};

export class CreateCatalogUseCase {
  constructor(
    private catalogsRepository: CatalogsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: CreateCatalogUseCaseRequest): Promise<CreateCatalogUseCaseResponse> {
    const userExists = await this.usersRepository.existsById(userId);

    if (!userExists) {
      throw new ResourceNotFoundError("User not found.");
    }

    const catalog = await this.catalogsRepository.create({
      user_id: userId,
    });

    return { catalog };
  }
}
