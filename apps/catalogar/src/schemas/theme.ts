import { z } from "zod";
import { logoSchema } from "./logo";

export const themeSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  logo: logoSchema.optional(),
  createAt: z.string(),
  updatedAt: z.string(),
});

export type Theme = z.infer<typeof themeSchema>;

export const createThemeSchema = z.object({
  primaryColor: z.string().min(1, "Campo obrigatório"),
  secondaryColor: z.string().min(1, "Campo obrigatório"),
  logo: z
    .object({
      fileName: z.string(),
      url: z.string(),
      sizeInBytes: z.number(),
      width: z.number(),
      height: z.number(),
      altText: z.string(),
    })
    .nullish(),
});

export const updateThemeSchema = createThemeSchema;
