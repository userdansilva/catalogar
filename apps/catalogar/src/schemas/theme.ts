import { z } from "zod";

export const createThemeSchema = z.object({
  primaryColor: z.string().min(1, "Campo obrigatório"),
  secondaryColor: z.string().min(1, "Campo obrigatório"),
  logo: z
    .object({
      name: z.string(),
      url: z.string(),
      sizeInBytes: z.number(),
      width: z.number(),
      height: z.number(),
      altText: z.string(),
    })
    .nullish(),
});

export const updateThemeSchema = createThemeSchema;
