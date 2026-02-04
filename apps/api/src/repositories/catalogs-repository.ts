import type { Catalog, Prisma } from "generated/prisma/client";

export interface CatalogsRepository {
  create(data: Prisma.CatalogUncheckedCreateInput): Promise<Catalog>;
  existsByNameAndUserId(name: string, userId: string): Promise<boolean>;
  findByNameAndUserId(name: string, userId: string): Promise<Catalog | null>;
}
