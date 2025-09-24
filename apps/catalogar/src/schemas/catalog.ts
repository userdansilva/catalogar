import { z } from "zod";
import { validator } from "@/utils/validator";

const catalog = z.object({
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

export const createCatalogSchema = catalog.pick({
  name: true,
});

export const updateCatalogSchema = catalog.pick({
  name: true,
  isPublished: true,
});

export const publishCatalogSchema = catalog.pick({
  slug: true,
});
