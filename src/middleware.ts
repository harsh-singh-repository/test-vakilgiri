import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { getSession } from 'next-auth/react';
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });
  // const session = await getSession();
  const url = request.nextUrl;
  console.log("My token", token);
  // console.log("My Sesssion",session)

  if (!token && url.pathname.startsWith("/dashboard")) {
    console.log("Unauthorized access to /dashboard, redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Authorized request or non-protected path");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
