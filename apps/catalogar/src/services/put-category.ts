import { Category } from "./get-category-by-id";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

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

  return await serverFetch<PutCategoryError, PutCategoryResponse>({
    url: `/v1/categories/${id}`,
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
