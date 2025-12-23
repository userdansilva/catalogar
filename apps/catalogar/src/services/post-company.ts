import type { Company, CreateCompany } from "@/schemas/company";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function postCompany(body: CreateCompany) {
  const headers = await getAuthHeaders();

  return await serverFetch<Company>("/v1/companies", {
    method: "POST",
    body,
    headers,
  });
}
