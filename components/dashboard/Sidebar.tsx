'use client';

import { Role } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  userRole: Role;
}

const roleBasedNavigation = {
  HSE_LEAD: [
    { name: "Dashboard", href: "/dashboard/hse-lead", icon: ChartBarIcon },
    { name: "Permits", href: "/permits", icon: ClipboardDocumentListIcon },
    { name: "Risk Assessments", href: "/risk-assessments", icon: ShieldCheckIcon },
    { name: "Reports", href: "/reports", icon: DocumentCheckIcon },
  ],
  HSE_MANAGER: [
    { name: "Dashboard", href: "/dashboard/hse-manager", icon: ChartBarIcon },
    { name: "Approvals", href: "/approvals", icon: DocumentCheckIcon },
    { name: "Risk Reviews", href: "/risk-reviews", icon: ShieldCheckIcon },
  ],
  HSE_ENGINEER: [
    { name: "Dashboard", href: "/dashboard/hse-engineer", icon: ChartBarIcon },
    { name: "Risk Assessments", href: "/risk-assessments", icon: ShieldCheckIcon },
    { name: "Permits", href: "/permits", icon: ClipboardDocumentListIcon },
  ],
  HSE_OFFICER: [
    { name: "Dashboard", href: "/dashboard/hse-officer", icon: ChartBarIcon },
    { name: "Inspections", href: "/inspections", icon: ClipboardDocumentListIcon },
    { name: "Reports", href: "/reports", icon: DocumentCheckIcon },
  ],
  COMPANY_ADMIN: [
    { name: "Dashboard", href: "/dashboard/admin", icon: ChartBarIcon },
    { name: "Users", href: "/users", icon: UserGroupIcon },
    { name: "Company", href: "/company", icon: BuildingOfficeIcon },
  ],
  PERMIT_REQUESTER: [
    { name: "Dashboard", href: "/dashboard/requester", icon: ChartBarIcon },
    { name: "Request Permit", href: "/permits/request", icon: ClipboardDocumentListIcon },
    { name: "My Permits", href: "/permits/my", icon: DocumentCheckIcon },
  ],
  PERMIT_HOLDER: [
    { name: "Dashboard", href: "/dashboard/holder", icon: ChartBarIcon },
    { name: "Active Permits", href: "/permits/active", icon: ClipboardDocumentListIcon },
  ],
  PIC: [
    { name: "Dashboard", href: "/dashboard/pic", icon: ChartBarIcon },
    { name: "Location Permits", href: "/permits/location", icon: ClipboardDocumentListIcon },
  ],
};

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const navigation = roleBasedNavigation[userRole as keyof typeof roleBasedNavigation] || [];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">PTW System</h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                >
                  <Icon
                    className={`${
                      pathname === item.href
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    } mr-3 h-6 w-6 flex-shrink-0`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
} 