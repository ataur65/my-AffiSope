import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments the `Request` with the user's token.
  function middleware(req) {
    // Example: Only allow admins to access /dashboard/admin
    // if (
    //   req.nextUrl.pathname.startsWith("/dashboard/admin") &&
    //   req.nextauth.token?.role !== "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", req.url));
    // }

    // Redirect unauthenticated users from /dashboard to /login
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/:path*"], // Protect all /dashboard routes and NextAuth API routes
};