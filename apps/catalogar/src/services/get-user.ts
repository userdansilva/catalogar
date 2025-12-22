import z from "zod";
import { User } from "@/schemas/user";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const userSchema = z.object({
  id: User.shape.id,
  name: User.shape.name,
  email: User.shape.email,
  phoneNumber: User.shape.phoneNumber,
  catalogs: User.shape.catalogs,
  currentCatalog: User.shape.currentCatalog,
  createdAt: User.shape.createdAt,
  updatedAt: User.shape.updatedAt,
});

type UserType = z.infer<typeof userSchema>;

export async function getUser() {
  const headers = await getAuthHeaders();

  return await serverFetch<UserType>("/v1/users/me", {
    headers,
  });
}
