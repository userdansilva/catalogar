import { getAccessToken } from "./get-access-token";

export async function getAuthHeaders() {
  const accessToken = await getAccessToken();
  const headers = new Headers();

  headers.append("Authorization", `Bearer ${accessToken}`);

  return headers;
}
