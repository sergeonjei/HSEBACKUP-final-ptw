import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import StatsCard from '../../components/dashboard/StatsCard';
import PermitCard from '../../components/dashboard/PermitCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { 
  DocumentCheckIcon, 
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';
import { Activity, PermitData } from '../../types/dashboard';

// Mock user data for HSE Officer dashboard
const mockUserRole = 'HSE_OFFICER' as UserRole;
const mockUserName = 'Michael Chen';

// Mock permit data for inspections
const mockPermits: PermitData[] = [
  {
    id: '1',
    title: 'Hot Work Permit - Welding',
    type: 'HOT_WORK',
    status: 'ACTIVE',
    requestedBy: 'Alex Brown',
    approvedBy: 'Jane Smith',
    startDate: new Date('2023-08-10'),
    endDate: new Date('2023-08-17'),
    location: 'Building A, Floor 3'
  },
  {
    id: '2',
    title: 'Confined Space Entry - Tank Cleaning',
    type: 'CONFINED_SPACE',
    status: 'ACTIVE',
    requestedBy: 'Sarah Miller',
    approvedBy: 'Jane Smith',
    startDate: new Date('2023-08-18'),
    endDate: new Date('2023-08-19'),
    location: 'Storage Tank 7'
  },
  {
    id: '3',
    title: 'Electrical Work - Panel Replacement',
    type: 'ELECTRICAL',
    status: 'ACTIVE',
    requestedBy: 'Robert Johnson',
    approvedBy: 'Jane Smith',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-08-15'),
    location: 'Control Room B'
  }
];

// Mock inspections data
type InspectionData = {
  id: string;
  title: string;
  location: string;
  scheduledDate: Date;
  status: 'SCHEDULED' | 'COMPLETED' | 'OVERDUE';
  permitId?: string;
  findings?: number;
};

const mockInspections: InspectionData[] = [
  {
    id: '1',
    title: 'Weekly Hot Work Inspection',
    location: 'Building A, Floor 3',
    scheduledDate: new Date('2023-08-12'),
    status: 'SCHEDULED',
    permitId: '1'
  },
  {
    id: '2',
    title: 'Confined Space Pre-Entry Inspection',
    location: 'Storage Tank 7',
    scheduledDate: new Date('2023-08-17'),
    status: 'SCHEDULED',
    permitId: '2'
  },
  {
    id: '3',
    title: 'Monthly Fire Safety Inspection',
    location: 'Building B, All Floors',
    scheduledDate: new Date('2023-08-05'),
    status: 'COMPLETED',
    findings: 3
  },
  {
    id: '4',
    title: 'Quarterly Electrical Safety Audit',
    location: 'Main Electrical Room',
    scheduledDate: new Date('2023-07-28'),
    status: 'OVERDUE',
  }
];

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'PERMIT_APPROVED',
    title: 'Inspection Completed',
    description: 'Weekly Hot Work Inspection at Building A completed with 2 findings',
    timestamp: new Date('2023-08-09T14:30:00'),
    userId: 'michaelchen',
    userName: 'Michael Chen',
    entityId: '1',
    entityType: 'PERMIT'
  },
  {
    id: '2',
    type: 'PERMIT_CREATED',
    title: 'Inspection Scheduled',
    description: 'Confined Space Pre-Entry Inspection scheduled for August 17',
    timestamp: new Date('2023-08-08T11:15:00'),
    userId: 'michaelchen',
    userName: 'Michael Chen',
    entityId: '2',
    entityType: 'PERMIT'
  },
  {
    id: '3',
    type: 'PERMIT_REJECTED',
    title: 'Compliance Issue Reported',
    description: 'Non-compliance found in Monthly Fire Safety Inspection',
    timestamp: new Date('2023-08-05T09:45:00'),
    userId: 'michaelchen',
    userName: 'Michael Chen',
    entityId: '3',
    entityType: 'PERMIT'
  }
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'SCHEDULED':
      return 'bg-blue-100 text-blue-800';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'OVERDUE':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function HseOfficerDashboardPage() {
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HSE Officer Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage inspections, field verifications, and compliance monitoring.
          </p>
        </div>
        
        {/* Stats Overview */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-lg font-medium mb-4">Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Today's Inspections" 
              value="2" 
              description="Inspections scheduled for today"
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
              color="blue"
            />
            <StatsCard 
              title="This Week" 
              value="8" 
              description="Inspections scheduled this week"
              icon={<CalendarIcon className="h-6 w-6" />}
              color="purple"
            />
            <StatsCard 
              title="Active Permits" 
              value="12" 
              description="Permits requiring verification"
              icon={<DocumentCheckIcon className="h-6 w-6" />}
              color="green"
            />
            <StatsCard 
              title="Compliance Issues" 
              value="3" 
              description="Open non-compliance reports"
              icon={<ExclamationTriangleIcon className="h-6 w-6" />}
              color="red"
            />
          </div>
        </section>
        
        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title" className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/inspections/new" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <ClipboardDocumentCheckIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Schedule Inspection</span>
            </Link>
            <Link href="/dashboard/non-compliance" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Report Non-Compliance</span>
            </Link>
            <Link href="/dashboard/inspection-map" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <MapPinIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Inspection Map</span>
            </Link>
          </div>
        </section>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upcoming Inspections */}
          <section aria-labelledby="inspections-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="inspections-title" className="text-lg font-medium text-gray-900">Upcoming Inspections</h2>
                <Link 
                  href="/dashboard/inspections"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>
              <div className="card-body">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {mockInspections.filter(i => i.status !== 'COMPLETED').map(inspection => (
                      <li key={inspection.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="p-2 rounded-full bg-indigo-50 text-indigo-700">
                              <ClipboardDocumentCheckIcon className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {inspection.title}
                            </p>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPinIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span>{inspection.location}</span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span>{formatDate(inspection.scheduledDate)}</span>
                            </div>
                          </div>
                          <div>
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusClass(inspection.status)}`}>
                              {inspection.status}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Active Permits */}
          <section aria-labelledby="permits-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="permits-title" className="text-lg font-medium text-gray-900">Active Permits for Verification</h2>
                <Link 
                  href="/dashboard/active-permits"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>
              <div className="card-body">
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
        </div>
        
        {/* Compliance Map */}
        <section aria-labelledby="map-title">
          <div className="card">
            <div className="card-header">
              <h2 id="map-title" className="text-lg font-medium text-gray-900">Compliance Status by Area</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4 bg-green-50 border border-green-100">
                  <h3 className="font-medium text-green-800">Building A</h3>
                  <p className="text-green-700 mt-1 text-sm">Fully Compliant</p>
                  <p className="text-green-600 text-xs mt-1">Last inspection: 3 days ago</p>
                </div>
                <div className="card p-4 bg-yellow-50 border border-yellow-100">
                  <h3 className="font-medium text-yellow-800">Building B</h3>
                  <p className="text-yellow-700 mt-1 text-sm">Minor Issues (2)</p>
                  <p className="text-yellow-600 text-xs mt-1">Last inspection: 7 days ago</p>
                </div>
                <div className="card p-4 bg-red-50 border border-red-100">
                  <h3 className="font-medium text-red-800">Storage Area</h3>
                  <p className="text-red-700 mt-1 text-sm">Non-Compliant</p>
                  <p className="text-red-600 text-xs mt-1">Last inspection: 14 days ago</p>
                </div>
                <div className="card p-4 bg-blue-50 border border-blue-100">
                  <h3 className="font-medium text-blue-800">Control Room</h3>
                  <p className="text-blue-700 mt-1 text-sm">Inspection Due</p>
                  <p className="text-blue-600 text-xs mt-1">Scheduled for: Tomorrow</p>
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