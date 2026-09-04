import type { SessionData } from "@auth0/nextjs-auth0";

declare module "@auth0/nextjs-auth0" {
  interface Session {
    user: SessionData["user"] & {
      currentCatalogId?: string;
    };
  }
}
