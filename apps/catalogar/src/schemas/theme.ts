import { z } from "zod";
import { logoSchema } from "./logo";

export const themeSchema = z.object({
  primaryColor: z.string().min(1, "Campo obrigatório"),
  secondaryColor: z.string().min(1, "Campo obrigatório"),
  logo: logoSchema.optional(),
  createAt: z.string(),
  updatedAt: z.string(),
});

export const createThemeSchema = z.object({
  primaryColor: themeSchema.shape.primaryColor,
  secondaryColor: themeSchema.shape.secondaryColor,
  logo: z
    .object({
      fileName: logoSchema.shape.fileName,
      url: logoSchema.shape.url,
      sizeInBytes: logoSchema.shape.sizeInBytes,
      width: logoSchema.shape.width,
      height: logoSchema.shape.height,
      altText: logoSchema.shape.altText,
    })
    .optional(),
});

export const updateThemeSchema = createThemeSchema;

export type Theme = z.infer<typeof themeSchema>;
export type CreateTheme = z.infer<typeof createThemeSchema>;
export type UpdateTheme = z.infer<typeof updateThemeSchema>;
