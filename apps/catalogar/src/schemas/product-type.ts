import { z } from "zod";

const productType = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
});

export const createProductTypeSchema = productType.pick({
  name: true,
  isDisabled: true,
});

export const updateProductTypeSchema = productType.pick({
  id: true,
  name: true,
  isDisabled: true,
});

export const productTypeStatusToggleSchema = productType.pick({
  id: true,
});
