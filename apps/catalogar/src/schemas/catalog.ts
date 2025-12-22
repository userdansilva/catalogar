import { z } from "zod";
import { validator } from "@/utils/validator";
import { Company } from "./company";
import { Theme } from "./theme";

export const Catalog = z.object({
  id: z.uuid({ version: "v4" }),
  name: z
    .string()
    .min(1, "Campo obrigatório")
    .max(35, "Máximo de 35 caracteres"),
  slug: z
    .string()
    .min(1, "Campo obrigatório")
    .max(30, "Máximo de 30 caracteres")
    .and(validator.slugValidator)
    .optional(),
  publishedAt: z.string().optional(),
  isPublished: z.boolean(),
  company: Company.optional(),
  theme: Theme.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createCatalogSchema = z.object({
  name: Catalog.shape.name,
});

export const updateCatalogSchema = z.object({
  name: Catalog.shape.name,
  isPublished: Catalog.shape.isPublished,
});

export const publishCatalogSchema = z.object({
  slug: Catalog.shape.slug.nonoptional(),
});
