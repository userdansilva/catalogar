import { z } from "zod";
import { validator } from "@/utils/validator";

export const createCatalogSchema = z.object({
  name: z
    .string()
    .min(1, "Campo obrigatório")
    .max(35, "Máximo de 35 caracteres"),
});

export const publishCatalogSchema = z.object({
  slug: z
    .string()
    .min(1, "Campo obrigatório")
    .max(30, "Máximo de 30 caracteres")
    .and(validator.slugValidator),
});

export const updateCatalogSchema = createCatalogSchema.extend({
  isPublished: z.boolean(),
  slug: z.union([z.literal(""), publishCatalogSchema.shape.slug]),
});
