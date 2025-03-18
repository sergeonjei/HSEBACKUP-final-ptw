'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Role } from "@prisma/client";

// Dynamically import client components
const ClientSidebar = dynamic(
  () => import("@/components/dashboard/ClientSidebar"),
  { ssr: false }
);

const ClientHeader = dynamic(
  () => import("@/components/dashboard/ClientHeader"),
  { ssr: false }
);

interface DashboardClientLayoutProps {
  userRole: Role;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: Role;
  };
  children: React.ReactNode;
}

export default function DashboardClientLayout({ userRole, user, children }: DashboardClientLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <ClientSidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientHeader user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 