import { Company } from "./get-user";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PostCompanyError = DefaultApiError;
export type PostCompanyResponse = ApiResponse<Company>;
export type PostCompanyBody = {
  name: string;
  description?: string;
  mainSiteUrl?: string;
  phoneNumber?: string;
  businessTypeDescription?: string;
};

export async function postCompany(body: PostCompanyBody) {
  const headers = await getAuthHeaders();

  headers.append("Content-Type", "application/json");

  return await serverFetch<PostCompanyError, PostCompanyResponse>({
    url: "/v1/companies",
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
}
