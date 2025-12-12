import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type Company = {
  name: string;
  description: string;
  mainSiteUrl: string;
  phoneNumber: string;
  businessTypeDescription: string;
  createdAt: string;
  updatedAt: string;
};

export async function putCompany(body: {
  name: string;
  description?: string;
  mainSiteUrl?: string;
  phoneNumber?: string;
  businessTypeDescription?: string;
}) {
  const headers = await getAuthHeaders();

  return await serverFetch<Company>("/v1/companies", {
    method: "PUT",
    body,
    headers,
  });
}
