import { config } from "@/auth";
import NextAuth, { DefaultSession } from "next-auth";

const handler = NextAuth(config);

export { handler as GET, handler as POST };

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"]
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
  }
}
