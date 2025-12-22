import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putUserCurrentCatalog(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<void>(`/v1/users/me/current-catalog/${id}`, {
    method: "PUT",
    headers,
  });
}
