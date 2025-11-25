import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type Logo = {
  id: string;
  fileName: string;
  url: string;
  sizeInBytes: number;
  width: number;
  height: number;
  altText?: string;
  createdAt: string;
  updatedAt: string;
};

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  logo?: Logo;
  createdAt: string;
  updatedAt: string;
};

export type PutThemeError = DefaultApiError;
export type PutThemeResponse = ApiResponse<Theme>;
export type PutThemeBody = {
  primaryColor: string;
  secondaryColor: string;
  logo?: {
    fileName: string;
    url: string;
    sizeInBytes: number;
    width: number;
    height: number;
    altText: string;
  };
};

export async function putTheme(body: PutThemeBody) {
  const headers = await getAuthHeaders();

  return await serverFetch<PutThemeError, PutThemeResponse>("/v1/themes", {
    method: "PUT",
    body,
    headers,
  });
}
