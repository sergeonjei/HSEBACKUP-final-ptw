import { PrismaClient } from "@prisma/client";
import type { RiskLevel, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const riskLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
type RiskLevel = typeof riskLevels[number];

interface HazardIdentification {
  type: string;
  description: string;
  consequences: string[];
  likelihood: number; // 1-5
  severity: number; // 1-5
  controlMeasures: string[];
}

interface RiskAssessmentData {
  permitId: string;
  assessorId: string;
  hazards: HazardIdentification[];
  controls: {
    [hazardType: string]: string[];
  };
  riskLevel: RiskLevel;
}

interface RiskAssessmentWithRelations {
  id: string;
  permitId: string;
  assessorId: string;
  reviewerId: string | null;
  riskLevel: RiskLevel;
  hazards: any;
  createdAt: Date;
  updatedAt: Date;
  permit: {
    permitNumber: string;
    workType: string;
    location: string;
    startDate: Date;
    endDate: Date;
    status: string;
  };
  assessor: {
    name: string | null;
    email: string | null;
  };
  reviewer: {
    name: string | null;
    email: string | null;
  } | null;
}

export async function createRiskAssessment(data: RiskAssessmentData): Promise<RiskAssessmentWithRelations> {
  const { permitId, assessorId, hazards, controls, riskLevel } = data;

  // Validate permit status
  const permit = await prisma.permit.findUnique({
    where: { id: permitId },
  });

  if (!permit || permit.status !== "PENDING_RISK_ASSESSMENT") {
    throw new Error("Invalid permit status for risk assessment");
  }

  // Create risk assessment
  const riskAssessment = await prisma.riskAssessment.create({
    data: {
      permitId,
      assessorId,
      hazards: hazards as any, // JSON field
      controls: controls as any, // JSON field
      riskLevel,
    },
  });

  // Update permit status
  await prisma.permit.update({
    where: { id: permitId },
    data: { status: "RISK_ASSESSMENT_COMPLETED" },
  });

  return riskAssessment;
}

export async function validateRiskAssessment(userId: string, permitId: string) {
  try {
    // Get the user's role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return false;
    }

    // Check if user has the required role
    const canAssessRisk = ['HSE_LEAD', 'HSE_ENGINEER', 'HSE_OFFICER'].includes(user.role as UserRole);
    if (!canAssessRisk) {
      return false;
    }

    // Check if permit exists and is in the correct state
    const permit = await prisma.permit.findUnique({
      where: { id: permitId },
      select: { status: true },
    });

    if (!permit || permit.status !== 'PENDING_RISK_ASSESSMENT') {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating risk assessment:', error);
    return false;
  }
}

export async function calculateRiskLevel(hazards: Array<{
  likelihood: number;
  severity: number;
}>): Promise<RiskLevel> {
  // Calculate the highest risk level from all hazards
  return hazards.reduce<RiskLevel>((highest, hazard) => {
    const riskScore = hazard.likelihood * hazard.severity;
    let current: RiskLevel;

    if (riskScore >= 15) current = 'CRITICAL';
    else if (riskScore >= 10) current = 'HIGH';
    else if (riskScore >= 5) current = 'MEDIUM';
    else current = 'LOW';

    return riskLevels.indexOf(current) > riskLevels.indexOf(highest) ? current : highest;
  }, 'LOW');
}

export async function reviewRiskAssessment(
  riskAssessmentId: string,
  reviewerId: string,
  approved: boolean
): Promise<RiskAssessment> {
  const [reviewer, riskAssessment] = await Promise.all([
    prisma.user.findUnique({ where: { id: reviewerId } }),
    prisma.riskAssessment.findUnique({
      where: { id: riskAssessmentId },
      include: { permit: true },
    }),
  ]);

  if (!reviewer || !riskAssessment) {
    throw new Error("Reviewer or risk assessment not found");
  }

  // Validate reviewer role
  const validReviewerRoles = ["HSE_LEAD", "HSE_MANAGER"];
  if (!validReviewerRoles.includes(reviewer.role)) {
    throw new Error("Unauthorized to review risk assessment");
  }

  // Update risk assessment with reviewer
  const updated = await prisma.riskAssessment.update({
    where: { id: riskAssessmentId },
    data: { reviewerId },
  });

  // Update permit status based on approval
  await prisma.permit.update({
    where: { id: riskAssessment.permitId },
    data: {
      status: approved ? "PENDING_APPROVAL" : "DRAFT",
    },
  });

  return updated;
}

export async function getRiskAssessmentsByRole(userId: string): Promise<RiskAssessmentWithRelations[]> {
  try {
    // Get the user's role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return [];
    }

    // Define the query based on user role
    let query: any = {};

    switch (user.role as UserRole) {
      case 'HSE_LEAD':
      case 'HSE_ENGINEER':
      case 'HSE_OFFICER':
        // These roles can see all risk assessments
        break;
      case 'PERMIT_REQUESTER':
        // Can only see risk assessments for permits they requested
        query = {
          permit: {
            requesterId: userId,
          },
        };
        break;
      case 'PERMIT_HOLDER':
        // Can only see risk assessments for permits they hold
        query = {
          permit: {
            holderId: userId,
          },
        };
        break;
      case 'PIC':
        // Can only see risk assessments for permits where they are PIC
        query = {
          permit: {
            picId: userId,
          },
        };
        break;
      default:
        return [];
    }

    // Get risk assessments with the defined query
    const riskAssessments = await prisma.riskAssessment.findMany({
      where: query,
      include: {
        permit: {
          select: {
            permitNumber: true,
            workType: true,
            location: true,
            startDate: true,
            endDate: true,
            status: true,
          },
        },
        assessor: {
          select: {
            name: true,
            email: true,
          },
        },
        reviewer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return riskAssessments;
  } catch (error) {
    console.error('Error getting risk assessments:', error);
    return [];
  }
} 