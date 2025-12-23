import { z } from "zod";
import { catalogItemImageSchema } from "./catalog-item-image";
import { categorySchema } from "./category";
import { productTypeSchema } from "./product-type";

export const catalogItemSchema = z.object({
  id: z.uuid({ version: "v4" }),
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

export const createCatalogItemSchema = z.object({
  title: catalogItemSchema.shape.title.min(1, "Campo obrigatório"),
  caption: catalogItemSchema.shape.caption,
  productTypeId: productTypeSchema.shape.id.min(1, "Campo obrigatório"),
  images: z
    .array(
      z.object({
        fileName: catalogItemImageSchema.shape.fileName,
        url: catalogItemImageSchema.shape.url,
        sizeInBytes: catalogItemImageSchema.shape.sizeInBytes,
        width: catalogItemImageSchema.shape.width,
        height: catalogItemImageSchema.shape.height,
        altText: catalogItemImageSchema.shape.altText,
        position: catalogItemImageSchema.shape.position,
      }),
    )
    .min(1, "É necessário adicionar, no mínimo, uma imagem"),
  price: catalogItemSchema.shape.price,
  categoryIds: z.array(categorySchema.shape.id),
  isDisabled: catalogItemSchema.shape.isDisabled,
});

export const updateCatalogItemSchema = z.object({
  id: catalogItemSchema.shape.id,
  title: catalogItemSchema.shape.title.min(1, "Campo obrigatório"),
  caption: catalogItemSchema.shape.caption,
  productTypeId: productTypeSchema.shape.id.min(1, "Campo obrigatório"),
  images: z
    .array(
      z.object({
        fileName: catalogItemImageSchema.shape.fileName,
        url: catalogItemImageSchema.shape.url,
        sizeInBytes: catalogItemImageSchema.shape.sizeInBytes,
        width: catalogItemImageSchema.shape.width,
        height: catalogItemImageSchema.shape.height,
        altText: catalogItemImageSchema.shape.altText,
        position: catalogItemImageSchema.shape.position,
      }),
    )
    .min(1, "É necessário adicionar, no mínimo, uma imagem"),
  price: catalogItemSchema.shape.price,
  categoryIds: z.array(categorySchema.shape.id).optional(),
  isDisabled: catalogItemSchema.shape.isDisabled,
});

export const catalogItemStatusToggleSchema = z.object({
  id: catalogItemSchema.shape.id,
});

export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type CreateCatalogItem = z.infer<typeof createCatalogItemSchema>;
export type UpdateCatalogItem = z.infer<typeof updateCatalogItemSchema>;
export type CatalogItemStatusToggle = z.infer<
  typeof catalogItemStatusToggleSchema
>;
