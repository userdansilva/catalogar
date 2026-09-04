import type { SessionData } from "@auth0/nextjs-auth0/types";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

type Session = SessionData & {
  user: SessionData["user"] & {
    currentCatalogId: string;
    name: string;
    email: string;
  };
};

/**
 * Retorna sessão, caso não exista redireciona para login
 */
export async function getSession() {
  const session = await auth0.getSession();

  if (!session) redirect("/auth/login");

  if (!session.user) {
    throw new Error("[Internal Error]: User email are required");
  }

  if (!session.user.currentCatalogId) {
    throw new Error("[Internal Error]: User currentCatalogId are required");
  }

  if (!session.user.name) {
    throw new Error("[Internal Error]: User name are required");
  }

  if (!session.user.email) {
    throw new Error("[Internal Error]: User email are required");
  }

  return session as Session;
}
