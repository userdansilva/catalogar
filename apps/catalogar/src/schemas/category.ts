import { z } from "zod";

export const categorySchema = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string(),
  textColor: z.string().min(1, "Campo obrigatório"),
  backgroundColor: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createCategorySchema = z.object({
  name: categorySchema.shape.name,
  textColor: categorySchema.shape.textColor,
  backgroundColor: categorySchema.shape.backgroundColor,
});

export const updateCategorySchema = createCategorySchema.extend({
  id: categorySchema.shape.id,
  isDisabled: categorySchema.shape.isDisabled,
});

export const categoryStatusToggleSchema = z.object({
  id: categorySchema.shape.id,
});

export type Category = z.infer<typeof categorySchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type CategoryStatusToggle = z.infer<typeof categoryStatusToggleSchema>;
