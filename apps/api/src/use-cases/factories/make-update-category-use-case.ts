import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { UpdateCategoryUseCase } from "../update-category";

export function makeUpdateCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const catalogsRepository = new PrismaCatalogsRepository();
  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoriesRepository,
    catalogsRepository,
  );

  return updateCategoryUseCase;
}
