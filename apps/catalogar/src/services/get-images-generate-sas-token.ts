import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
import { ApiResponse, DefaultApiError } from "@/types/api-response";

export type CatalogItemImage = {
  id: string;
  fileName: string;
  url: string;
  sizeInBytes: number;
  width: number;
  height: number;
  altText?: string;
  position: number;
  createdAt: string;
};

export type GetImageGenerateSasTokenError = DefaultApiError;
export type GetImageGenerateSasTokenResponse = ApiResponse<CatalogItemImage>;

export async function getImageGenerateSasToken(fileName: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<
    GetImageGenerateSasTokenError,
    GetImageGenerateSasTokenResponse
  >({
    url: `/v1/images/generate-sas-token?fileName=${fileName}`,
    headers,
  });
}
