import { z } from "zod";

export const catalogSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  slug: z.string().min(1, "Campo obrigatório"),
  isPublished: z.boolean()
})
