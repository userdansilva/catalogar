import { z } from "zod";

export const productTypeSchema = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string(),
  slug: z.string(),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createProductTypeSchema = z.object({
  name: productTypeSchema.shape.name.min(1, "Campo obrigatório"),
  slug: productTypeSchema.shape.slug.min(1, "Campo obrigatório"),
  isDisabled: productTypeSchema.shape.isDisabled,
});

export const updateProductTypeSchema = z.object({
  id: productTypeSchema.shape.id,
  name: productTypeSchema.shape.name.min(1, "Campo obrigatório"),
  slug: productTypeSchema.shape.slug.min(1, "Campo obrigatório"),
  isDisabled: productTypeSchema.shape.isDisabled,
});

export const productTypeStatusToggleSchema = z.object({
  id: productTypeSchema.shape.id,
});

export type ProductType = z.infer<typeof productTypeSchema>;
export type CreateProductType = z.infer<typeof createProductTypeSchema>;
export type UpdateProductType = z.infer<typeof updateProductTypeSchema>;
export type ProductTypeStatusToggle = z.infer<
  typeof productTypeStatusToggleSchema
>;
