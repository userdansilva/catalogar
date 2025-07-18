import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { routes } from "@/routes";

export async function getSession() {
  const session = await auth0.getSession();
  if (!session) redirect(routes.auth.sub.login.url);

  const { token } = await auth0.getAccessToken();

  return { Authorization: `Bearer ${token}` };
}
