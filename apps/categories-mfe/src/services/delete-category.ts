import { DefaultApiError } from "@catalogar/shared/types";
import { getAuthHeaders } from "@catalogar/shared/get-auth-headers";
import { serverFetch } from "@catalogar/shared/server-fetch";

export type DeleteCategoryError = DefaultApiError;

export async function deleteCategory(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<DeleteCategoryError, void>({
    url: `/v1/categories/${id}`,
    method: "DELETE",
    headers,
  });
}
