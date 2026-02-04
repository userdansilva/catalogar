import { beforeEach, describe, expect, it } from "vitest";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import { InMemoryCatalogsRespository } from "@/repositories/in-memory/in-memory-catalogs-repository";
import { CreateCatalogUseCase } from "./create-catalog";
import { DuplicatedFieldError } from "./errors/duplicated-field-error";

let catalogsRepository: CatalogsRepository;
let createCatalogUseCase: CreateCatalogUseCase;

describe("Create Catalog Use Case", () => {
  beforeEach(() => {
    catalogsRepository = new InMemoryCatalogsRespository();
    createCatalogUseCase = new CreateCatalogUseCase(catalogsRepository);
  });

  it("should be able to create catalog", async () => {
    const { catalog } = await createCatalogUseCase.execute({
      name: "Catalogar",
      userId: "123456",
    });

    expect(catalog.id).toEqual(expect.any(String));
  });

  it("should not be able to create catalog with duplicated name for same user", async () => {
    await createCatalogUseCase.execute({
      name: "Catalogar",
      userId: "123456",
    });

    await expect(() =>
      createCatalogUseCase.execute({
        name: "Catalogar",
        userId: "123456",
      }),
    ).rejects.instanceOf(DuplicatedFieldError);
  });
});
