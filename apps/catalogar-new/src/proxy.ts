import { type NextRequest, NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

export async function proxy(request: NextRequest) {
  //
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
