import { z } from "zod";

export const companySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  mainSiteUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
  businessTypeDescription: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Company = z.infer<typeof companySchema>;

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
  phoneNumber: z.string(),
  businessTypeDescription: z.string(),
});

export const updateCompanySchema = createCompanySchema;
