import { getSession } from "./get-session";

export async function getAuthHeaders() {
  const session = await getSession();

  const headers = new Headers({
    Authorization: `Bearer ${session.tokenSet.accessToken}`,
  });

  return headers;
}
