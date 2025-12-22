import type z from "zod";
import type { Company, createCompanySchema } from "@/schemas/company";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CompanyType = z.infer<typeof Company>;
type Body = z.infer<typeof createCompanySchema>;

export async function postCompany(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CompanyType>("/v1/companies", {
    method: "POST",
    body,
    headers,
  });
}
