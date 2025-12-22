import { z } from "zod";

export const Company = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
  mainSiteUrl: z.union([
    z
      .url({ message: "Link inválido" })
      .startsWith("https://", {
        message:
          "O link precisa começar com: 'https://'. Ex.: https://catalogar.com.br/",
      })
      .optional(),
    z.literal(""),
  ]),
  phoneNumber: z.string().optional(),
  businessTypeDescription: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createCompanySchema = z.object({
  name: Company.shape.name,
  description: Company.shape.description,
  mainSiteUrl: Company.shape.mainSiteUrl,
  phoneNumber: Company.shape.phoneNumber,
  businessTypeDescription: Company.shape.businessTypeDescription,
});

export const updateCompanySchema = z.object({
  name: Company.shape.name,
  description: Company.shape.description,
  mainSiteUrl: Company.shape.mainSiteUrl,
  phoneNumber: Company.shape.phoneNumber,
  businessTypeDescription: Company.shape.businessTypeDescription,
});
