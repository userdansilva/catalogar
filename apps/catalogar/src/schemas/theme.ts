import { z } from "zod";

export const Theme = z.object({
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
    .optional(),
  createAt: z.string(),
  updatedAt: z.string(),
});

export const createThemeSchema = z.object({
  primaryColor: Theme.shape.primaryColor,
  secondaryColor: Theme.shape.secondaryColor,
  logo: Theme.shape.logo,
});

export const updateThemeSchema = z.object({
  primaryColor: Theme.shape.primaryColor,
  secondaryColor: Theme.shape.secondaryColor,
  logo: Theme.shape.logo,
});
