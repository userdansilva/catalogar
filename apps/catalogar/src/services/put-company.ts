import type { Company, UpdateCompany } from "@/schemas/company";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putCompany(body: UpdateCompany) {
  const headers = await getAuthHeaders();

  return await serverFetch<Company>("/v1/companies", {
    method: "PUT",
    body,
    headers,
  });
}
