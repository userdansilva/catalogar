import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type Company = {
  name: string;
  description: string;
  mainSiteUrl: string;
  phoneNumber: string;
  businessTypeDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type Logo = {
  id: string;
  fileName: string;
  url: string;
  sizeInBytes: number;
  width: number;
  height: number;
  altText?: string;
  createdAt: string;
  updatedAt: string;
};

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  logo?: Logo;
  createdAt: string;
  updatedAt: string;
};

export type Catalog = {
  id: string;
  name: string;
  slug?: string;
  publishedAt?: string;
  isPublished: boolean;
  company?: Company;
  theme?: Theme;
  createdAt: string;
  updatedAt: string;
};

export type PostCatalogError = DefaultApiError;
export type PostCatalogResponse = ApiResponse<Catalog>;
export type PostCatalogBody = {
  name: string;
};

export async function postCatalog(body: PostCatalogBody) {
  const headers = await getAuthHeaders();

  return await serverFetch<PostCatalogError, PostCatalogResponse>(
    "/v1/catalogs",
    {
      method: "POST",
      body,
      headers,
    },
  );
}
