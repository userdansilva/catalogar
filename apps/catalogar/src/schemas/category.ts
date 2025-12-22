import { z } from "zod";

export const Category = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string(),
  slug: z.string(),
  textColor: z.string(),
  backgroundColor: z.string(),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createCategorySchema = z.object({
  name: Category.shape.name.min(1, "Campo obrigatório"),
  textColor: Category.shape.textColor.min(1, "Campo obrigatório"),
  backgroundColor: Category.shape.backgroundColor.min(1, "Campo obrigatório"),
  isDisabled: Category.shape.isDisabled,
});

export const updateCategorySchema = z.object({
  id: Category.shape.id,
  name: Category.shape.name.min(1, "Campo obrigatório"),
  textColor: Category.shape.textColor.min(1, "Campo obrigatório"),
  backgroundColor: Category.shape.backgroundColor.min(1, "Campo obrigatório"),
  isDisabled: Category.shape.isDisabled,
});

export const categoryStatusToggleSchema = z.object({
  id: Category.shape.id,
});
