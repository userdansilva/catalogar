import { z } from "zod";

export const Company = z.object({
  name: z.string(),
  description: z.string().optional(),
  mainSiteUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
  businessTypeDescription: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// const company = z.object({
//   name: z.string().min(1, "Campo obrigatório"),
//   description: z.string().optional(),
//   mainSiteUrl: z.union([
//     z
//       .string()
//       .url({ message: "Link inválido" })
//       .startsWith("https://", {
//         message:
//           "O link precisa começar com: 'https://'. Ex.: https://catalogar.com.br/",
//       })
//       .optional(),
//     z.literal(""),
//   ]),
//   phoneNumber: z.string().optional(),
//   businessTypeDescription: z.string().optional(),
// });

// export const createCompanySchema = company.pick({
//   name: true,
//   description: true,
//   mainSiteUrl: true,
//   phoneNumber: true,
//   businessTypeDescription: true,
// });

// export const updateCompanySchema = company.pick({
//   name: true,
//   description: true,
//   mainSiteUrl: true,
//   phoneNumber: true,
//   businessTypeDescription: true,
// });
