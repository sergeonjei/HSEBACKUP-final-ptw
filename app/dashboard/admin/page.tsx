import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import StatsCard from '../../components/dashboard/StatsCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  ShieldExclamationIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';
import { Activity, UserData, CompanyData } from '../../types/dashboard';

// Mock user data for admin dashboard
const mockUserRole = 'ADMIN' as UserRole;
const mockUserName = 'Admin User';

// Mock data for users list
const mockUsers: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'HSE_LEAD', company: 'ABC Construction' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'HSE_ENGINEER', company: 'ABC Construction' },
  { id: '3', name: 'Alex Brown', email: 'alex@example.com', role: 'PERMIT_REQUESTER', company: 'XYZ Contractors' },
  { id: '4', name: 'Sarah Miller', email: 'sarah@example.com', role: 'PERMIT_HOLDER', company: 'XYZ Contractors' },
  { id: '5', name: 'Robert Johnson', email: 'robert@example.com', role: 'PIC', company: 'DEF Industries' },
];

// Mock data for companies
const mockCompanies: CompanyData[] = [
  { id: '1', name: 'ABC Construction', usersCount: 12, activatedDate: new Date('2023-01-10') },
  { id: '2', name: 'XYZ Contractors', usersCount: 8, activatedDate: new Date('2023-02-15') },
  { id: '3', name: 'DEF Industries', usersCount: 5, activatedDate: new Date('2023-03-21') },
];

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'USER_JOINED',
    title: 'New user registered',
    description: 'Sarah Miller joined as a Permit Holder',
    timestamp: new Date('2023-08-15T10:30:00'),
    userId: 'admin1',
    userName: 'Admin',
    entityId: '4',
    entityType: 'USER'
  },
  {
    id: '2',
    type: 'SYSTEM_UPDATE',
    title: 'System configuration updated',
    description: 'Email notification settings changed',
    timestamp: new Date('2023-08-14T14:45:00'),
    userId: 'admin1',
    userName: 'Admin'
  }
];

export default function AdminDashboardPage() {
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users, companies, and system settings.
          </p>
        </div>
        
        {/* Stats Overview */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-lg font-medium mb-4">System Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Total Users" 
              value={mockUsers.length.toString()} 
              icon={<UserIcon className="h-6 w-6" />}
              color="blue"
            />
            <StatsCard 
              title="Companies" 
              value={mockCompanies.length.toString()} 
              icon={<BuildingOfficeIcon className="h-6 w-6" />}
              color="purple"
            />
            <StatsCard 
              title="Active Permits" 
              value="24" 
              icon={<DocumentTextIcon className="h-6 w-6" />}
              color="green"
            />
            <StatsCard 
              title="Risk Assessments" 
              value="18" 
              icon={<ShieldExclamationIcon className="h-6 w-6" />}
              color="red"
            />
          </div>
        </section>
        
        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title" className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/admin/users/new" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <UserIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Add New User</span>
            </Link>
            <Link href="/dashboard/admin/companies/new" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <BuildingOfficeIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Add New Company</span>
            </Link>
            <Link href="/dashboard/admin/settings" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <Cog6ToothIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">System Settings</span>
            </Link>
            <Link href="/dashboard/admin/reports" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <DocumentTextIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Generate Reports</span>
            </Link>
          </div>
        </section>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Users */}
          <section aria-labelledby="users-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="users-title" className="text-lg font-medium text-gray-900">Recent Users</h2>
                <Link 
                  href="/dashboard/admin/users"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>
              <div className="card-body">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers.slice(0, 4).map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {typeof user.role === 'string' ? user.role.replace(/_/g, ' ') : user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/dashboard/admin/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
          
          {/* Recent Activity */}
          <section aria-labelledby="activity-title">
            <div className="card">
              <div className="card-header">
                <h2 id="activity-title" className="text-lg font-medium text-gray-900">Recent Activity</h2>
              </div>
              <div className="card-body">
                <ActivityFeed activities={mockActivities} />
              </div>
            </div>
          </section>
        </div>
        
        {/* Companies List */}
        <section aria-labelledby="companies-title">
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 id="companies-title" className="text-lg font-medium text-gray-900">Companies</h2>
              <Link 
                href="/dashboard/admin/companies"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all
              </Link>
            </div>
            <div className="card-body">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activated Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockCompanies.map((company) => (
                      <tr key={company.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {company.usersCount} users
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {company.activatedDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/dashboard/admin/companies/${company.id}`} className="text-indigo-600 hover:text-indigo-900">
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
} 