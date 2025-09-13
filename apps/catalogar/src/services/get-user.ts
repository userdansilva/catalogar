import { getAuthHeaders } from "./get-auth-headers";
import { serverFetch } from "./server-fetch";
import { tags } from "@/tags";
import { ApiResponse, DefaultApiError } from "@/types/api-response";

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

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  catalogs: Array<Catalog>;
  currentCatalog?: Catalog;
  createdAt: string;
  updatedAt: string;
};

export type GetUserError = DefaultApiError;
export type GetUserResponse = ApiResponse<User>;

export async function getUser() {
  const headers = await getAuthHeaders();

  return await serverFetch<GetUserError, GetUserResponse>({
    baseUrl: process.env.API_URL as string,
    url: "/v1/users/me",
    headers,
    next: {
      tags: [tags.users.me],
    },
  });
}
