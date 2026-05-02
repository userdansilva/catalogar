import type { FastifyInstance } from "fastify";
import z from "zod";
import { toItemDto } from "@/mappers/items-mapper";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  getItemsByCategory,
  updateItem,
} from "@/queries/items";
import {
  createItemSchema,
  getItemSchema,
  getItemsSchema,
  updateItemSchema,
} from "@/schemas/items";
import { getAuthUser } from "../utils/get-auth-user";

export async function itemsRouter(app: FastifyInstance) {
  /**
   * Lista de itens do catálogo do usuário autenticado
   */
  app.get(
    "/items",
    {
      schema: {
        tags: ["items"],
        description:
          "Retrieve a list of items for the authenticated user's catalog",
        operationId: "getItems",
        response: {
          200: getItemsSchema,
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getAuthUser(request, reply);

      const items = await getItems({
        catalogId: user.catalog.id,
      });

      return reply.status(200).send({ items: items.map(toItemDto) });
    },
  );

  /**
   * Cria item no catálogo do usuário autenticado
   */
  app.post(
    "/items",
    {
      schema: {
        tags: ["items"],
        description: "Create a new item in the authenticated user's catalog",
        operationId: "createItem",
        body: createItemSchema,
        response: {
          201: getItemSchema,
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = await getAuthUser(request, reply);

      const { name, categoryId } = createItemSchema.parse(request.body);

      const newItem = await createItem({
        name,
        catalogId: user.catalog.id,
        categoryId,
      });

      return reply.status(201).send({ item: toItemDto(newItem) });
    },
  );

  /**
   * Obter detalhes de um item específico do catálogo do usuário autenticado
   */
  app.get(
    "/items/:id",
    {
      schema: {
        tags: ["items"],
        description:
          "Retrieve details of a specific item in the authenticated user's catalog",
        operationId: "getItem",
        response: {
          200: getItemSchema,
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

      const item = await getItem({
        id,
        catalogId: user.catalog.id,
      });

      if (!item) {
        return reply.status(404).send({
          message: "Item not found",
        });
      }

      return reply.status(200).send({ item: toItemDto(item) });
    },
  );

  /**
   * Atualizar item no catálogo do usuário autenticado
   */
  app.put(
    "/items/:id",
    {
      schema: {
        tags: ["items"],
        description:
          "Update an existing item in the authenticated user's catalog",
        operationId: "updateItem",
        body: updateItemSchema,
        response: {
          200: getItemSchema,
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
      const { name, categoryId } = updateItemSchema.parse(request.body);

      const item = await getItem({
        id,
        catalogId: user.catalog.id,
      });

      if (!item) {
        return reply.status(404).send({
          message: "Item not found",
        });
      }

      const updatedItem = await updateItem({
        id,
        catalogId: user.catalog.id,
        name,
        categoryId,
      });

      return reply.status(200).send({ item: toItemDto(updatedItem) });
    },
  );

  /**
   * Deletar item do catálogo do usuário autenticado
   */
  app.delete(
    "/items/:id",
    {
      schema: {
        tags: ["items"],
        description: "Delete an item from the authenticated user's catalog",
        operationId: "deleteItem",
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

      const item = await getItem({
        id,
        catalogId: user.catalog.id,
      });

      if (!item) {
        return reply.status(404).send({
          message: "Item not found",
        });
      }

      await deleteItem({
        id,
        catalogId: user.catalog.id,
      });

      return reply.status(204).send();
    },
  );

  /**
   * Listar itens por categoria
   */
  app.get(
    "/categories/:categoryId/items",
    {
      schema: {
        tags: ["items"],
        description:
          "Retrieve all items in a specific category for the authenticated user's catalog",
        operationId: "getItemsByCategory",
        response: {
          200: getItemsSchema,
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

      const { categoryId } = request.params as { categoryId: string };

      const items = await getItemsByCategory({
        catalogId: user.catalog.id,
        categoryId,
      });

      return reply.status(200).send({ items: items.map(toItemDto) });
    },
  );
}
