import { redirect } from "next/navigation";
import { getSession } from "./get-session";
import { auth0 } from "@catalogar/shared/auth0";

export async function getAccessToken() {
  await getSession();

  try {
    const { token } = await auth0.getAccessToken();
    return token;
  } catch {
    redirect("/auth/logout");
  }
}
