import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
import { ApiResponse, DefaultApiError } from "@/types/api-response";

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

export type GetCategoryError = DefaultApiError;
export type GetCategoryResponse = ApiResponse<Category>;

export async function getCategory(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCategoryError, GetCategoryResponse>(
    `/v1/categories/${id}`,
    {
      headers,
    },
  );
}
