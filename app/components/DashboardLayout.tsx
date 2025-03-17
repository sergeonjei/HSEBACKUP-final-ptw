import React, { ReactNode } from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon, 
  ShieldExclamationIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: UserRole;
  userName?: string;
}

export default function DashboardLayout({ 
  children, 
  userRole = 'PERMIT_REQUESTER',
  userName = 'User'
}: DashboardLayoutProps) {
  
  // Define navigation items based on user role
  const getNavItems = (role: string) => {
    const commonItems = [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'My Permits', href: '/dashboard/permits', icon: DocumentTextIcon },
    ];
    
    switch(role) {
      case 'ADMIN':
        return [
          ...commonItems,
          { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },
          { name: 'All Permits', href: '/dashboard/all-permits', icon: ClipboardDocumentCheckIcon },
          { name: 'Risk Assessments', href: '/dashboard/risk-assessments', icon: ShieldExclamationIcon },
          { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
        ];
      case 'HSE_LEAD':
      case 'HSE_ENGINEER':
        return [
          ...commonItems,
          { name: 'Risk Assessments', href: '/dashboard/risk-assessments', icon: ShieldExclamationIcon },
          { name: 'All Permits', href: '/dashboard/all-permits', icon: ClipboardDocumentCheckIcon },
          { name: 'Reports', href: '/dashboard/reports', icon: DocumentTextIcon },
        ];
      case 'HSE_OFFICER':
        return [
          ...commonItems,
          { name: 'Risk Assessments', href: '/dashboard/risk-assessments', icon: ShieldExclamationIcon },
          { name: 'Inspections', href: '/dashboard/inspections', icon: ClipboardDocumentCheckIcon },
        ];
      case 'PERMIT_REQUESTER':
        return [
          ...commonItems,
          { name: 'New Permit', href: '/dashboard/permits/new', icon: DocumentTextIcon },
        ];
      case 'PERMIT_HOLDER':
        return [
          ...commonItems,
          { name: 'Active Permits', href: '/dashboard/active-permits', icon: ClipboardDocumentCheckIcon },
        ];
      case 'PIC':
        return [
          ...commonItems,
          { name: 'Area Permits', href: '/dashboard/area-permits', icon: ClipboardDocumentCheckIcon },
          { name: 'Inspections', href: '/dashboard/inspections', icon: ShieldExclamationIcon },
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems(userRole);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="bg-indigo-800 text-white w-64 py-4 flex-shrink-0">
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold">PTW System</h1>
        </div>
        
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-indigo-700"
              >
                <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="px-2 mt-6 pt-6 border-t border-indigo-700">
          <Link
            href="/api/auth/signout"
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-indigo-700"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" aria-hidden="true" />
            Sign out
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {userName} ({userRole.replace(/_/g, ' ')})
              </span>
              <span className="inline-block h-8 w-8 rounded-full bg-indigo-600 text-white text-center leading-8">
                {userName.charAt(0)}
              </span>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 