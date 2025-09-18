import { DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type DeleteCategoryError = DefaultApiError;

export async function deleteCategory(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<DeleteCategoryError, void>({
    url: `/v1/categories/${id}`,
    method: "DELETE",
    headers,
  });
}
