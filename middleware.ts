import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

// Define role-based access permissions
const rolePermissions = {
  HSE_LEAD: ["/dashboard/hse-lead", "/permits", "/risk-assessments"],
  HSE_ENGINEER: ["/dashboard/hse-engineer", "/permits", "/risk-assessments"],
  HSE_OFFICER: ["/dashboard/hse-officer", "/permits", "/inspections"],
  HSE_MANAGER: ["/dashboard/hse-manager", "/permits", "/approvals"],
  HSE_CONSULTANT: ["/dashboard/hse-consultant", "/permits", "/compliance"],
  PERMIT_REQUESTER: ["/dashboard/requester", "/permits/request"],
  PERMIT_HOLDER: ["/dashboard/holder", "/permits/active"],
  PERMIT_APPROVER: ["/dashboard/approver", "/permits/pending"],
  PIC: ["/dashboard/pic", "/permits/location"],
  WORKER: ["/dashboard/worker"],
  COMPANY_ADMIN: ["/dashboard/admin", "/company", "/users"],
};

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  
  // Public paths that don't require authentication
  const publicPaths = ["/", "/auth/login", "/auth/register"];
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const role = token.role as keyof typeof rolePermissions;
  const allowedPaths = rolePermissions[role] || [];

  // Check if user has permission to access the path
  const isAllowed = allowedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. _next/static (static files)
     * 2. _next/image (image optimization files)
     * 3. favicon.ico (favicon file)
     * 4. public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}; 