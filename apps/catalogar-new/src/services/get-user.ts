import type { User } from "@/schemas/user";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function getUser() {
  const headers = await getAuthHeaders();

  return await serverFetch<User>("/v1/users/me", {
    headers,
  });
}
