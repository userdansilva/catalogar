import type z from "zod";
import type { User } from "@/schemas/user";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type UserType = z.infer<typeof User>;

export async function getUser() {
  const headers = await getAuthHeaders();

  return await serverFetch<UserType>("/v1/users/me", {
    headers,
  });
}
