import type { Category } from "generated/prisma/client";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import { DuplicatedFieldError } from "./errors/duplicated-field-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type CreateCategoryUseCaseRequest = {
  name: string;
  catalogId: string;
};

type CreateCategoryUseCaseResponse = {
  category: Category;
};

export class CreateCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private catalogsRepository: CatalogsRepository,
  ) {}

  async execute({
    name,
    catalogId,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const catalogExists = await this.catalogsRepository.existsById(catalogId);

    if (!catalogExists) {
      throw new ResourceNotFoundError("Catalog not found.");
    }

    const nameAlreadyExists =
      await this.categoriesRepository.existsByNameAndCatalogId(name, catalogId);

    if (nameAlreadyExists) {
      throw new DuplicatedFieldError(
        `Category with name: ${name} already exists in this catalog.`,
      );
    }

    const category = await this.categoriesRepository.create({
      name,
      catalog_id: catalogId,
    });

    return { category };
  }
}
