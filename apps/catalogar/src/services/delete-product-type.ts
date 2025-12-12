import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function deleteProductType(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<void>(`/v1/product-types/${id}`, {
    method: "DELETE",
    headers,
  });
}
