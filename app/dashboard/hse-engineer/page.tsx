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
  BeakerIcon,
  ExclamationTriangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@prisma/client';
import { Activity, PermitData, RiskAssessmentData } from '../../types/dashboard';

// Mock user data for HSE Engineer dashboard
const mockUserRole = 'HSE_ENGINEER' as UserRole;
const mockUserName = 'Alex Thompson';

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
  }
];

// Mock risk assessment data
const mockRiskAssessments: RiskAssessmentData[] = [
  {
    id: '1',
    title: 'Welding Operations Assessment',
    riskLevel: 'HIGH',
    associatedPermitId: '1',
    assessedBy: 'Alex Thompson',
    completedDate: new Date('2023-08-09'),
    status: 'APPROVED'
  },
  {
    id: '2',
    title: 'Confined Space Pre-Entry Assessment',
    riskLevel: 'CRITICAL',
    associatedPermitId: '2',
    assessedBy: 'Alex Thompson',
    completedDate: new Date('2023-08-16'),
    status: 'PENDING'
  },
  {
    id: '3',
    title: 'Electrical Work Safety Review',
    riskLevel: 'MEDIUM',
    associatedPermitId: '3',
    assessedBy: 'Alex Thompson',
    completedDate: new Date('2023-07-31'),
    status: 'APPROVED'
  }
];

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'RISK_ASSESSMENT_COMPLETED',
    title: 'Risk Assessment Completed',
    description: 'Welding Operations Assessment completed with HIGH risk level',
    timestamp: new Date('2023-08-09T14:30:00'),
    userId: 'alexthompson',
    userName: 'Alex Thompson',
    entityId: '1',
    entityType: 'RISK_ASSESSMENT'
  },
  {
    id: '2',
    type: 'PERMIT_APPROVED',
    title: 'Permit Technical Review',
    description: 'Technical review completed for Hot Work Permit #1',
    timestamp: new Date('2023-08-08T11:15:00'),
    userId: 'alexthompson',
    userName: 'Alex Thompson',
    entityId: '1',
    entityType: 'PERMIT'
  },
  {
    id: '3',
    type: 'RISK_ASSESSMENT_COMPLETED',
    title: 'Risk Assessment Started',
    description: 'Confined Space Pre-Entry Assessment initiated',
    timestamp: new Date('2023-08-07T09:45:00'),
    userId: 'alexthompson',
    userName: 'Alex Thompson',
    entityId: '2',
    entityType: 'RISK_ASSESSMENT'
  }
];

export default function HseEngineerDashboardPage() {
  return (
    <DashboardLayout userRole={mockUserRole} userName={mockUserName}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HSE Engineer Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage risk assessments, technical reviews, and safety controls.
          </p>
        </div>
        
        {/* Stats Overview */}
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-lg font-medium mb-4">Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Pending Assessments" 
              value="5" 
              description="Risk assessments awaiting completion"
              icon={<ShieldExclamationIcon className="h-6 w-6" />}
              color="yellow"
            />
            <StatsCard 
              title="Technical Reviews" 
              value="3" 
              description="Permits pending technical review"
              icon={<DocumentCheckIcon className="h-6 w-6" />}
              color="blue"
            />
            <StatsCard 
              title="High Risk Activities" 
              value="8" 
              description="Current high-risk operations"
              icon={<ExclamationTriangleIcon className="h-6 w-6" />}
              color="red"
            />
            <StatsCard 
              title="Completed Assessments" 
              value="24" 
              description="Risk assessments completed this month"
              icon={<BeakerIcon className="h-6 w-6" />}
              color="green"
            />
          </div>
        </section>
        
        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-title">
          <h2 id="quick-actions-title" className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/risk-assessments/new" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <ShieldExclamationIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">New Risk Assessment</span>
            </Link>
            <Link href="/dashboard/technical-reviews" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <DocumentCheckIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Review Permits</span>
            </Link>
            <Link href="/dashboard/risk-analysis" className="card p-4 hover:bg-gray-50 flex flex-col items-center justify-center text-center">
              <ChartBarIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Risk Analysis Tools</span>
            </Link>
          </div>
        </section>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Pending Technical Reviews */}
          <section aria-labelledby="reviews-title">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 id="reviews-title" className="text-lg font-medium text-gray-900">Pending Technical Reviews</h2>
                <Link 
                  href="/dashboard/technical-reviews"
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
                <h2 id="risk-assessments-title" className="text-lg font-medium text-gray-900">Your Risk Assessments</h2>
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
        
        {/* Hazard Analysis */}
        <section aria-labelledby="hazard-title">
          <div className="card">
            <div className="card-header">
              <h2 id="hazard-title" className="text-lg font-medium text-gray-900">Top Hazards Identified</h2>
            </div>
            <div className="card-body">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Fall Hazards</span>
                    <span className="text-sm font-medium text-gray-900">32 instances</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Chemical Exposure</span>
                    <span className="text-sm font-medium text-gray-900">28 instances</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Confined Space</span>
                    <span className="text-sm font-medium text-gray-900">21 instances</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Electrical Hazards</span>
                    <span className="text-sm font-medium text-gray-900">18 instances</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Fire Hazards</span>
                    <span className="text-sm font-medium text-gray-900">15 instances</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
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