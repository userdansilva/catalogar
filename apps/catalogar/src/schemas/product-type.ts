import { z } from "zod";

export const productTypeSchema = z.object({
  id: z.uuidv4(),
  name: z.string(),
  slug: z.string(),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductType = z.infer<typeof productTypeSchema>;

export const createProductTypeSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
});

export const updateProductTypeSchema = createProductTypeSchema.extend({
  id: z.uuidv4({
    error: "Campo obrigatório",
  }),
  isDisabled: z.boolean(),
});

export const productTypeStatusToggleSchema = z.object({
  id: z.uuidv4({
    error: "Campo obrigatório",
  }),
});
