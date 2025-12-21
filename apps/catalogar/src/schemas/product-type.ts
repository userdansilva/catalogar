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

// const productType = z.object({
//   id: z.uuid({ version: "v4" }),
//   name: z.string().min(1, "Campo obrigatório"),
//   isDisabled: z.boolean(),
// });

// export const createProductTypeSchema = productType.pick({
//   name: true,
//   isDisabled: true,
// });

// export const updateProductTypeSchema = productType.pick({
//   id: true,
//   name: true,
//   isDisabled: true,
// });

// export const productTypeStatusToggleSchema = productType.pick({
//   id: true,
// });
