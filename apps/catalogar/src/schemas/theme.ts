import { z } from "zod";

export const themeSchema = z.object({
  primaryColor: z.string().min(1, "Campo obrigatório"),
  secondaryColor: z.string().min(1, "Campo obrigatório"),
  logo: z
    .object({
      // id: z.uuid({ version: "v4" }),
      fileName: z.string(),
      url: z.string(),
      sizeInBytes: z.number(),
      width: z.number(),
      height: z.number(),
      altText: z.string(),
      // createdAt: z.string(),
      // updatedAt: z.string(),
    })
    .optional(),
  createAt: z.string(),
  updatedAt: z.string(),
});

export const createThemeSchema = z.object({
  primaryColor: themeSchema.shape.primaryColor,
  secondaryColor: themeSchema.shape.secondaryColor,
  logo: themeSchema.shape.logo,
});

export const updateThemeSchema = z.object({
  primaryColor: themeSchema.shape.primaryColor,
  secondaryColor: themeSchema.shape.secondaryColor,
  logo: themeSchema.shape.logo,
});

export type Theme = z.infer<typeof themeSchema>;
export type CreateTheme = z.infer<typeof createThemeSchema>;
export type UpdateTheme = z.infer<typeof updateThemeSchema>;
