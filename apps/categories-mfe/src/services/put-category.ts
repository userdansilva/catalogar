import { ApiResponse, DefaultApiError } from "@catalogar/shared/types";
import { getAuthHeaders } from "@catalogar/shared/utils/get-auth-headers";
import { serverFetch } from "@catalogar/shared/utils/server-fetch";
import { Category } from "./get-category";

export type PutCategoryError = DefaultApiError;
export type PutCategoryResponse = ApiResponse<Category>;
export type PutCategoryBody = {
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
};

export async function putCategory(id: string, body: PutCategoryBody) {
  const headers = await getAuthHeaders();

  headers.append("Content-Type", "application/json");

  return await serverFetch<PutCategoryError, PutCategoryResponse>({
    url: `/v1/categories/${id}`,
    method: "PUT",
    body: JSON.stringify(body),
    headers,
  });
}
