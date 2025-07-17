import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { User, UserWithCatalog } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

/**
 * @tag user
 */
export async function getUser<
  T extends User | UserWithCatalog = UserWithCatalog,
>() {
  const { Authorization } = await getSession();

  const res = await fetch(`${process.env.API_URL}/api/v1/users/me`, {
    headers: { Authorization },
    next: { tags: [tags.users.me] },
  });

  const data = await res.json();

  return data as ApiResponse<T>;
}
