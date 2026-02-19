import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "../create-category";

export function makeCreateCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const catalogsRepository = new PrismaCatalogsRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    categoriesRepository,
    catalogsRepository,
  );

  return createCategoryUseCase;
}
