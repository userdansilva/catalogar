import type { FastifyInstance } from "fastify";
import z from "zod";
import { toCategoryDto } from "@/mappers/categories-mapper";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "@/queries/categories";
import {
  createCategorySchema,
  getCategoriesSchema,
  getCategorySchema,
  updateCategorySchema,
} from "@/schemas/categories";
import { getAuthUser } from "../utils/get-auth-user";

export async function categoriesRouter(app: FastifyInstance) {
  /**
   * Lista de categorias do catálogo do usuário autenticado
   */
  app.get(
    "/categories",
    {
      schema: {
        tags: ["categories"],
        description:
          "Retrieve a list of categories for the authenticated user's catalog",
        operationId: "getCategories",
        response: {
          200: getCategoriesSchema,
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getAuthUser(request, reply);

      const categories = await getCategories({
        catalogId: user.catalog.id,
      });

      return reply
        .status(200)
        .send({ categories: categories.map(toCategoryDto) });
    },
  );

  /**
   * Cria categoria no catálogo do usuário autenticado
   */
  app.post(
    "/categories",
    {
      schema: {
        tags: ["categories"],
        description:
          "Create a new category in the authenticated user's catalog",
        operationId: "createCategory",
        body: createCategorySchema,
        response: {
          201: getCategorySchema,
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getAuthUser(request, reply);

      const { name } = createCategorySchema.parse(request.body);

      const newCategory = await createCategory({
        name,
        catalogId: user.catalog.id,
      });

      return reply.status(201).send({ category: toCategoryDto(newCategory) });
    },
  );

  /**
   * Obter detalhes de uma categoria específica do catálogo do usuário autenticado
   */
  app.get(
    "/categories/:id",
    {
      schema: {
        tags: ["categories"],
        description:
          "Retrieve details of a specific category in the authenticated user's catalog",
        operationId: "getCategory",
        response: {
          200: getCategorySchema,
          401: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getAuthUser(request, reply);

      const { id } = request.params as { id: string };

      const category = await getCategory({
        id,
        catalogId: user.catalog.id,
      });

      if (!category) {
        return reply.status(404).send({
          message: "Category not found",
        });
      }

      return reply.status(200).send({ category: toCategoryDto(category) });
    },
  );

  /**
   * Atualizar categoria no catálogo do usuário autenticado
   */
  app.put(
    "/categories/:id",
    {
      schema: {
        tags: ["categories"],
        description:
          "Update an existing category in the authenticated user's catalog",
        operationId: "updateCategory",
        body: updateCategorySchema,
        response: {
          200: getCategorySchema,
          401: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getAuthUser(request, reply);

      const { id } = request.params as { id: string };
      const { name } = createCategorySchema.parse(request.body);

      const category = await getCategory({
        id,
        catalogId: user.catalog.id,
      });

      if (!category) {
        return reply.status(404).send({
          message: "Category not found",
        });
      }

      const updatedCategory = await updateCategory({
        id,
        name,
        catalogId: user.catalog.id,
      });

      return reply
        .status(200)
        .send({ category: toCategoryDto(updatedCategory) });
    },
  );

  /**
   * Deletar categoria do catálogo do usuário autenticado
   */
  app.delete(
    "/categories/:id",
    {
      schema: {
        tags: ["categories"],
        description: "Delete a category from the authenticated user's catalog",
        operationId: "deleteCategory",
        response: {
          204: z.null(),
          401: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getAuthUser(request, reply);

      const { id } = request.params as { id: string };

      const category = await getCategory({
        id,
        catalogId: user.catalog.id,
      });

      if (!category) {
        return reply.status(404).send({
          message: "Category not found",
        });
      }

      await deleteCategory({
        id,
        catalogId: user.catalog.id,
      });

      return reply.status(204).send();
    },
  );
}
