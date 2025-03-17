import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import StatsCard from '../../components/dashboard/StatsCard';
import PermitCard from '../../components/dashboard/PermitCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { 
  DocumentCheckIcon, 
  MapPinIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';
import { Activity, PermitData } from '../../types/dashboard';

// Mock user data for PIC dashboard
const mockUserRole = 'PIC' as UserRole;
const mockUserName = 'William Parker';
const mockArea = 'North Process Area';

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
    location: 'North Process Area, Building A'
  },
  {
    id: '2',
    title: 'Confined Space Entry - Tank Cleaning',
    type: 'CONFINED_SPACE',
    status: 'ACTIVE',
    requestedBy: 'Sarah Miller',
    approvedBy: 'John Doe',
    startDate: new Date('2023-08-12'),
    endDate: new Date('2023-08-13'),
    location: 'North Process Area, Storage Tank 7'
  },
  {
    id: '3',
    title: 'Electrical Work - Panel Replacement',
    type: 'ELECTRICAL',
    status: 'PENDING',
    requestedBy: 'Robert Johnson',
    startDate: new Date('2023-08-15'),
    endDate: new Date('2023-08-18'),
    location: 'North Process Area, Control Room B'
  },
  {
    id: '4',
    title: 'Excavation - Foundation Repair',
    type: 'EXCAVATION',
    status: 'PENDING',
    requestedBy: 'Michael Brown',
    startDate: new Date('2023-08-20'),
    endDate: new Date('2023-08-25'),
    location: 'North Process Area, Eastern Boundary'
  }
];

// Mock workspace locations
type WorkLocation = {
  id: string;
  name: string;
  permitCount: number;
  status: 'HIGH_ACTIVITY' | 'NORMAL' | 'RESTRICTED';
};

const mockLocations: WorkLocation[] = [
  {
    id: '1',
    name: 'Building A',
    permitCount: 2,
    status: 'HIGH_ACTIVITY'
  },
  {
    id: '2',
    name: 'Storage Tanks',
    permitCount: 1,
    status: 'NORMAL'
  },
  {
    id: '3',
    name: 'Control Room B',
    permitCount: 1,
    status: 'NORMAL'
  },
  {
    id: '4',
    name: 'Eastern Boundary',
    permitCount: 1,
    status: 'RESTRICTED'
  }
];

// Conflicting work data
type ConflictingWork = {
  id: string;
  permit1Id: string;
  permit1Title: string;
  permit2Id: string;
  permit2Title: string;
  conflictType: 'PROXIMITY' | 'RESOURCE' | 'SAFETY';
  location: string;
  status: 'UNRESOLVED' | 'MITIGATED';
};

const mockConflicts: ConflictingWork[] = [
  {
    id: '1',
    permit1Id: '1',
    permit1Title: 'Hot Work Permit - Welding',
    permit2Id: '3',
    permit2Title: 'Electrical Work - Panel Replacement',
    conflictType: 'SAFETY',
    location: 'Building A, Near Control Room B',
    status: 'UNRESOLVED'
  }
];

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'PERMIT_APPROVED',
    title: 'Permit Authorized',
    description: 'Confined Space Entry permit authorized for Storage Tank 7',
    timestamp: new Date('2023-08-12T08:45:00'),
    userId: 'williamparker',
    userName: 'William Parker',
    entityId: '2',
    entityType: 'PERMIT'
  },
  {
    id: '2',
    type: 'PERMIT_REJECTED',
    title: 'Permit Rejected',
    description: 'Eastern Boundary excavation permit requires additional safety measures',
    timestamp: new Date('2023-08-11T14:30:00'),
    userId: 'williamparker',
    userName: 'William Parker',
    entityId: '4',
    entityType: 'PERMIT'
  },
  {
    id: '3',
    type: 'PERMIT_CREATED',
    title: 'New Permit Submitted',
    description: 'Electrical work permit submitted for Control Room B',
    timestamp: new Date('2023-08-10T10:15:00'),
    userId: 'robertjohnson',
    userName: 'Robert Johnson',
    entityId: '3',
    entityType: 'PERMIT'
  }
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'HIGH_ACTIVITY':
      return 'bg-yellow-100 text-yellow-800';
    case 'NORMAL':
      return 'bg-green-100 text-green-800';
    case 'RESTRICTED':
      return 'bg-red-100 text-red-800';
    case 'UNRESOLVED':
      return 'bg-red-100 text-red-800';
    case 'MITIGATED':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function PicDashboardPage() {
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Area PIC Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and oversee all work permits in {mockArea}.
          </p>
        </div>
        
        {/* Stats Overview */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-lg font-medium mb-4">Area Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Active Permits" 
              value="2" 
              description="Currently active work permits"
              icon={<DocumentCheckIcon className="h-6 w-6" />}
              color="green"
            />
            <StatsCard 
              title="Pending Approvals" 
              value="2" 
              description="Permits awaiting PIC approval"
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
              color="yellow"
            />
            <StatsCard 
              title="Work Locations" 
              value="4" 
              description="Active work locations in area"
              icon={<MapPinIcon className="h-6 w-6" />}
              color="blue"
            />
            <StatsCard 
              title="Conflicts" 
              value="1" 
              description="Work permit conflicts"
              icon={<ExclamationTriangleIcon className="h-6 w-6" />}
              color="red"
            />
          </div>
        </section>
        
        {/* Area Map */}
        <section aria-labelledby="map-title">
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 id="map-title" className="text-lg font-medium text-gray-900">Area Work Status</h2>
              <Link 
                href="/dashboard/area-map"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Full Map View
              </Link>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockLocations.map(location => (
                  <div key={location.id} className="card p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{location.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(location.status)}`}>
                        {location.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {location.permitCount} active permit{location.permitCount !== 1 ? 's' : ''}
                    </p>
                    <Link 
                      href={`/dashboard/locations/${location.id}`}
                      className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-500 inline-block"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Permits Requiring Approval */}
          <section aria-labelledby="approvals-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="approvals-title" className="text-lg font-medium text-gray-900">Pending Approvals</h2>
                <Link 
                  href="/dashboard/pending-approvals"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>
              <div className="card-body">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {mockPermits.filter(p => p.status === 'PENDING').map(permit => (
                      <li key={permit.id} className="py-3">
                        <PermitCard permit={permit} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Conflicting Work */}
          <section aria-labelledby="conflicts-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="conflicts-title" className="text-lg font-medium text-gray-900">Work Conflicts</h2>
                <Link 
                  href="/dashboard/conflicts"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>
              <div className="card-body">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {mockConflicts.map(conflict => (
                      <li key={conflict.id} className="py-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="p-1 rounded-full bg-red-100">
                              <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                {conflict.conflictType === 'SAFETY' ? 'Safety Conflict' : 
                                 conflict.conflictType === 'PROXIMITY' ? 'Proximity Conflict' : 
                                 'Resource Conflict'}
                              </p>
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusClass(conflict.status)}`}>
                                {conflict.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Between <span className="font-medium">{conflict.permit1Title}</span> and <span className="font-medium">{conflict.permit2Title}</span>
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              <MapPinIcon className="inline-flex h-4 w-4 mr-1 -mt-0.5 text-gray-400" />
                              {conflict.location}
                            </p>
                            <div className="mt-2">
                              <Link 
                                href={`/dashboard/conflicts/${conflict.id}`}
                                className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Resolve Conflict
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* Active Permits */}
        <section aria-labelledby="permits-title">
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 id="permits-title" className="text-lg font-medium text-gray-900">All Area Permits</h2>
              <Link 
                href="/dashboard/area-permits"
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
                      Upcoming
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
        
        {/* Weekly Schedule */}
        <section aria-labelledby="schedule-title">
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 id="schedule-title" className="text-lg font-medium text-gray-900">This Week's Schedule</h2>
              <Link 
                href="/dashboard/schedule"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Full Calendar
              </Link>
            </div>
            <div className="card-body">
              <div className="p-4 bg-indigo-50 rounded-lg mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-indigo-800">Work Summary</h3>
                    <p className="mt-1 text-sm text-indigo-700">
                      This week has 4 permits scheduled with peak activity on Wednesday.
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="bg-white p-2 text-center">
                      <div className="text-xs font-medium text-gray-500">{day}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {[
                    {day: 'Mon', count: 2, color: 'bg-yellow-100'},
                    {day: 'Tue', count: 2, color: 'bg-yellow-100'},
                    {day: 'Wed', count: 3, color: 'bg-orange-100'},
                    {day: 'Thu', count: 2, color: 'bg-yellow-100'},
                    {day: 'Fri', count: 2, color: 'bg-yellow-100'},
                    {day: 'Sat', count: 1, color: 'bg-green-100'},
                    {day: 'Sun', count: 0, color: 'bg-white'}
                  ].map((day) => (
                    <div key={day.day} className={`${day.color} p-2 h-24`}>
                      <div className="text-xs font-medium text-gray-800">
                        {day.count > 0 ? `${day.count} permits` : 'No activity'}
                      </div>
                    </div>
                  ))}
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