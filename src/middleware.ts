import { NextRequest, NextResponse } from "next/server";

const REGULAR_PUBLIC_ROUTES = new Set(["/", "/auth", "/products"]);
const REGEX_PUBLIC_ROUTES = [/^\/products\/([^\/]+)\/?$/];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (REGULAR_PUBLIC_ROUTES.has(pathname) || REGEX_PUBLIC_ROUTES.some(regex => new RegExp(regex).test(pathname))) {
    return NextResponse.next();
  }

  const tokenCookie = request.cookies.get("accessToken");
  const token = tokenCookie?.value;

  if (!token) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}