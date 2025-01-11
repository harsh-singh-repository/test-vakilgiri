import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    // cookieName: "__Secure-next-auth.session-token",
  });

  const url = request.nextUrl;

  // Handle redirection to the original route

  if (token && url.pathname === "/") {
    // Check if a redirect path is provided via query parameter
    const redirectPath = url.searchParams.get("redirect");

    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // Default redirection if no redirect path is specified
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to home if not authenticated and trying to access "/dashboard/*"
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};

