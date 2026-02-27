import { TRPCError } from "@trpc/server";
import type { Category } from "generated/prisma/client";
import type { CatalogsRepository } from "@/repositories/catalogs-repository";
import type { CategoriesRepository } from "@/repositories/categories-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type GetCategoriesUseCaseRequest = {
  catalogId: string;
};

type GetCategoriesUseCaseResponse = {
  categories: Category[];
};

export class GetCategoriesUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private catalogsRepository: CatalogsRepository,
  ) {}

  async execute({
    catalogId,
  }: GetCategoriesUseCaseRequest): Promise<GetCategoriesUseCaseResponse> {
    const catalogExists = await this.catalogsRepository.existsById(catalogId);

    if (!catalogExists) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Catalog not found.",
      });
      // throw new ResourceNotFoundError("Catalog not found.");
    }

    const categories =
      await this.categoriesRepository.findAllByCatalogId(catalogId);

    return { categories };
  }
}
