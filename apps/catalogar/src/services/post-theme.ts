import { Theme } from "./get-user";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PostThemeError = DefaultApiError;
export type PostThemeResponse = ApiResponse<Theme>;
export type PostThemeBody = {
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

export async function postTheme(body: PostThemeBody) {
  const headers = await getAuthHeaders();

  return await serverFetch<PostThemeError, PostThemeResponse>({
    url: "/v1/themes",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
