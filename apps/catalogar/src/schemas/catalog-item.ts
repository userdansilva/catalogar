import { z } from "zod";
import { ProductType } from "./product-type";
import { Category } from "./category";
import { CatalogItemImage } from "./catalog-item-image";

export const CatalogItem = z.object({
  id: z.uuid({ version: "v4" }),
  title: z.string(),
  caption: z.string().optional(),
  price: z.string().optional(),
  reference: z.number(),
  productType: ProductType,
  categories: z.array(Category),
  images: z.array(CatalogItemImage),
  isDisabled: z.boolean(),
  disabledAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createCatalogItemSchema = z.object({
  title: CatalogItem.shape.title.min(1, "Campo obrigatório"),
  caption: CatalogItem.shape.caption,
  productTypeId: ProductType.shape.id.min(1, "Campo obrigatório"),
  images: z
    .array(
      z.object({
        fileName: CatalogItemImage.shape.fileName,
        url: CatalogItemImage.shape.url,
        sizeInBytes: CatalogItemImage.shape.sizeInBytes,
        width: CatalogItemImage.shape.width,
        height: CatalogItemImage.shape.height,
        altText: CatalogItemImage.shape.altText,
        position: CatalogItemImage.shape.position,
      }),
    )
    .min(1, "É necessário adicionar, no mínimo, uma imagem"),
  price: CatalogItem.shape.price,
  categoryIds: z.array(Category.shape.id).optional(),
  isDisabled: CatalogItem.shape.isDisabled,
});

export const updateCatalogItemSchema = z.object({
  id: CatalogItem.shape.id,
  title: CatalogItem.shape.title.min(1, "Campo obrigatório"),
  caption: CatalogItem.shape.caption,
  productTypeId: ProductType.shape.id.min(1, "Campo obrigatório"),
  images: z
    .array(
      z.object({
        fileName: CatalogItemImage.shape.fileName,
        url: CatalogItemImage.shape.url,
        sizeInBytes: CatalogItemImage.shape.sizeInBytes,
        width: CatalogItemImage.shape.width,
        height: CatalogItemImage.shape.height,
        altText: CatalogItemImage.shape.altText,
        position: CatalogItemImage.shape.position,
      }),
    )
    .min(1, "É necessário adicionar, no mínimo, uma imagem"),
  price: CatalogItem.shape.price,
  categoryIds: z.array(Category.shape.id).optional(),
  isDisabled: CatalogItem.shape.isDisabled,
});

export const catalogItemStatusToggleSchema = z.object({
  id: CatalogItem.shape.id,
});
