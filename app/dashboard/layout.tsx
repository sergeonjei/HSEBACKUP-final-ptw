import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";
import { Role } from "@prisma/client";

// Dynamically import client components with no SSR
const ClientSidebar = dynamic(
  () => import("@/components/dashboard/ClientSidebar"),
  { ssr: false }
);

const ClientHeader = dynamic(
  () => import("@/components/dashboard/ClientHeader"),
  { ssr: false }
);

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

  return (
    <div className="flex h-screen bg-gray-100">
      <ClientSidebar userRole={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientHeader user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 