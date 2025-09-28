import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify, decodeJwt } from "jose";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    "/admin_section",
    "/teacher_section",
    "/student_section",
  ];

  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) return redirectTo("/auth/login", req);
    const { role } = decodeJwt(token);
    console.log(role);
    try {
      if (
        pathname.startsWith("/admin_section") &&
        role !== "ADMIN" &&
        role !== "SUPER_ADMIN"
      ) {
        return redirectTo("/forbidden", req);
      }
      if (pathname.startsWith("/teacher_section") && role !== "TEACHER") {
        return redirectTo("/forbidden", req);
      }
      if (pathname.startsWith("/student_section") && role !== "STUDENT") {
        return redirectTo("/forbidden", req);
      }

      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      return redirectTo("/auth/login", req);
    }
  }

  if (pathname.startsWith("/auth/login") && token) {
    const { role } = decodeJwt(token);

    console.log(role);
    try {
      switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
          return redirectTo("/admin_section/dashboard", req);
        case "TEACHER":
          return redirectTo("/teacher_section/dashboard", req);
        case "STUDENT":
          return redirectTo("/student_section/dashboard", req);
        default:
          return redirectTo("/", req);
      }
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

function redirectTo(path: string, req: NextRequest) {
  const redirectUrl = new URL(path, req.url);
  redirectUrl.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/auth/login",
    "/admin_section/:path*",
    "/teacher_section/:path*",
    "/student_section/:path*",
  ],
};
