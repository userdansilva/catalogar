import { z } from "zod";

const catalogItem = z.object({
  id: z.uuid({ version: "v4" }),
  title: z.string().min(1, "Campo obrigatório"),
  caption: z.string().optional(),
  productTypeId: z.string().min(1, "Campo obrigatório"),
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
  price: z.string().optional(),
  categoryIds: z.array(z.uuid({ version: "v4" })).optional(),
  isDisabled: z.boolean(),
});

export const createCatalogItemSchema = catalogItem.pick({
  title: true,
  caption: true,
  productTypeId: true,
  images: true,
  price: true,
  categoryIds: true,
  isDisabled: true,
});

export const updateCatalogItemSchema = catalogItem.pick({
  id: true,
  title: true,
  caption: true,
  productTypeId: true,
  images: true,
  price: true,
  categoryIds: true,
  isDisabled: true,
});

export const catalogItemStatusToggleSchema = catalogItem.pick({
  id: true,
});
