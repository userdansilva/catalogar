import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

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

export async function putTheme(body: {
  primaryColor: string;
  secondaryColor: string;
  logo?: {
    fileName: string;
    url: string;
    sizeInBytes: number;
    width: number;
    height: number;
    altText: string;
  };
}) {
  const headers = await getAuthHeaders();

  return await serverFetch<Theme>("/v1/themes", {
    method: "PUT",
    body,
    headers,
  });
}
