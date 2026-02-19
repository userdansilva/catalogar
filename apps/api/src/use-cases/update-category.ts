import type { Category } from "generated/prisma/client";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import { DuplicatedFieldError } from "./errors/duplicated-field-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type UpdateCategoryUseCaseRequest = {
  id: string;
  name: string;
  catalogId: string;
};

type UpdateCategoryUseCaseResponse = {
  category: Category;
};

export class UpdateCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private catalogsRepository: CatalogsRepository,
  ) {}

  async execute({
    id,
    name,
    catalogId,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const catalogExists = await this.catalogsRepository.existsById(catalogId);

    if (!catalogExists) {
      throw new ResourceNotFoundError("Catalog not found.");
    }

    const categoryExists =
      await this.categoriesRepository.existsByIdAndCatalogId(id, catalogId);

    if (!categoryExists) {
      throw new ResourceNotFoundError("Category not found.");
    }

    const nameAlreadyExists =
      await this.categoriesRepository.existsByNameAndIdNotAndCatalogId(
        name,
        id,
        catalogId,
      );

    if (nameAlreadyExists) {
      throw new DuplicatedFieldError(
        `Category with name: ${name} already exists in this catalog.`,
      );
    }

    const category = await this.categoriesRepository.update(id, {
      name,
      catalog_id: catalogId,
    });

    return { category };
  }
}
