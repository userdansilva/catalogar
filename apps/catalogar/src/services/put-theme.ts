import { Theme } from "./get-user";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

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

  return await serverFetch<PutThemeError, PutThemeResponse>({
    url: "/v1/themes",
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
