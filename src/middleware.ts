import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("jwtToken");

  const token = jwtToken?.value as string;

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        { success: false, message: "not token provided, access denied" },
        { status: 401 }
      );
    }
  } else {
    if (
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register", "/admin"],
};
