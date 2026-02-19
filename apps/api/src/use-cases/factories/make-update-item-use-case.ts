import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository";
import { UpdateItemUseCase } from "../update-item";

export function makeUpdateItemUseCase() {
  const itemsRepository = new PrismaItemsRepository();
  const catalogsRepository = new PrismaCatalogsRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  const updateItemUseCase = new UpdateItemUseCase(
    itemsRepository,
    catalogsRepository,
    categoriesRepository,
  );

  return updateItemUseCase;
}
