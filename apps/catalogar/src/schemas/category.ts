import { z } from "zod";

export const categorySchema = z.object({
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
  name: categorySchema.shape.name.min(1, "Campo obrigatório"),
  slug: categorySchema.shape.slug.min(1, "Campo obrigatório"),
  textColor: categorySchema.shape.textColor.min(1, "Campo obrigatório"),
  backgroundColor: categorySchema.shape.backgroundColor.min(
    1,
    "Campo obrigatório",
  ),
  isDisabled: categorySchema.shape.isDisabled,
});

export const updateCategorySchema = z.object({
  id: categorySchema.shape.id,
  name: categorySchema.shape.name.min(1, "Campo obrigatório"),
  slug: categorySchema.shape.slug.min(1, "Campo obrigatório"),
  textColor: categorySchema.shape.textColor.min(1, "Campo obrigatório"),
  backgroundColor: categorySchema.shape.backgroundColor.min(
    1,
    "Campo obrigatório",
  ),
  isDisabled: categorySchema.shape.isDisabled,
});

export const categoryStatusToggleSchema = z.object({
  id: categorySchema.shape.id,
});

export type Category = z.infer<typeof categorySchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type CategoryStatusToggle = z.infer<typeof categoryStatusToggleSchema>;
