import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type StorageSasToken = {
  fileName: string;
  uploadUrl: string;
  accessUrl: string;
};

export type PostStorageGenerateSasTokenError = DefaultApiError;
export type PostStorageGenerateSasTokenResponse = ApiResponse<StorageSasToken>;
export type PostStorageGenerateSasTokenBody = {
  fileType: "PNG" | "JPG" | "SVG" | "WEBP";
};

export async function postStorageGenerateSasToken(
  body: PostStorageGenerateSasTokenBody,
) {
  const headers = await getAuthHeaders();

  return await serverFetch<
    PostStorageGenerateSasTokenError,
    PostStorageGenerateSasTokenResponse
  >({
    url: "/v1/storage/generate-sas-token",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
