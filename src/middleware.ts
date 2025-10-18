import { NextResponse, type NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  if (pathname.startsWith("/auth")) {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      const role = decoded.role;

      if (role === "SUPER_ADMIN") {
        return redirectTo(`/admin/dashboard`, req);
      }

      return redirectTo(`/${role?.toLowerCase()}/dashboard`, req);
    }
    return NextResponse.next();
  }

  if (!token) return redirectTo("/auth/login", req);

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const role = decoded.role;

    const routeRoles: Record<string, string[]> = {
      "/admin": ["ADMIN", "SUPER_ADMIN"],
      "/teacher": ["TEACHER"],
      "/student": ["STUDENT"],
    };

    for (const [path, roles] of Object.entries(routeRoles)) {
      if (pathname.startsWith(path) && !roles.includes(role || "")) {
        return redirectTo("/forbidden", req);
      }
    }

    return NextResponse.next();
  } catch {
    return redirectTo("/auth/login", req);
  }
}

function redirectTo(path: string, req: NextRequest) {
  const redirectUrl = new URL(path, req.url);

  if (path.startsWith("/auth/login")) {
    redirectUrl.searchParams.set("from", req.nextUrl.pathname);
  }
  
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/auth/login",
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
  ],
};
