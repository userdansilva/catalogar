import { z } from "zod";
import { validator } from "@/utils/validator";
import { companySchema } from "./company";
import { themeSchema } from "./theme";

export const catalogSchema = z.object({
  id: z.uuid({ version: "v4" }),
  name: z
    .string()
    .min(1, "Campo obrigatório")
    .max(35, "Máximo de 35 caracteres"),
  slug: z
    .union([
      z.literal(""),
      z
        .string()
        .min(1, "Campo obrigatório")
        .max(30, "Máximo de 30 caracteres")
        .and(validator.slugValidator),
    ])
    .optional(),
  publishedAt: z.string().optional(),
  isPublished: z.boolean(),
  company: companySchema.optional(),
  theme: themeSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createCatalogSchema = z.object({
  name: catalogSchema.shape.name,
});

export const updateCatalogSchema = createCatalogSchema.extend({
  isPublished: catalogSchema.shape.isPublished.optional(),
  slug: catalogSchema.shape.slug,
});

export const publishCatalogSchema = z.object({
  slug: z
    .string()
    .min(1, "Campo obrigatório")
    .max(30, "Máximo de 30 caracteres")
    .and(validator.slugValidator),
});

export type Catalog = z.infer<typeof catalogSchema>;
export type CreateCatalog = z.infer<typeof createCatalogSchema>;
export type UpdateCatalog = z.infer<typeof updateCatalogSchema>;
export type PublishCatalog = z.infer<typeof publishCatalogSchema>;
