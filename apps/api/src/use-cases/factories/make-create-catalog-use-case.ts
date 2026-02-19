import { PrismaCatalogsRepository } from "@/repositories/prisma/prisma-catalogs-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateCatalogUseCase } from "../create-catalog";

export function makeCreateCatalogUseCase() {
  const catalogsRepository = new PrismaCatalogsRepository();
  const usersRepository = new PrismaUsersRepository();
  const createCatalogUseCase = new CreateCatalogUseCase(
    catalogsRepository,
    usersRepository,
  );

  return createCatalogUseCase;
}
