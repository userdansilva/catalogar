import type { Category, UpdateCategory } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putCategory({ id, ...body }: UpdateCategory) {
  const headers = await getAuthHeaders();

  return await serverFetch<Category>(`/v1/categories/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
