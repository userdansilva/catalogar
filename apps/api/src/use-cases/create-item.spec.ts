import { beforeEach, describe, expect, it } from "vitest";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import { InMemoryCatalogsRepository } from "@/repositories/in-memory/in-memory-catalogs-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryItemsRepository } from "@/repositories/in-memory/in-memory-items-repository";
import type { ItemsRepository } from "@/repositories/items-repository";
import { CreateItemUseCase } from "./create-item";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let itemsRepository: ItemsRepository;
let catalogsRepository: CatalogsRepository;
let categoriesRepository: CategoriesRepository;
let createItemUseCase: CreateItemUseCase;

let catalogId: string;
let categoryId: string;

describe("Create Item Use Case", () => {
  beforeEach(async () => {
    itemsRepository = new InMemoryItemsRepository();
    catalogsRepository = new InMemoryCatalogsRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    createItemUseCase = new CreateItemUseCase(
      itemsRepository,
      catalogsRepository,
      categoriesRepository,
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

  it("should create a new basic item", async () => {
    const { item } = await createItemUseCase.execute({
      name: "The Great Gatsby",
      catalogId,
    });

    expect(item).toBeDefined();
    expect(item.id).toBeDefined();
    expect(item.name).toBe("The Great Gatsby");
    expect(item.catalog_id).toBe(catalogId);
  });

  it("should create a new complete item", async () => {
    const { item } = await createItemUseCase.execute({
      name: "The Great Gatsby",
      catalogId,
      categoryId,
    });

    expect(item).toBeDefined();
    expect(item.id).toBeDefined();
    expect(item.name).toBe("The Great Gatsby");
    expect(item.catalog_id).toBe(catalogId);
    expect(item.category_id).toBe(categoryId);
  });

  it("should not create an item for a non-existent catalog", async () => {
    await expect(() =>
      createItemUseCase.execute({
        name: "The Great Gatsby",
        catalogId: "non-existent-catalog-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not create an item for a non-existent category", async () => {
    await expect(() =>
      createItemUseCase.execute({
        name: "The Great Gatsby",
        catalogId,
        categoryId: "non-existent-category-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
