import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

/**
 * Retorna sessão, caso não exista redireciona para login
 */
export async function getSession() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");

  return session;
}
