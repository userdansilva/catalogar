import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string(),
  mainSiteUrl: z.union([
    z.url({ message: "Link inválido" }).startsWith("https://", {
      message:
        "O link precisa começar com: 'https://'. Ex.: https://catalogar.com.br/",
    }),
    z.literal(""),
  ]),
  phoneNumber: z.union([
    z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Número inválido"),
    z.literal(""),
  ]),
  businessTypeDescription: z.string(),
});

export const updateCompanySchema = createCompanySchema;
