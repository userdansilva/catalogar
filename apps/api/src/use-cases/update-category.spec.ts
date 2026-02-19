import { beforeEach, describe, expect, it } from "vitest";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import { InMemoryCatalogsRepository } from "@/repositories/in-memory/in-memory-catalogs-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { DuplicatedFieldError } from "./errors/duplicated-field-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UpdateCategoryUseCase } from "./update-category";

let categoriesRepository: CategoriesRepository;
let catalogsRepository: CatalogsRepository;
let updateCategoryUseCase: UpdateCategoryUseCase;

let catalogId: string;
let categoryId: string;

describe("Update Category Use Case", () => {
  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoriesRepository();
    catalogsRepository = new InMemoryCatalogsRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoriesRepository,
      catalogsRepository,
    );

    // Create a catalog for testing
    const catalog = await catalogsRepository.create({
      user_id: "user-123",
    });

    catalogId = catalog.id;

    // Create a category for testing
    const category = await categoriesRepository.create({
      name: "Books",
      catalog_id: catalogId,
    });

    categoryId = category.id;
  });

  it("should update a category", async () => {
    const { category } = await updateCategoryUseCase.execute({
      id: categoryId,
      name: "Updated Books",
      catalogId,
    });

    expect(category).toBeDefined();
    expect(category.name).toBe("Updated Books");
    expect(category.catalog_id).toBe(catalogId);
  });

  it("should not update a category with a duplicate name in the same catalog", async () => {
    await categoriesRepository.create({
      name: "Movies",
      catalog_id: catalogId,
    });

    await expect(() =>
      updateCategoryUseCase.execute({
        id: categoryId,
        name: "Movies",
        catalogId,
      }),
    ).rejects.toBeInstanceOf(DuplicatedFieldError);
  });

  it("should not update a category for a non-existent catalog", async () => {
    await expect(() =>
      updateCategoryUseCase.execute({
        id: categoryId,
        name: "Music",
        catalogId: "non-existent-catalog-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not update a non-existent category", async () => {
    await expect(() =>
      updateCategoryUseCase.execute({
        id: "non-existent-category-id",
        name: "Music",
        catalogId,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
