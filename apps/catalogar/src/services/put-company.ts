import type z from "zod";
import type { Company, updateCompanySchema } from "@/schemas/company";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CompanyType = z.infer<typeof Company>;
type Body = z.infer<typeof updateCompanySchema>;

export async function putCompany(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CompanyType>("/v1/companies", {
    method: "PUT",
    body,
    headers,
  });
}
