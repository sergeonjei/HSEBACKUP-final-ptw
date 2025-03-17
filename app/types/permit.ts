import { PermitStatus, RiskLevel, UserRole } from '@prisma/client';

// Extended permit interface for frontend use
export interface ExtendedPermit {
  id: string;
  permitNumber: string;
  workType: string;
  title?: string; // Derived field, not in DB
  location: string;
  startDate: Date;
  endDate: Date;
  status: PermitStatus;
  requesterId: string;
  approverId?: string | null;
  holderId?: string | null;
  picId?: string | null;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string; // Not in DB schema but used in UI
  equipment?: string; // Not in DB schema but used in UI
  contractor?: string; // Not in DB schema but used in UI
  workers?: number; // Not in DB schema but used in UI
  contactNumber?: string; // Not in DB schema but used in UI
  approvalDate?: Date; // Derived from updatedAt when status changes to APPROVED
  reviewDate?: Date; // Derived from updatedAt when risk assessment is reviewed
  
  // Relations
  requester: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  approver?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
  holder?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    contactNumber?: string;
  } | null;
  pic?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
  riskAssessment?: ExtendedRiskAssessment | null;
}

// Extended risk assessment interface for frontend use
export interface ExtendedRiskAssessment {
  id: string;
  permitId: string;
  assessorId: string;
  reviewerId?: string | null;
  riskLevel: RiskLevel;
  hazards: any; // JSON field
  controlMeasures?: string; // Not in DB schema but used in UI
  ppe?: string[] | any; // Not in DB schema but used in UI
  emergencyProcedures?: string; // Not in DB schema but used in UI
  validations?: any[]; // Not in DB schema but used in UI
  attachments?: any[]; // Not in DB schema but used in UI
  history?: any[]; // Not in DB schema but used in UI
  
  // Relations
  assessor: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  reviewer?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
}

// Converter function to transform DB models to UI-friendly format
export function convertToExtendedPermit(permit: any): ExtendedPermit {
  return {
    ...permit,
    title: permit.workType ? `${permit.workType.replace(/_/g, ' ')} Permit - ${permit.location}` : '',
    approvalDate: permit.status === 'APPROVED' ? permit.updatedAt : undefined,
    reviewDate: permit.riskAssessment?.reviewer ? permit.updatedAt : undefined,
    riskAssessment: permit.riskAssessment ? {
      ...permit.riskAssessment,
      hazards: permit.riskAssessment.hazards || [],
      controlMeasures: typeof permit.riskAssessment.hazards === 'object' ? permit.riskAssessment.controls : '',
      ppe: [],
      emergencyProcedures: '',
      validations: [],
      attachments: [],
      history: []
    } : null
  };
} 