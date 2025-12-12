import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function deleteCategory(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<void>(`/v1/categories/${id}`, {
    method: "DELETE",
    headers,
  });
}
