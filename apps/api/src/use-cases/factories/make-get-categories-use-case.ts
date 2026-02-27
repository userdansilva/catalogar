import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { GetCategoriesUseCase } from "../get-categories";

export function makeGetCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const catalogsRepository = new PrismaCatalogsRepository();
  const getCategoriesUseCase = new GetCategoriesUseCase(
    categoriesRepository,
    catalogsRepository,
  );

  return getCategoriesUseCase;
}
