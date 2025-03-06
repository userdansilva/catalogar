import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import AzureADB2C from "next-auth/providers/azure-ad-b2c"

export const config = {
  providers: [
    AzureADB2C({
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: "offline_access openid" } },
    })
  ],
  pages: {
    signIn: "/entrar"
  },
  callbacks: {
    async jwt({ account, token }) {
      if (account) {
        token.accessToken = account.id_token as string

        console.log("account", account)
        console.log("token", token)
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken

      return session
    }
  }
} satisfies NextAuthOptions

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}

export const signOutUrl = "https://catalogardev.b2clogin.com/catalogardev.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1_signup_signin&post_logout_redirect_uri=http://localhost:3000/saiu";
