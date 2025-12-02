import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function proxy(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    return authRes;
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  if (pathname.startsWith("/dashboard")) {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.redirect(
        new URL("/auth/login", request.nextUrl.origin),
      );
    }

    try {
      /**
       * A chamada do getAccessToken aqui é para garantir a atualização do token,
       * pois o getAccessToken não pode ser chamado em Server Components já que ele
       * não consegue atualizar o token lá.
       * 
       * https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#middleware-2
       */
      await auth0.getAccessToken(request, authRes);
    } catch (e) {
      console.error("Refresh Access Token Error", e);

      return NextResponse.redirect(
        new URL("/auth/login", request.nextUrl.origin),
      );
    }
  }

  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - entrar
     * - @
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|entrar|@|monitoring).*)",
  ],
};
