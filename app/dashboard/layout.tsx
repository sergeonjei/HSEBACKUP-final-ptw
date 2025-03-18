import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Role } from "@prisma/client";
import DashboardClientLayout from "./client-layout";

// Define session user type
interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  // Type assertion to ensure session.user has the expected structure
  const user = session.user as SessionUser;

  return <DashboardClientLayout userRole={user.role} user={user}>{children}</DashboardClientLayout>;
} 