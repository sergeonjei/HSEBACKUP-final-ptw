import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import StatsCard from '../../components/dashboard/StatsCard';
import PermitCard from '../../components/dashboard/PermitCard';
import RiskAssessmentCard from '../../components/dashboard/RiskAssessmentCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { 
  DocumentCheckIcon, 
  ShieldExclamationIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';
import { Activity, PermitData, RiskAssessmentData } from '../../types/dashboard';

// Mock user data for HSE Lead dashboard
const mockUserRole = 'HSE_LEAD' as UserRole;
const mockUserName = 'Jane Smith';

// Mock permit data
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

// Mock risk assessment data
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
    assessedBy: 'Jane Smith',
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

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'PERMIT_APPROVED',
    title: 'Permit Approved',
    description: 'Hot Work Permit #1 approved by Jane Smith',
    timestamp: new Date('2023-08-10T09:15:00'),
    userId: 'janesmith',
    userName: 'Jane Smith',
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

export default function HseLeadDashboardPage() {
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HSE Lead Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team, review risk assessments, and oversee permit activities.
          </p>
        </div>
        
        {/* Stats Overview */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-lg font-medium mb-4">Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Pending Approvals" 
              value="7" 
              description="Permits awaiting approval"
              icon={<DocumentCheckIcon className="h-6 w-6" />}
              color="yellow"
            />
            <StatsCard 
              title="Risk Assessments" 
              value="12" 
              description="Active assessments"
              icon={<ShieldExclamationIcon className="h-6 w-6" />}
              color="red"
            />
            <StatsCard 
              title="Team Members" 
              value="8" 
              description="Active HSE personnel"
              icon={<UserGroupIcon className="h-6 w-6" />}
              color="blue"
            />
            <StatsCard 
              title="Compliance Rate" 
              value="94%" 
              description="Overall compliance score"
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
              color="green"
            />
          </div>
        </section>
        
        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title" className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/permits/new" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <DocumentCheckIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Create Permit</span>
            </Link>
            <Link href="/dashboard/risk-assessments/new" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <ShieldExclamationIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">New Risk Assessment</span>
            </Link>
            <Link href="/dashboard/reports" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <ChartBarIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Safety Reports</span>
            </Link>
            <Link href="/dashboard/team" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <UserGroupIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Manage Team</span>
            </Link>
          </div>
        </section>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Pending Approvals */}
          <section aria-labelledby="approvals-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="approvals-title" className="text-lg font-medium text-gray-900">Pending Approvals</h2>
                <Link 
                  href="/dashboard/approvals"
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
        
        {/* Safety Metrics */}
        <section aria-labelledby="metrics-title">
          <div className="card">
            <div className="card-header">
              <h2 id="metrics-title" className="text-lg font-medium text-gray-900">Safety Metrics</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Incident Rate by Department</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Construction</span>
                        <span className="text-sm font-medium text-gray-900">2.4</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Maintenance</span>
                        <span className="text-sm font-medium text-gray-900">1.7</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Operations</span>
                        <span className="text-sm font-medium text-gray-900">3.1</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '31%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Permit Compliance</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Hot Work</span>
                        <span className="text-sm font-medium text-gray-900">96%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Confined Space</span>
                        <span className="text-sm font-medium text-gray-900">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Electrical</span>
                        <span className="text-sm font-medium text-gray-900">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
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