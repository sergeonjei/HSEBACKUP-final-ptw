import { PermitStatus, RiskLevel, UserRole } from '@prisma/client';

// Activity types for the activity feed
export type ActivityType = 
  | 'PERMIT_CREATED' 
  | 'PERMIT_APPROVED' 
  | 'PERMIT_REJECTED'
  | 'RISK_ASSESSMENT_COMPLETED'
  | 'PERMIT_EXPIRED'
  | 'PERMIT_CLOSED'
  | 'USER_JOINED'
  | 'SYSTEM_UPDATE';

// Activity interface for the activity feed
export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: Date;
  userId: string;
  userName: string;
  entityId?: string;
  entityType?: 'PERMIT' | 'RISK_ASSESSMENT' | 'USER';
}

// Permit interface for the permit card
export interface PermitData {
  id: string;
  title: string;
  type: string;
  status: PermitStatus | string; // Allow string for mock data
  location: string;
  startDate: Date;
  endDate: Date;
  requestedBy: string;
  approvedBy?: string;
}

// Risk assessment interface for the risk assessment card
export interface RiskAssessmentData {
  id: string;
  title: string;
  riskLevel: RiskLevel | string; // Allow string for mock data
  associatedPermitId: string;
  assessedBy: string;
  completedDate: Date;
  status: string;
}

// User interface for user management
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole | string; // Allow string for mock data
  company: string;
}

// Company interface for company management
export interface CompanyData {
  id: string;
  name: string;
  usersCount: number;
  activatedDate: Date;
} 