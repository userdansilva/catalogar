import type { Category, Prisma } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { CategoriesRepository } from "../categories-repository";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category> {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }

  async update(
    id: string,
    data: Prisma.CategoryUncheckedUpdateInput,
  ): Promise<Category> {
    const category = await prisma.category.update({
      data,
      where: {
        id,
      },
    });

    return category;
  }

  async existsByIdAndCatalogId(
    id: string,
    catalogId: string,
  ): Promise<boolean> {
    const category = await this.findByIdAndCatalogId(id, catalogId);

    return !!category;
  }

  async findByIdAndCatalogId(
    id: string,
    catalogId: string,
  ): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        id,
        catalog_id: catalogId,
      },
    });

    return category;
  }

  async existsByNameAndCatalogId(
    name: string,
    catalogId: string,
  ): Promise<boolean> {
    const category = await this.findByNameAndCatalogId(name, catalogId);

    return !!category;
  }

  async findByNameAndCatalogId(
    name: string,
    catalogId: string,
  ): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        name,
        catalog_id: catalogId,
      },
    });

    return category;
  }

  async findByNameAndIdNotAndCatalogId(
    name: string,
    id: string,
    catalogId: string,
  ): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        name,
        id: {
          not: id,
        },
        catalog_id: catalogId,
      },
    });

    return category;
  }

  async existsByNameAndIdNotAndCatalogId(
    name: string,
    id: string,
    catalogId: string,
  ): Promise<boolean> {
    const category = await this.findByNameAndIdNotAndCatalogId(
      name,
      id,
      catalogId,
    );

    return !!category;
  }

  async findAllByCatalogId(catalogId: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        catalog_id: catalogId,
      },
    });

    return categories;
  }
}
