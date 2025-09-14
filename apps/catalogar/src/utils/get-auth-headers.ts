import { getAccessToken } from "./get-access-token";

export async function getAuthHeaders() {
  const accessToken = await getAccessToken();

  return { Authorization: `Bearer ${accessToken}` };
}
