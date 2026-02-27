import type { Category, Prisma } from "generated/prisma/client";
import type { CategoriesRepository } from "../categories-repository";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[] = [];

  async create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category> {
    const category: Category = {
      id: crypto.randomUUID(),
      name: data.name,
      catalog_id: data.catalog_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.categories.push(category);

    return category;
  }

  async update(
    id: string,
    data: Prisma.CategoryUncheckedUpdateInput,
  ): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );

    const category = this.categories[categoryIndex];

    if (categoryIndex === -1 || !category) {
      throw new Error("Category not found");
    }

    const updatedCategory: Category = {
      ...category,
      name: typeof data.name === "string" ? data.name : category.name,
      updated_at: new Date(),
    };

    this.categories[categoryIndex] = updatedCategory;

    return updatedCategory;
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
    const category = this.categories.find(
      (category) => category.id === id && category.catalog_id === catalogId,
    );

    if (!category) return null;

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
    const category = this.categories.find(
      (category) => category.name === name && category.catalog_id === catalogId,
    );

    if (!category) return null;

    return category;
  }

  async findByNameAndIdNotAndCatalogId(
    name: string,
    id: string,
    catalogId: string,
  ): Promise<Category | null> {
    const category = this.categories.find(
      (category) =>
        category.name === name &&
        category.id !== id &&
        category.catalog_id === catalogId,
    );

    if (!category) return null;

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
    return this.categories.filter(
      (category) => category.catalog_id === catalogId,
    );
  }
}
