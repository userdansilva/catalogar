import { Company } from "./get-user";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PutCompanyError = DefaultApiError;
export type PutCompanyResponse = ApiResponse<Company>;
export type PutCompanyBody = {
  name: string;
  description?: string;
  mainSiteUrl?: string;
  phoneNumber?: string;
  businessTypeDescription?: string;
};

export async function putCompany(body: PutCompanyBody) {
  const headers = await getAuthHeaders();

  headers.append("Content-Type", "application/json");

  return await serverFetch<PutCompanyError, PutCompanyResponse>({
    url: "/v1/companies",
    method: "PUT",
    body: JSON.stringify(body),
    headers,
  });
}
