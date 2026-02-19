import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository";
import { CreateItemUseCase } from "../create-item";

export function makeCreateItemUseCase() {
  const itemsRepository = new PrismaItemsRepository();
  const catalogsRepository = new PrismaCatalogsRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  const createItemUseCase = new CreateItemUseCase(
    itemsRepository,
    catalogsRepository,
    categoriesRepository,
  );

  return createItemUseCase;
}
