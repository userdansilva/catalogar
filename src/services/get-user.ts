import { auth } from "@/auth";
import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { User, UserWithCatalog } from "@/types/api-types";
import { redirect } from "next/navigation";

/**
 * @tag user
 */
export async function getUser<
  T extends User | UserWithCatalog = UserWithCatalog,
>() {
  const session = await auth();
  if (!session) redirect("/entrar");

  const res = await fetch(`${process.env.API_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: { tags: [tags.users.me] },
  });

  const data = await res.json();

  return data as ApiResponse<T>;
}
