import type { Catalog } from "generated/prisma/client";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import { DuplicatedFieldError } from "./errors/duplicated-field-error";

type CreateCatalogUseCaseRequest = {
  name: string;
  userId: string;
};

type CreateCatalogUseCaseResponse = {
  catalog: Catalog;
};

export class CreateCatalogUseCase {
  constructor(private catalogsRepository: CatalogsRepository) {}

  async execute({
    name,
    userId,
  }: CreateCatalogUseCaseRequest): Promise<CreateCatalogUseCaseResponse> {
    const hasCatalogWithSameName =
      await this.catalogsRepository.existsByNameAndUserId(name, userId);

    if (hasCatalogWithSameName) {
      throw new DuplicatedFieldError(
        `Você já possui um catálogo com esse nome: ${name}.`,
      );
    }

    const catalog = await this.catalogsRepository.create({
      name,
      user_id: userId,
    });

    return { catalog };
  }
}
