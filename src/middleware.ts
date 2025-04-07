import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("AUTH_SECRET_KEY");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const url = request.nextUrl;

  if (!token && !url.pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (token) {
    try {
      const decoded = await jwtVerify(
        token.value.replace(/"/g, ""),
        SECRET_KEY
      );
      const { role, exp } = decoded.payload;
      const currentTime = Math.floor(Date.now() / 1000);

      if (exp && exp < currentTime) {
        return NextResponse.redirect(new URL("/login", url));
      }

      if (url.pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/", url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/chat", "/call", "/admin"],
};
