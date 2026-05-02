import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres"),
});
