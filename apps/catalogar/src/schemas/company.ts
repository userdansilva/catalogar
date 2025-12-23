import { z } from "zod";

export const companySchema = z.object({
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
  name: companySchema.shape.name,
  description: companySchema.shape.description,
  mainSiteUrl: companySchema.shape.mainSiteUrl,
  phoneNumber: companySchema.shape.phoneNumber,
  businessTypeDescription: companySchema.shape.businessTypeDescription,
});

export const updateCompanySchema = z.object({
  name: companySchema.shape.name,
  description: companySchema.shape.description,
  mainSiteUrl: companySchema.shape.mainSiteUrl,
  phoneNumber: companySchema.shape.phoneNumber,
  businessTypeDescription: companySchema.shape.businessTypeDescription,
});

export type Company = z.infer<typeof companySchema>;
export type CreateCompany = z.infer<typeof createCompanySchema>;
export type UpdateCompany = z.infer<typeof updateCompanySchema>;
