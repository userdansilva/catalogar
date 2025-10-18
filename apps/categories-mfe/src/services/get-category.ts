import { ApiResponse, DefaultApiError } from "@catalogar/shared/types";
import { getAuthHeaders } from "@catalogar/shared/get-auth-headers";
import { serverFetch } from "@catalogar/shared/server-fetch";
import { tag } from "@/tag";

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

  return await serverFetch<GetCategoryError, GetCategoryResponse>({
    url: `/v1/categories/${id}`,
    headers,
    next: {
      tags: [tag.category(id)],
    },
  });
}
