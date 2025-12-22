import { z } from "zod";

export const ProductType = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string(),
  slug: z.string(),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createProductTypeSchema = z.object({
  name: ProductType.shape.name.min(1, "Campo obrigatório"),
  isDisabled: ProductType.shape.isDisabled,
});

export const updateProductTypeSchema = z.object({
  id: ProductType.shape.id,
  name: ProductType.shape.name.min(1, "Campo obrigatório"),
  isDisabled: ProductType.shape.isDisabled,
});

export const productTypeStatusToggleSchema = z.object({
  id: ProductType.shape.id,
});
