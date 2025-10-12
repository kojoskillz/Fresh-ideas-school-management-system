import { NextResponse, type NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
  exp?: number;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;


  if (pathname.startsWith("/auth")) {
    const token = req.cookies.get("access_token")?.value;

    if (token) {
    
      const decoded = jwtDecode<DecodedToken>(token);
      const role = decoded.role;

      switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
          return redirectTo("/admin_section/dashboard", req);
        case "TEACHER":
          return redirectTo("/teacher_section/dashboard", req);
        case "STUDENT":
          return redirectTo("/student_section/dashboard", req);
        default:
          break;
      }
    }

    return NextResponse.next();
  }


  const token = req.cookies.get("access_token")?.value;
  if (!token) return redirectTo("/auth/login", req);

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const role = decoded.role;

    const routeRoles: Record<string, string[]> = {
      "/admin_section": ["ADMIN", "SUPER_ADMIN"],
      "/teacher_section": ["TEACHER"],
      "/student_section": ["STUDENT"],
    };

    for (const [path, roles] of Object.entries(routeRoles)) {
      if (pathname.startsWith(path) && !roles.includes(role || "")) {
        return redirectTo("/forbidden", req);
      }
    }

    return NextResponse.next();
  } catch (err) {
    return redirectTo("/auth/login", req);
  }
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
