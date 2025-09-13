import { getAuthHeaders } from "./get-auth-headers";
import { serverFetch } from "./server-fetch";
import { tags } from "@/tags";
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

export type GetCategoryByIdError = DefaultApiError;
export type GetCategoryByIdResponse = ApiResponse<Category>;

export async function getCategoryById(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCategoryByIdError, GetCategoryByIdResponse>({
    baseUrl: process.env.API_URL as string,
    url: `/v1/categories/${id}`,
    headers,
    next: {
      tags: [tags.categories.getById(id)],
    },
  });
}
