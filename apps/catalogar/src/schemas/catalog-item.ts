import { z } from "zod";

export const createCatalogItemSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  caption: z.string(),
  productTypeId: z.uuidv4({
    error: "Campo obrigatório",
  }),
  images: z
    .array(
      z.object({
        fileName: z.string(),
        url: z.string(),
        sizeInBytes: z.number(),
        width: z.number(),
        height: z.number(),
        altText: z.string(),
        position: z.number(),
      }),
    )
    .min(1, "É necessário adicionar, no mínimo, uma imagem"),
  price: z
    .string()
    .refine((val) => val === "" || /^\d+([.,]\d{1,2})?$/.test(val), {
      message: "Preço inválido",
    }),
  categoryIds: z.array(z.uuidv4()),
});

export const updateCatalogItemSchema = createCatalogItemSchema.extend({
  id: z.uuidv4({
    error: "Campo obrigatório",
  }),
  isDisabled: z.boolean(),
});

export const catalogItemStatusToggleSchema = z.object({
  id: z.uuidv4({
    error: "Campo obrigatório",
  }),
  isDisabled: z.boolean(),
});
