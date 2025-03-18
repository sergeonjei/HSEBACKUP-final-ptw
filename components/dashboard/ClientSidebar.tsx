'use client';

import Sidebar from './Sidebar';
import { Role } from "@prisma/client";

interface ClientSidebarProps {
  userRole: Role;
}

export default function ClientSidebar({ userRole }: ClientSidebarProps) {
  return <Sidebar userRole={userRole} />;
} 