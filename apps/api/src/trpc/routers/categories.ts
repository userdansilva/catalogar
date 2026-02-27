import { TRPCError } from "@trpc/server";
import type { Category } from "generated/prisma/client";
import z from "zod";
import {
  createCategory,
  getCategoriesByCatalogId,
  getCategoryByNameAndCatalogId,
} from "@/queries/categories";
import { createTRPCRouter, protectedProcedure } from "../init";

const categoryDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type CategoryDto = z.infer<typeof categoryDtoSchema>;

const toCategoryDto = (category: Category): CategoryDto => ({
  id: category.id,
  name: category.name,
  createdAt: category.created_at,
  updatedAt: category.updated_at,
});

const createCategorySchema = z.object({
  name: z.string(),
});

export const categoriesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .output(z.array(categoryDtoSchema))
    .query(async ({ ctx }) => {
      const catalogId = ctx.catalog.id;

      const categories = await getCategoriesByCatalogId(catalogId);

      return categories.map(toCategoryDto);
    }),

  create: protectedProcedure
    .input(createCategorySchema)
    .output(categoryDtoSchema)
    .mutation(async ({ ctx, input }) => {
      const catalogId = ctx.catalog.id;

      const nameAlreadyExists = await getCategoryByNameAndCatalogId(
        input.name,
        catalogId,
      );

      if (nameAlreadyExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Categoria com nome: ${input.name} já existe nesse catálogo.`,
        });
      }

      const category = await createCategory(catalogId, {
        name: input.name,
      });

      return toCategoryDto(category);
    }),
});
