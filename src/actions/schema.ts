import { z } from "zod";
import { validator } from "./validator";

export const catalogSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string().min(1, "Campo obrigatório").and(validator.slugValidator),
  isPublished: z.boolean()
})