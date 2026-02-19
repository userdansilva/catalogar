import { beforeEach, describe, expect, it } from "vitest";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import { InMemoryCatalogsRepository } from "@/repositories/in-memory/in-memory-catalogs-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryItemsRepository } from "@/repositories/in-memory/in-memory-items-repository";
import type { ItemsRepository } from "@/repositories/items-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UpdateItemUseCase } from "./update-item";

let itemsRepository: ItemsRepository;
let catalogsRepository: CatalogsRepository;
let categoriesRepository: CategoriesRepository;
let updateItemUseCase: UpdateItemUseCase;

let catalogId: string;
let categoryId: string;
let itemId: string;

describe("Update Item Use Case", () => {
  beforeEach(async () => {
    itemsRepository = new InMemoryItemsRepository();
    catalogsRepository = new InMemoryCatalogsRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    updateItemUseCase = new UpdateItemUseCase(
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

    // Create an item for testing
    const item = await itemsRepository.create({
      name: "The Great Gatsby",
      catalog_id: catalogId,
    });
    itemId = item.id;
  });

  it("should update an existing basic item", async () => {
    const { item } = await updateItemUseCase.execute({
      id: itemId,
      name: "The Great Gatsby - Updated",
      catalogId,
    });

    expect(item).toBeDefined();
    expect(item.name).toBe("The Great Gatsby - Updated");
  });

  it("should update an existing complete item", async () => {
    const { item } = await updateItemUseCase.execute({
      id: itemId,
      name: "The Great Gatsby - Updated",
      catalogId,
      categoryId,
    });

    expect(item).toBeDefined();
    expect(item.name).toBe("The Great Gatsby - Updated");
    expect(item.category_id).toBe(categoryId);
  });

  it("should not update an item for a non-existing catalog", async () => {
    await expect(() =>
      updateItemUseCase.execute({
        id: itemId,
        name: "The Great Gatsby - Updated",
        catalogId: "non-existing-catalog-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not update a non-existing item", async () => {
    await expect(() =>
      updateItemUseCase.execute({
        id: "non-existing-item-id",
        name: "The Great Gatsby - Updated",
        catalogId,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not update an item for a non-existing category", async () => {
    await expect(() =>
      updateItemUseCase.execute({
        id: itemId,
        name: "The Great Gatsby - Updated",
        catalogId,
        categoryId: "non-existing-category-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
