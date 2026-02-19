import z from "zod";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const storageSasTokenSchema = z.object({
  fileName: z.string(),
  uploadUrl: z.url(),
  accessUrl: z.url(),
});

const bodySchema = z.object({
  fileType: z.enum(["PNG", "JPG", "SVG", "WEBP"]),
});

type StorageSasTokenType = z.infer<typeof storageSasTokenSchema>;
type Body = z.infer<typeof bodySchema>;

export async function postStorageGenerateSasToken(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<StorageSasTokenType>(
    "/v1/storage/generate-sas-token",
    {
      method: "POST",
      body,
      headers,
    },
  );
}
