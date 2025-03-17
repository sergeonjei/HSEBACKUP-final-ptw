import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import PermitCard from '../components/dashboard/PermitCard';
import RiskAssessmentCard from '../components/dashboard/RiskAssessmentCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Link from 'next/link';
import { 
  ClipboardDocumentIcon, 
  DocumentCheckIcon, 
  ShieldExclamationIcon, 
  ClockIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { PermitStatus, RiskLevel, UserRole } from '@prisma/client';
import { 
  Activity,
  PermitData,
  RiskAssessmentData
} from '../types/dashboard';

// This would normally come from the auth session
const mockUserRole = 'HSE_LEAD' as UserRole;
const mockUserName = 'John Doe';

// These would normally come from the database
const mockPermits: PermitData[] = [
  {
    id: '1',
    title: 'Hot Work Permit - Welding',
    type: 'HOT_WORK',
    status: 'ACTIVE',
    requestedBy: 'Alex Brown',
    approvedBy: 'John Doe',
    startDate: new Date('2023-08-10'),
    endDate: new Date('2023-08-17'),
    location: 'Building A, Floor 3'
  },
  {
    id: '2',
    title: 'Confined Space Entry - Tank Cleaning',
    type: 'CONFINED_SPACE',
    status: 'PENDING',
    requestedBy: 'Sarah Miller',
    startDate: new Date('2023-08-18'),
    endDate: new Date('2023-08-19'),
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

const mockRiskAssessments: RiskAssessmentData[] = [
  {
    id: '1',
    title: 'Welding Operations Assessment',
    riskLevel: 'HIGH',
    associatedPermitId: '1',
    assessedBy: 'Jane Smith',
    completedDate: new Date('2023-08-09'),
    status: 'APPROVED'
  },
  {
    id: '2',
    title: 'Confined Space Pre-Entry Assessment',
    riskLevel: 'CRITICAL',
    associatedPermitId: '2',
    assessedBy: 'John Doe',
    completedDate: new Date('2023-08-16'),
    status: 'PENDING'
  },
  {
    id: '3',
    title: 'Electrical Work Safety Review',
    riskLevel: 'MEDIUM',
    associatedPermitId: '3',
    assessedBy: 'Alex Green',
    completedDate: new Date('2023-07-31'),
    status: 'APPROVED'
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'PERMIT_APPROVED',
    title: 'Permit Approved',
    description: 'Hot Work Permit #1 approved by John Doe',
    timestamp: new Date('2023-08-10T09:15:00'),
    userId: 'johndoe',
    userName: 'John Doe',
    entityId: '1',
    entityType: 'PERMIT'
  },
  {
    id: '2',
    type: 'RISK_ASSESSMENT_COMPLETED',
    title: 'Risk Assessment Completed',
    description: 'Welding Operations Assessment completed with HIGH risk level',
    timestamp: new Date('2023-08-09T14:30:00'),
    userId: 'janesmith',
    userName: 'Jane Smith',
    entityId: '1',
    entityType: 'RISK_ASSESSMENT'
  },
  {
    id: '3',
    type: 'PERMIT_CREATED',
    title: 'Permit Requested',
    description: 'Confined Space Entry permit requested by Sarah Miller',
    timestamp: new Date('2023-08-08T11:45:00'),
    userId: 'sarahmiller',
    userName: 'Sarah Miller',
    entityId: '2',
    entityType: 'PERMIT'
  }
];

export default function DashboardPage() {
  // Dashboard content based on user role
  const renderRoleSpecificContent = (role: string) => {
    switch(role) {
      case 'ADMIN':
        return (
          <>
            <section aria-labelledby="admin-overview">
              <h2 id="admin-overview" className="text-lg font-medium mb-4">System Overview</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard 
                  title="Total Users" 
                  value={42} 
                  icon={<ClipboardDocumentIcon className="h-6 w-6" />}
                  color="blue"
                />
                <StatsCard 
                  title="Active Permits" 
                  value={16} 
                  icon={<DocumentCheckIcon className="h-6 w-6" />}
                  color="green"
                />
                <StatsCard 
                  title="Risk Assessments" 
                  value={24} 
                  icon={<ShieldExclamationIcon className="h-6 w-6" />}
                  color="yellow"
                />
                <StatsCard 
                  title="Companies" 
                  value={8} 
                  icon={<ClipboardDocumentIcon className="h-6 w-6" />}
                  color="purple"
                />
              </div>
            </section>
          </>
        );
        
      case 'HSE_LEAD':
      case 'HSE_ENGINEER':
        return (
          <>
            <section aria-labelledby="hse-overview">
              <h2 id="hse-overview" className="text-lg font-medium mb-4">HSE Overview</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard 
                  title="Active Permits" 
                  value={16} 
                  icon={<DocumentCheckIcon className="h-6 w-6" />}
                  color="green"
                />
                <StatsCard 
                  title="Pending Approvals" 
                  value={5} 
                  icon={<ClockIcon className="h-6 w-6" />}
                  color="yellow"
                />
                <StatsCard 
                  title="Risk Assessments" 
                  value={24} 
                  icon={<ShieldExclamationIcon className="h-6 w-6" />}
                  color="red"
                />
                <StatsCard 
                  title="Expiring Soon" 
                  value={3} 
                  icon={<ClockIcon className="h-6 w-6" />}
                  color="purple"
                />
              </div>
            </section>
          </>
        );
        
      case 'HSE_OFFICER':
        return (
          <>
            <section aria-labelledby="officer-overview">
              <h2 id="officer-overview" className="text-lg font-medium mb-4">HSE Officer Overview</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard 
                  title="Active Permits" 
                  value={16} 
                  icon={<DocumentCheckIcon className="h-6 w-6" />}
                  color="green"
                />
                <StatsCard 
                  title="Risk Assessments" 
                  value={24} 
                  icon={<ShieldExclamationIcon className="h-6 w-6" />}
                  color="yellow"
                />
                <StatsCard 
                  title="Pending Inspections" 
                  value={7} 
                  icon={<ClipboardDocumentIcon className="h-6 w-6" />}
                  color="blue"
                />
              </div>
            </section>
          </>
        );
        
      case 'PERMIT_REQUESTER':
        return (
          <>
            <section aria-labelledby="requester-overview">
              <h2 id="requester-overview" className="text-lg font-medium mb-4">Your Permits</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard 
                  title="Total Permits" 
                  value={8} 
                  icon={<ClipboardDocumentIcon className="h-6 w-6" />}
                  color="blue"
                />
                <StatsCard 
                  title="Active Permits" 
                  value={3} 
                  icon={<DocumentCheckIcon className="h-6 w-6" />}
                  color="green"
                />
                <StatsCard 
                  title="Pending Approval" 
                  value={2} 
                  icon={<ClockIcon className="h-6 w-6" />}
                  color="yellow"
                />
              </div>
              
              <div className="mt-6">
                <Link href="/dashboard/permits/new" className="btn btn-primary">
                  Request New Permit
                </Link>
              </div>
            </section>
          </>
        );
        
      case 'PERMIT_HOLDER':
        return (
          <>
            <section aria-labelledby="holder-overview">
              <h2 id="holder-overview" className="text-lg font-medium mb-4">Your Active Permits</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard 
                  title="Active Permits" 
                  value={5} 
                  icon={<DocumentCheckIcon className="h-6 w-6" />}
                  color="green"
                />
                <StatsCard 
                  title="Expiring Soon" 
                  value={2} 
                  icon={<ClockIcon className="h-6 w-6" />}
                  color="yellow"
                />
                <StatsCard 
                  title="Completed" 
                  value={12} 
                  icon={<ClipboardDocumentIcon className="h-6 w-6" />}
                  color="blue"
                />
              </div>
            </section>
          </>
        );
        
      case 'PIC':
        return (
          <>
            <section aria-labelledby="pic-overview">
              <h2 id="pic-overview" className="text-lg font-medium mb-4">Area Overview</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard 
                  title="Active Permits" 
                  value={9} 
                  icon={<DocumentCheckIcon className="h-6 w-6" />}
                  color="green"
                />
                <StatsCard 
                  title="Pending Inspections" 
                  value={4} 
                  icon={<ClipboardDocumentIcon className="h-6 w-6" />}
                  color="yellow"
                />
                <StatsCard 
                  title="High Risk Activities" 
                  value={3} 
                  icon={<ShieldExclamationIcon className="h-6 w-6" />}
                  color="red"
                />
              </div>
            </section>
          </>
        );
        
      default:
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-medium text-gray-900">Welcome to the Permit to Work System</h2>
            <p className="mt-2 text-gray-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };
  
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {mockUserName}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of the Health, Safety & Environment system status.
          </p>
        </div>
        
        {/* Stats Grid */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="sr-only">Stats overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Active Permits" 
              value="8" 
              description="Currently active work permits"
              change="+2 from last week"
              icon={<DocumentCheckIcon className="h-6 w-6" />}
              color="blue"
            />
            <StatsCard 
              title="Pending Approvals" 
              value="3" 
              description="Permits awaiting your approval"
              change="-1 from last week"
              icon={<ClockIcon className="h-6 w-6" />}
              color="yellow"
            />
            <StatsCard 
              title="Risk Assessments" 
              value="5" 
              description="Pending risk assessments"
              change="+1 from last week"
              icon={<ShieldExclamationIcon className="h-6 w-6" />}
              color="red"
            />
            <StatsCard 
              title="Expiring Soon" 
              value="2" 
              description="Permits expiring in 48 hours"
              change="Same as last week"
              icon={<BriefcaseIcon className="h-6 w-6" />}
              color="green"
            />
          </div>
        </section>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
          
          {/* Risk Assessments */}
          <section aria-labelledby="risk-assessments-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="risk-assessments-title" className="text-lg font-medium text-gray-900">Risk Assessments</h2>
                <Link 
                  href="/dashboard/risk-assessments"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>
              <div className="card-body">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {mockRiskAssessments.map(assessment => (
                      <li key={assessment.id} className="py-3">
                        <RiskAssessmentCard assessment={assessment} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        
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