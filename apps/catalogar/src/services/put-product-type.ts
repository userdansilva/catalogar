import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export async function putProductType(
  id: string,
  body: {
    name: string;
    slug: string;
    isDisabled: boolean;
  },
) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductType>(`/v1/product-types/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
