import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  textColor: z.string().min(1, "Campo obrigatório"),
  backgroundColor: z.string().min(1, "Campo obrigatório"),
});

export const updateCategorySchema = createCategorySchema.extend({
  id: z.uuidv4({
    error: "Campo obrigatório",
  }),
  isDisabled: z.boolean(),
});

export const categoryStatusToggleSchema = z.object({
  id: z.uuidv4({
    error: "Campo obrigatório",
  }),
  isDisabled: z.boolean(),
});
