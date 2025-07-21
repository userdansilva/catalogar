import { z } from "zod";
import { zfd } from "zod-form-data";
import { validator } from "./validator";

/**
 * Catalog
 */
const catalogSchema = z.object({
  name: z
    .string()
    .min(1, "Campo obrigatório")
    .max(35, "Máximo de 35 caracteres"),
  slug: z
    .string()
    .min(1, "Campo obrigatório")
    .max(30, "Máximo de 30 caracteres")
    .and(validator.slugValidator),
  isPublished: z.boolean(),
});

export const createCatalogSchema = z.object({
  name: catalogSchema.shape.name,
});

export const updateCatalogSchema = z.object({
  name: catalogSchema.shape.name,
  isPublished: z.boolean(),
});

export const publishCatalogSchema = z.object({
  slug: catalogSchema.shape.slug,
});

/**
 * Company
 */
export const companySchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
  mainSiteUrl: z.union([
    z
      .string()
      .url({ message: "Link inválido" })
      .startsWith("https://", {
        message:
          "O link precisa começar com: 'https://'. Ex.: https://catalogar.com.br/",
      })
      .optional(),
    z.literal(""),
  ]),
  phoneNumber: z.string().optional(),
  businessTypeDescription: z.string().optional(),
});

/**
 * Theme
 */
export const themeSchema = z.object({
  primaryColor: z.string().min(1, "Campo obrigatório"),
  secondaryColor: z.string().min(1, "Campo obrigatório"),
  logo: z.union([
    z.object({
      fileName: z.string(),
      originalFileName: z.string(),
      width: z.number().positive(),
      height: z.number().positive(),
      accessUrl: z.string(),
    }),
    z.null(),
  ]),
});

/**
 * Category
 */
export const categorySchema = z.object({
  id: z.uuid({ version: "v4" }).optional(),
  name: z.string().min(1, "Campo obrigatório"),
  textColor: z.string().min(1, "Campo obrigatório"),
  backgroundColor: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
});

export const categoryStatusToggleSchema = z.object({
  id: z.uuid({ version: "v4" }),
});

/**
 * Product Type
 */
export const productTypeSchema = z.object({
  id: z.uuid({ version: "v4" }).optional(),
  name: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
});

export const productTypeStatusToggleSchema = z.object({
  id: z.uuid({ version: "v4" }),
});

/**
 * Catalog Item
 */
export const catalogItemSchema = z.object({
  id: z.uuid({ version: "v4" }).optional(),
  title: z.string().min(1, "Campo obrigatório"),
  caption: z.string().optional(),
  productTypeId: z.string().min(1, "Campo obrigatório").uuid(),
  images: z
    .array(
      z.object({
        fileName: z.string(),
        position: z.number(),
        accessUrl: z.string(),
      }),
    )
    .min(1, "É necessário adicionar, no mínimo, uma imagem"),
  price: z.string().optional(),
  categoryIds: z.array(z.uuid({ version: "v4" })).optional(),
  isDisabled: z.boolean(),
});

export const catalogItemStatusToggleSchema = z.object({
  id: z.uuid({ version: "v4" }),
});

/**
 * Images
 */
export const imageSchema = zfd.formData({
  image: zfd.file(),
});

/**
 * Catalog Filters
 */
export const queryFilterSchema = z.object({
  query: z.string(),
});

/**
 * Common
 */
export const deleteSchema = z.object({
  id: z.uuid({ version: "v4" }),
});
