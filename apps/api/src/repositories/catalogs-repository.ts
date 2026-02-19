import type { Catalog, Prisma } from "generated/prisma/client";

export interface CatalogsRepository {
  create(data: Prisma.CatalogUncheckedCreateInput): Promise<Catalog>;
  findById(id: string): Promise<Catalog | null>;
  existsById(id: string): Promise<boolean>;
  findByUserId(userId: string): Promise<Catalog | null>;
}
