import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authRes = await auth0.middleware(request);

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  if (pathname.startsWith("/auth")) {
    return authRes;
  }

  if (pathname.startsWith("/dashboard")) {
    const session = await auth0.getSession(request);

    if (!session) {
      return NextResponse.redirect(
        new URL("/auth/login", request.nextUrl.origin),
      );
    }

    try {
      await auth0.getAccessToken(request, authRes);
      return authRes;
    } catch {
      return NextResponse.redirect(
        new URL("/auth/login", request.nextUrl.origin),
      );
    }
  }

  return NextResponse.next();
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
