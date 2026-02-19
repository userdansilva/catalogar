import type { Category, Prisma } from "generated/prisma/client";

export interface CategoriesRepository {
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>;
  update(
    id: string,
    data: Prisma.CategoryUncheckedUpdateInput,
  ): Promise<Category>;
  existsByIdAndCatalogId(id: string, catalogId: string): Promise<boolean>;
  findByIdAndCatalogId(id: string, catalogId: string): Promise<Category | null>;
  existsByNameAndCatalogId(name: string, catalogId: string): Promise<boolean>;
  findByNameAndCatalogId(
    name: string,
    catalogId: string,
  ): Promise<Category | null>;
  findByNameAndIdNotAndCatalogId(
    name: string,
    id: string,
    catalogId: string,
  ): Promise<Category | null>;
  existsByNameAndIdNotAndCatalogId(
    name: string,
    id: string,
    catalogId: string,
  ): Promise<boolean>;
}
