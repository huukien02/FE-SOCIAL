import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import Cookies from "js-cookie";

const SECRET_KEY = new TextEncoder().encode("AUTH_SECCET_KEY");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const url = request.url;

  if (!token && !url.includes("/login")) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (token) {
    try {
      const decoded = await jwtVerify(
        token.value.replace(/"/g, ""),
        SECRET_KEY
      );
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.payload.exp && decoded.payload.exp < currentTime) {
        Cookies.remove("accessToken");
        return NextResponse.redirect(new URL("/login", url));
      }
    } catch (error) {
      console.error("Lỗi xác thực token:", error);
      return NextResponse.redirect(new URL("/login", url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/chat"],
};
