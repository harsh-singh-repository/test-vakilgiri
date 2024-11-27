import {  NextRequest,NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (!token && url.pathname.startsWith("/dashboard")) {
        console.log("Unauthorized access to /dashboard, redirecting to home");
        return NextResponse.redirect(new URL('/', request.url));
    }

    console.log("Authorized request or non-protected path");
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
