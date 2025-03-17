import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import StatsCard from '../../components/dashboard/StatsCard';
import PermitCard from '../../components/dashboard/PermitCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { 
  DocumentPlusIcon,
  DocumentCheckIcon, 
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';
import { Activity, PermitData } from '../../types/dashboard';

// Mock user data for Permit Requester dashboard
const mockUserRole = 'PERMIT_REQUESTER' as UserRole;
const mockUserName = 'Emily Davis';

// Mock permit data
const mockPermits: PermitData[] = [
  {
    id: '1',
    title: 'Hot Work Permit - Welding',
    type: 'HOT_WORK',
    status: 'ACTIVE',
    requestedBy: 'Emily Davis',
    approvedBy: 'Jane Smith',
    startDate: new Date('2023-08-10'),
    endDate: new Date('2023-08-17'),
    location: 'Building A, Floor 3'
  },
  {
    id: '2',
    title: 'Confined Space Entry - Tank Cleaning',
    type: 'CONFINED_SPACE',
    status: 'PENDING',
    requestedBy: 'Emily Davis',
    startDate: new Date('2023-08-18'),
    endDate: new Date('2023-08-19'),
    location: 'Storage Tank 7'
  },
  {
    id: '3',
    title: 'Electrical Work - Panel Replacement',
    type: 'ELECTRICAL',
    status: 'REJECTED',
    requestedBy: 'Emily Davis',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-08-05'),
    location: 'Control Room B'
  },
  {
    id: '4',
    title: 'Excavation Permit - Trench Work',
    type: 'EXCAVATION',
    status: 'COMPLETED',
    requestedBy: 'Emily Davis',
    approvedBy: 'Jane Smith',
    startDate: new Date('2023-07-15'),
    endDate: new Date('2023-07-22'),
    location: 'North Yard'
  }
];

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'PERMIT_CREATED',
    title: 'Permit Requested',
    description: 'Confined Space Entry permit submitted for approval',
    timestamp: new Date('2023-08-15T10:30:00'),
    userId: 'emilydavis',
    userName: 'Emily Davis',
    entityId: '2',
    entityType: 'PERMIT'
  },
  {
    id: '2',
    type: 'PERMIT_REJECTED',
    title: 'Permit Rejected',
    description: 'Electrical Work permit was rejected: Missing safety procedures',
    timestamp: new Date('2023-08-02T14:45:00'),
    userId: 'janesmith',
    userName: 'Jane Smith',
    entityId: '3',
    entityType: 'PERMIT'
  },
  {
    id: '3',
    type: 'PERMIT_APPROVED',
    title: 'Permit Approved',
    description: 'Hot Work Permit approved by HSE Lead',
    timestamp: new Date('2023-08-09T09:15:00'),
    userId: 'janesmith',
    userName: 'Jane Smith',
    entityId: '1',
    entityType: 'PERMIT'
  },
  {
    id: '4',
    type: 'PERMIT_CLOSED',
    title: 'Permit Closed',
    description: 'Excavation Permit closed after successful completion',
    timestamp: new Date('2023-07-22T16:30:00'),
    userId: 'emilydavis',
    userName: 'Emily Davis',
    entityId: '4',
    entityType: 'PERMIT'
  }
];

// Permit templates for quick selection
const permitTemplates = [
  { id: 'hot-work', name: 'Hot Work', description: 'For welding, cutting, or any work involving open flames or sparks' },
  { id: 'confined-space', name: 'Confined Space Entry', description: 'For work in enclosed spaces with limited access/egress' },
  { id: 'electrical', name: 'Electrical Work', description: 'For work on electrical systems or equipment' },
  { id: 'excavation', name: 'Excavation', description: 'For digging, trenching, or ground disturbance activities' },
  { id: 'lifting', name: 'Lifting Operations', description: 'For crane operations and heavy lifts' }
];

export default function PermitRequesterDashboardPage() {
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permit Requester Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Request new work permits and track existing permit status.
          </p>
        </div>
        
        {/* Stats Overview */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-lg font-medium mb-4">Your Permits Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Active Permits" 
              value="1" 
              icon={<DocumentCheckIcon className="h-6 w-6" />}
              color="green"
            />
            <StatsCard 
              title="Pending Approval" 
              value="1" 
              icon={<ClockIcon className="h-6 w-6" />}
              color="yellow"
            />
            <StatsCard 
              title="Rejected" 
              value="1" 
              icon={<XCircleIcon className="h-6 w-6" />}
              color="red"
            />
            <StatsCard 
              title="Completed" 
              value="1" 
              icon={<ArrowPathIcon className="h-6 w-6" />}
              color="blue"
            />
          </div>
        </section>
        
        {/* New Permit Request Section */}
        <section aria-labelledby="new-permit-title">
          <div className="card">
            <div className="card-header">
              <h2 id="new-permit-title" className="text-lg font-medium text-gray-900">Request New Permit</h2>
            </div>
            <div className="card-body">
              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <DocumentPlusIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-indigo-800">Start with a template or create from scratch</h3>
                    <p className="mt-2 text-sm text-indigo-700">
                      Select a template for faster permit creation or start with a blank form.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {permitTemplates.map((template) => (
                  <Link 
                    key={template.id}
                    href={`/dashboard/permits/new?template=${template.id}`} 
                    className="card p-4 hover:bg-gray-50 border border-gray-200"
                  >
                    <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">{template.description}</p>
                  </Link>
                ))}
                <Link 
                  href="/dashboard/permits/new" 
                  className="card p-4 hover:bg-gray-50 border border-gray-200 border-dashed flex flex-col items-center justify-center text-center"
                >
                  <DocumentPlusIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Custom Permit</span>
                  <span className="text-xs text-gray-500 mt-1">Start from scratch</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Your Permits */}
        <section aria-labelledby="permits-title">
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 id="permits-title" className="text-lg font-medium text-gray-900">Your Permits</h2>
              <Link 
                href="/dashboard/permits"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all
              </Link>
            </div>
            <div className="card-body">
              <div>
                <div className="mb-4 border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button className="border-indigo-500 text-indigo-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                      All Permits
                    </button>
                    <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                      Active
                    </button>
                    <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                      Pending
                    </button>
                    <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                      Completed/Closed
                    </button>
                  </nav>
                </div>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {mockPermits.map(permit => (
                    <li key={permit.id} className="py-3">
                      <PermitCard permit={permit} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Application Tips */}
        <section aria-labelledby="tips-title">
          <div className="card">
            <div className="card-header">
              <h2 id="tips-title" className="text-lg font-medium text-gray-900">Application Tips</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="card p-4 bg-blue-50 border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-800">Complete All Fields</h3>
                  <p className="mt-1 text-xs text-blue-700">
                    Ensure all required fields are filled out to avoid delays in approval.
                  </p>
                </div>
                <div className="card p-4 bg-green-50 border border-green-100">
                  <h3 className="text-sm font-medium text-green-800">Attach Diagrams</h3>
                  <p className="mt-1 text-xs text-green-700">
                    Including clear diagrams of work areas increases approval chances.
                  </p>
                </div>
                <div className="card p-4 bg-yellow-50 border border-yellow-100">
                  <h3 className="text-sm font-medium text-yellow-800">Submit Early</h3>
                  <p className="mt-1 text-xs text-yellow-700">
                    Submit permits at least 48 hours before work to allow for review.
                  </p>
                </div>
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
    </DashboardLayout>
  );
} 