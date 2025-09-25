import { z } from "zod";

const theme = z.object({
  primaryColor: z.string().min(1, "Campo obrigatório"),
  secondaryColor: z.string().min(1, "Campo obrigatório"),
  logo: z.union([
    z.object({
      fileName: z.string(),
      url: z.string(),
      sizeInBytes: z.number(),
      width: z.number(),
      height: z.number(),
      altText: z.string(),
    }),
    z.null(),
  ]),
});

export const createThemeSchema = theme.pick({
  primaryColor: true,
  secondaryColor: true,
  logo: true,
});

export const updateThemeSchema = theme.pick({
  primaryColor: true,
  secondaryColor: true,
  logo: true,
});
