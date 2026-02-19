import { beforeEach, describe, expect, it } from "vitest";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import { InMemoryCatalogsRepository } from "@/repositories/in-memory/in-memory-catalogs-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { CreateCategoryUseCase } from "./create-category";
import { DuplicatedFieldError } from "./errors/duplicated-field-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let categoriesRepository: CategoriesRepository;
let catalogsRepository: CatalogsRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let catalogId: string;

describe("Create Category Use Case", () => {
  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoriesRepository();
    catalogsRepository = new InMemoryCatalogsRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepository,
      catalogsRepository,
    );

    // Create a catalog for testing
    const catalog = await catalogsRepository.create({
      user_id: "user-123",
    });

    catalogId = catalog.id;
  });

  it("should create a new category", async () => {
    const { category } = await createCategoryUseCase.execute({
      name: "Books",
      catalogId,
    });

    expect(category).toBeDefined();
    expect(category.id).toBeDefined();
    expect(category.name).toBe("Books");
    expect(category.catalog_id).toBe(catalogId);
  });

  it("should not create a category with a duplicate name in the same catalog", async () => {
    await createCategoryUseCase.execute({
      name: "Movies",
      catalogId,
    });

    await expect(() =>
      createCategoryUseCase.execute({
        name: "Movies",
        catalogId,
      }),
    ).rejects.toBeInstanceOf(DuplicatedFieldError);
  });

  it("should not create a category for a non-existent catalog", async () => {
    await expect(() =>
      createCategoryUseCase.execute({
        name: "Music",
        catalogId: "non-existent-catalog-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
