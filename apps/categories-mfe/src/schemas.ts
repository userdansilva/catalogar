import { z } from "zod";

const category = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string().min(1, "Campo obrigatório"),
  textColor: z.string().min(1, "Campo obrigatório"),
  backgroundColor: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
});

export const createCategorySchema = category.pick({
  name: true,
  textColor: true,
  backgroundColor: true,
  isDisabled: true,
});

export const updateCategorySchema = category.pick({
  id: true,
  name: true,
  textColor: true,
  backgroundColor: true,
  isDisabled: true,
});

export const categoryStatusToggleSchema = category.pick({
  id: true,
});

export const deleteCategorySchema = category.pick({
  id: true,
});
