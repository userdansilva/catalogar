import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type StorageSasToken = {
  fileName: string;
  uploadUrl: string;
  accessUrl: string;
};

export async function postStorageGenerateSasToken(body: {
  fileType: "PNG" | "JPG" | "SVG" | "WEBP";
}) {
  const headers = await getAuthHeaders();

  return await serverFetch<StorageSasToken>("/v1/storage/generate-sas-token", {
    method: "POST",
    body,
    headers,
  });
}
