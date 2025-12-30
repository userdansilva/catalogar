import { z } from "zod";
import { catalogItemImageSchema } from "./catalog-item-image";
import { categorySchema } from "./category";
import { productTypeSchema } from "./product-type";

export const catalogItemSchema = z.object({
  id: z.uuidv4(),
  title: z.string(),
  caption: z.string().optional(),
  price: z.string().optional(),
  reference: z.number(),
  productType: productTypeSchema,
  categories: z.array(categorySchema),
  images: z.array(catalogItemImageSchema),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CatalogItem = z.infer<typeof catalogItemSchema>;

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
  price: z.string(),
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
});
