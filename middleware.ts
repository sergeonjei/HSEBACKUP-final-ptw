import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import type { NextRequest } from 'next/server'

// Define role-based access permissions
const rolePermissions = {
  ADMIN: ["/dashboard", "/permits", "/risk-assessments", "/company", "/users", "/settings", "/api"],
  HSE_LEAD: ["/dashboard", "/permits", "/risk-assessments", "/reports"],
  HSE_ENGINEER: ["/dashboard", "/permits", "/risk-assessments"],
  HSE_OFFICER: ["/dashboard", "/permits", "/inspections"],
  PERMIT_REQUESTER: ["/dashboard", "/permits/request", "/permits/view"],
  PERMIT_HOLDER: ["/dashboard", "/permits/active", "/permits/view"],
  PIC: ["/dashboard", "/permits", "/risk-assessments/review"],
  USER: ["/dashboard", "/profile"],
};

// Public paths that don't require authentication
const publicPaths = [
  "/", 
  "/auth/login", 
  "/auth/register",
  "/api/health",
  "/api/tasks/cron"
];

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export default async function middleware(req: NextRequestWithAuth) {
  // Allow public paths
  if (publicPaths.some(path => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + "/"))) {
    return NextResponse.next();
  }
  
  // Check if path is for static assets
  if (req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.startsWith('/images') ||
      req.nextUrl.pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = await getToken({ req });
  if (!token) {
    const url = new URL("/auth/login", req.url);
    url.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(url);
  }

  const role = token.role as keyof typeof rolePermissions;
  
  // Admin has access to everything
  if (role === "ADMIN") {
    return NextResponse.next();
  }
  
  const allowedPaths = rolePermissions[role] || [];

  // Check if user has permission to access the path
  const isAllowed = allowedPaths.some(path => 
    req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + "/")
  );

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Limit middleware only to these paths to avoid Node module issues on client
export const config = {
  matcher: [
    '/api/:path*',
    '/permits/:path*',
    '/dashboard/:path*',
  ],
}; 