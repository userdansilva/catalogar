import type { Item } from "generated/prisma/client";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import type { ItemsRepository } from "@/repositories/items-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type UpdateItemUseCaseRequest = {
  id: string;
  name: string;
  catalogId: string;
  categoryId?: string;
};

type UpdateItemUseCaseResponse = {
  item: Item;
};

export class UpdateItemUseCase {
  constructor(
    private itemsRepository: ItemsRepository,
    private catalogsRepository: CatalogsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    id,
    name,
    catalogId,
    categoryId,
  }: UpdateItemUseCaseRequest): Promise<UpdateItemUseCaseResponse> {
    const catalogExists = await this.catalogsRepository.existsById(catalogId);

    if (!catalogExists) {
      throw new ResourceNotFoundError("Catalog not found.");
    }

    const itemExists = await this.itemsRepository.existsByIdAndCatalogId(
      id,
      catalogId,
    );

    if (!itemExists) {
      throw new ResourceNotFoundError("Item not found.");
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

    const item = await this.itemsRepository.update(id, {
      name,
      catalog_id: catalogId,
      category_id: categoryId,
    });

    return { item };
  }
}
