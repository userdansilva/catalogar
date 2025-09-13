import { auth0 } from "@/lib/auth0";
import { getSession } from "@/utils/get-session";

export async function getAuthHeaders() {
  // it will redirect if no session found
  await getSession();

  const { token } = await auth0.getAccessToken();

  return {
    Authorization: `Bearer ${token}`,
  };
}
