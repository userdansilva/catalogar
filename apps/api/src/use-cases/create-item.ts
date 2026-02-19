import type { Item } from "generated/prisma/client";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import type { ItemsRepository } from "@/repositories/items-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type CreateItemUseCaseRequest = {
  name: string;
  catalogId: string;
  categoryId?: string;
};

type CreateItemUseCaseResponse = {
  item: Item;
};

export class CreateItemUseCase {
  constructor(
    private itemsRepository: ItemsRepository,
    private catalogsRepository: CatalogsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    name,
    catalogId,
    categoryId,
  }: CreateItemUseCaseRequest): Promise<CreateItemUseCaseResponse> {
    const catalogExists = await this.catalogsRepository.existsById(catalogId);

    if (!catalogExists) {
      throw new ResourceNotFoundError("Catalog not found.");
    }

    if (categoryId) {
      const categoryExists =
        await this.categoriesRepository.existsByIdAndCatalogId(
          categoryId,
          catalogId,
        );

      if (!categoryExists) {
        throw new ResourceNotFoundError("Category not found.");
      }
    }

    const item = await this.itemsRepository.create({
      name,
      catalog_id: catalogId,
      category_id: categoryId,
    });

    return { item };
  }
}
