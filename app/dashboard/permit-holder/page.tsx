import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import StatsCard from '../../components/dashboard/StatsCard';
import PermitCard from '../../components/dashboard/PermitCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { 
  DocumentCheckIcon, 
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';
import { Activity, PermitData } from '../../types/dashboard';

// Mock user data for Permit Holder dashboard
const mockUserRole = 'PERMIT_HOLDER' as UserRole;
const mockUserName = 'Thomas Wilson';

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
    status: 'ACTIVE',
    requestedBy: 'Sarah Miller',
    approvedBy: 'John Doe',
    startDate: new Date('2023-08-12'),
    endDate: new Date('2023-08-13'),
    location: 'Storage Tank 7'
  },
  {
    id: '3',
    title: 'Electrical Work - Panel Replacement',
    type: 'ELECTRICAL',
    status: 'COMPLETED',
    requestedBy: 'Robert Johnson',
    approvedBy: 'Jane Smith',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-08-05'),
    location: 'Control Room B'
  }
];

// Mock team members working on permits
type TeamMember = {
  id: string;
  name: string;
  role: string;
  permitId: string;
  status: 'CHECKED_IN' | 'CHECKED_OUT' | 'NOT_CHECKED_IN';
  lastCheckIn?: Date;
};

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'James Wilson',
    role: 'Welder',
    permitId: '1',
    status: 'CHECKED_IN',
    lastCheckIn: new Date('2023-08-12T08:30:00')
  },
  {
    id: '2',
    name: 'Mary Johnson',
    role: 'Safety Attendant',
    permitId: '1',
    status: 'CHECKED_IN',
    lastCheckIn: new Date('2023-08-12T08:25:00')
  },
  {
    id: '3',
    name: 'David Lee',
    role: 'Electrician',
    permitId: '1',
    status: 'NOT_CHECKED_IN'
  },
  {
    id: '4',
    name: 'Susan Brown',
    role: 'Confined Space Attendant',
    permitId: '2',
    status: 'CHECKED_IN',
    lastCheckIn: new Date('2023-08-12T09:15:00')
  }
];

// Mock safety checklist items
type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
  permitId: string;
};

const mockChecklistItems: ChecklistItem[] = [
  {
    id: '1',
    text: 'Fire extinguisher available at work site',
    completed: true,
    permitId: '1'
  },
  {
    id: '2',
    text: 'Area cleared of flammable materials',
    completed: true,
    permitId: '1'
  },
  {
    id: '3',
    text: 'Fire watch assigned and briefed',
    completed: true,
    permitId: '1'
  },
  {
    id: '4',
    text: 'All workers briefed on emergency procedures',
    completed: false,
    permitId: '1'
  },
  {
    id: '5',
    text: 'Gas testing completed and within acceptable limits',
    completed: true,
    permitId: '2'
  },
  {
    id: '6',
    text: 'Ventilation equipment operational',
    completed: true,
    permitId: '2'
  },
  {
    id: '7',
    text: 'Communication system tested',
    completed: false,
    permitId: '2'
  }
];

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'PERMIT_APPROVED',
    title: 'Work Started',
    description: 'Hot Work Permit #1 work has commenced',
    timestamp: new Date('2023-08-12T08:45:00'),
    userId: 'thomaswilson',
    userName: 'Thomas Wilson',
    entityId: '1',
    entityType: 'PERMIT'
  },
  {
    id: '2',
    type: 'PERMIT_CREATED',
    title: 'Team Member Checked In',
    description: 'James Wilson checked in for Hot Work Permit #1',
    timestamp: new Date('2023-08-12T08:30:00'),
    userId: 'jameswilson',
    userName: 'James Wilson',
    entityId: '1',
    entityType: 'PERMIT'
  },
  {
    id: '3',
    type: 'PERMIT_CREATED',
    title: 'Team Member Checked In',
    description: 'Mary Johnson checked in for Hot Work Permit #1',
    timestamp: new Date('2023-08-12T08:25:00'),
    userId: 'maryjohnson',
    userName: 'Mary Johnson',
    entityId: '1',
    entityType: 'PERMIT'
  }
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'CHECKED_IN':
      return 'bg-green-100 text-green-800';
    case 'CHECKED_OUT':
      return 'bg-yellow-100 text-yellow-800';
    case 'NOT_CHECKED_IN':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatTime = (date: Date) => {
  if (!date) return '';
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export default function PermitHolderDashboardPage() {
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permit Holder Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage active permits, check-in team members, and verify safety requirements.
          </p>
        </div>
        
        {/* Stats Overview */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-lg font-medium mb-4">Active Work Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Active Permits" 
              value="2" 
              icon={<DocumentCheckIcon className="h-6 w-6" />}
              color="green"
            />
            <StatsCard 
              title="Team Members" 
              value="4" 
              icon={<UserGroupIcon className="h-6 w-6" />}
              color="blue"
            />
            <StatsCard 
              title="Checked In" 
              value="3" 
              icon={<CheckCircleIcon className="h-6 w-6" />}
              color="indigo"
            />
            <StatsCard 
              title="Pending Items" 
              value="2" 
              icon={<ExclamationTriangleIcon className="h-6 w-6" />}
              color="red"
            />
          </div>
        </section>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Active Permits */}
          <section aria-labelledby="permits-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="permits-title" className="text-lg font-medium text-gray-900">Active Permits</h2>
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
                    {mockPermits.filter(p => p.status === 'ACTIVE').map(permit => (
                      <li key={permit.id} className="py-3">
                        <PermitCard permit={permit} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Team Members */}
          <section aria-labelledby="team-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="team-title" className="text-lg font-medium text-gray-900">Team Check-In Status</h2>
                <Link 
                  href="/dashboard/team-checkin"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Manage
                </Link>
              </div>
              <div className="card-body">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {mockTeamMembers.map(member => (
                      <li key={member.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                              {member.name.charAt(0)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {member.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {member.role}
                            </p>
                          </div>
                          <div>
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusClass(member.status)}`}>
                              {member.status.replace(/_/g, ' ')}
                            </span>
                            {member.lastCheckIn && (
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTime(member.lastCheckIn)}
                              </p>
                            )}
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
        
        {/* Safety Checklist */}
        <section aria-labelledby="checklist-title">
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 id="checklist-title" className="text-lg font-medium text-gray-900">
                Safety Checklist for Hot Work Permit - Welding
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                2/4 Completed
              </span>
            </div>
            <div className="card-body">
              <ul className="divide-y divide-gray-200">
                {mockChecklistItems.filter(item => item.permitId === '1').map((item) => (
                  <li key={item.id} className="py-3 flex items-center">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center ${
                      item.completed 
                        ? 'bg-green-100 border-green-500 text-green-500' 
                        : 'bg-white border-gray-300'
                    }`}>
                      {item.completed && (
                        <CheckCircleIcon className="h-4 w-4" />
                      )}
                    </div>
                    <span className={`ml-3 text-sm ${item.completed ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                      {item.text}
                    </span>
                    {!item.completed && (
                      <button className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-200 text-xs px-2 py-1 rounded">
                        Complete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button className="btn-primary text-sm">
                  Submit Completed Checklist
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Active Permit Controls */}
        <section aria-labelledby="controls-title">
          <div className="card">
            <div className="card-header">
              <h2 id="controls-title" className="text-lg font-medium text-gray-900">Permit Controls</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="card p-4 hover:bg-green-50 border border-green-200 flex flex-col items-center justify-center text-center cursor-pointer">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-900">Start Work</span>
                </div>
                <div className="card p-4 hover:bg-red-50 border border-red-200 flex flex-col items-center justify-center text-center cursor-pointer">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mb-2" />
                  <span className="text-sm font-medium text-red-900">Stop Work</span>
                </div>
                <div className="card p-4 hover:bg-yellow-50 border border-yellow-200 flex flex-col items-center justify-center text-center cursor-pointer">
                  <ClockIcon className="h-8 w-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-yellow-900">Extend Time</span>
                </div>
                <div className="card p-4 hover:bg-blue-50 border border-blue-200 flex flex-col items-center justify-center text-center cursor-pointer">
                  <DocumentCheckIcon className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-900">Close Permit</span>
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