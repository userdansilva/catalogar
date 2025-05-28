import { z } from "zod";
import { zfd } from "zod-form-data";

/**
 * Catalog
 */
export const catalogSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string().min(1, "Campo obrigatório"),
  isPublished: z.boolean(),
  redirectTo: z.string().optional(),
});

/**
 * Company
 */
export const companySchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
  mainSiteUrl: z.union([
    z.string()
      .url({ message: "Link inválido" })
      .startsWith("https://", { message: "O link precisa começar com: 'https://'. Ex.: https://catalogar.com.br/" }).optional(),
    z.literal(""),
  ]),
  phoneNumber: z.string().optional(),
  businessTypeDescription: z.string().optional(),
  redirectTo: z.string().optional(),
});

/**
 * Theme
 */
export const themeSchema = z.object({
  primaryColor: z.string().min(1, "Campo obrigatório"),
  secondaryColor: z.string().min(1, "Campo obrigatório"),
  logo: z.object({
    fileName: z.string(),
    originalFileName: z.string(),
    width: z.number().positive(),
    height: z.number().positive(),
    accessUrl: z.string(),
  }).optional(),
  redirectTo: z.string().optional(),
});

/**
 * Category
 */
export const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string().min(1, "Campo obrigatório"),
  textColor: z.string().min(1, "Campo obrigatório"),
  backgroundColor: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
  redirectTo: z.string().optional(),
});

export const categoryStatusToggleSchema = z.object({
  id: z.string().uuid(),
  redirectTo: z.string().optional(),
});

/**
 * Product
 */
export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
  redirectTo: z.string().optional(),
});

export const productStatusToggleSchema = z.object({
  id: z.string().uuid(),
  redirectTo: z.string().optional(),
});

/**
 * Catalog Item
 */
export const catalogItemSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Campo obrigatório"),
  caption: z.string().optional(),
  productId: z.string().min(1, "Campo obrigatório").uuid(),
  images: z.array(z.object({
    fileName: z.string(),
    position: z.number(),
    accessUrl: z.string(),
  })).min(1, "É necessário adicionar, no mínimo, uma imagem"),
  price: z.string().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  isDisabled: z.boolean(),
  redirectTo: z.string().optional(),
});

export const catalogItemStatusToggleSchema = z.object({
  id: z.string().uuid(),
  redirectTo: z.string().optional(),
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
  id: z.string().uuid(),
  redirectTo: z.string().optional(),
});
