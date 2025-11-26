import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type Category = {
  id: string;
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};

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

  return await serverFetch<PostCategoryError, PostCategoryResponse>(
    "/v1/categories",
    {
      method: "POST",
      body,
      headers,
    },
  );
}
