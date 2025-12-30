import z from "zod";
import { type Company, companySchema } from "@/schemas/company";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const bodySchema = z.object({
  name: companySchema.shape.name,
  description: companySchema.shape.description,
  mainSiteUrl: companySchema.shape.mainSiteUrl,
  phoneNumber: companySchema.shape.phoneNumber,
  businessTypeDescription: companySchema.shape.businessTypeDescription,
});

type Body = z.infer<typeof bodySchema>;

export async function postCompany(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<Company>("/v1/companies", {
    method: "POST",
    body,
    headers,
  });
}
