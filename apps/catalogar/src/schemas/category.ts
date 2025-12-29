import { z } from "zod";

export const categorySchema = z.object({
  id: z.uuidv4(),
  name: z.string(),
  slug: z.string(),
  textColor: z.string(),
  backgroundColor: z.string(),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

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
});
