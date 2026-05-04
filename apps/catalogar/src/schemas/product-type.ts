import { z } from "zod";

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
