import { beforeEach, describe, expect, it } from "vitest";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import { InMemoryCatalogsRepository } from "@/repositories/in-memory/in-memory-catalogs-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import { CreateCatalogUseCase } from "./create-catalog";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let catalogsRepository: CatalogsRepository;
let usersRepository: UsersRepository;
let createCatalogUseCase: CreateCatalogUseCase;
let userId: string;

describe("CreateCatalogUseCase", () => {
  beforeEach(async () => {
    catalogsRepository = new InMemoryCatalogsRepository();
    usersRepository = new InMemoryUsersRepository();
    createCatalogUseCase = new CreateCatalogUseCase(
      catalogsRepository,
      usersRepository,
    );

    // Create a user for testing
    const user = await usersRepository.create({
      name: "Test User",
      email: "test.user@catalogar.com.br",
    });

    userId = user.id;
  });

  it("should create a new catalog", async () => {
    const { catalog } = await createCatalogUseCase.execute({
      userId,
    });

    expect(catalog).toBeDefined();
    expect(catalog.id).toBeDefined();
    expect(catalog.user_id).toBe(userId);
  });

  it("should not create a catalog for a non-existing user", async () => {
    await expect(() =>
      createCatalogUseCase.execute({
        userId: "non-existing-user-id",
      }),
    ).rejects.instanceOf(ResourceNotFoundError);
  });
});
