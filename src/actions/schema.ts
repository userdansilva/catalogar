import { z } from "zod";

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
 * Category
 */
export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string().min(1, "Campo obrigatório"),
  textColor: z.string().min(1, "Campo obrigatório"),
  backgroundColor: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
  redirectTo: z.string().optional(),
});

export const categoryStatusToggleSchema = z.object({
  id: z.string(),
  redirectTo: z.string().optional(),
});

/**
 * Product
 */
export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string().min(1, "Campo obrigatório"),
  isDisabled: z.boolean(),
  redirectTo: z.string().optional(),
});

export const productStatusToggleSchema = z.object({
  id: z.string(),
  redirectTo: z.string().optional(),
});
