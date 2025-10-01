import { ApiResponse, DefaultApiError } from "@catalogar/shared/types";
import { getAuthHeaders } from "@catalogar/shared/utils/get-auth-headers";
import { serverFetch } from "@catalogar/shared/utils/server-fetch";
import { Category } from "./get-category";

export type PostCategoryError = DefaultApiError;
export type PostCategoryResponse = ApiResponse<Category>;
export type PostCategoryBody = {
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
};

export async function postCategory(body: PostCategoryBody) {
  const headers = await getAuthHeaders();

  headers.append("Content-Type", "application/json");

  return await serverFetch<PostCategoryError, PostCategoryResponse>({
    url: "/v1/categories",
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
}
