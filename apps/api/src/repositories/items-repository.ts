import type { Item, Prisma } from "generated/prisma/client";

export interface ItemsRepository {
  create(data: Prisma.ItemUncheckedCreateInput): Promise<Item>;
  update(id: string, data: Prisma.ItemUncheckedUpdateInput): Promise<Item>;
  existsByIdAndCatalogId(id: string, catalogId: string): Promise<boolean>;
  findByIdAndCatalogId(id: string, catalogId: string): Promise<Item | null>;
}
