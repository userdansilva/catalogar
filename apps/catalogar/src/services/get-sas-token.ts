import { ApiResponse } from "@/types/api-response";
import { CatalogItemImage } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

export async function getSasToken(fileName: string) {
  const { Authorization } = await getSession();

  const res = await fetch(
    `${process.env.API_URL}/api/v1/images/generate-sas-token?fileName=${fileName}`,
    {
      headers: { Authorization },
    },
  );

  const data = await res.json();

  return data as ApiResponse<CatalogItemImage>;
}
