import { PrismaClient, Permit, PermitStatus, User, UserRole } from "@prisma/client";
import { getSubordinates } from "../company/hierarchy";
import { checkForExpiredPermits } from "./expiration";

const prisma = new PrismaClient();

interface PermitAction {
  type: "APPROVE" | "REJECT" | "SUSPEND" | "COMPLETE" | "CANCEL";
  userId: string;
  permitId: string;
  comment?: string;
}

interface PermitValidation {
  isValid: boolean;
  message: string;
}

export async function createPermit(
  workType: string,
  location: string,
  startDate: Date,
  endDate: Date,
  requesterId: string,
  companyId: string,
  description?: string,
  equipment?: string
): Promise<Permit> {
  const permitNumber = await generatePermitNumber(companyId);
  
  if (endDate < startDate) {
    throw new Error("End date must be after start date");
  }
  
  return prisma.permit.create({
    data: {
      permitNumber,
      workType,
      location,
      startDate,
      endDate,
      status: "DRAFT",
      requesterId,
      companyId,
      description,
      equipment,
    },
  });
}

async function generatePermitNumber(companyId: string): Promise<string> {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { permits: true },
  });

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const permitCount = (company?.permits.length || 0) + 1;
  
  return `PTW-${companyId.slice(0, 4)}-${year}${month}-${String(permitCount).padStart(4, "0")}`;
}

export async function validatePermitAction(action: PermitAction): Promise<PermitValidation> {
  const permit = await prisma.permit.findUnique({
    where: { id: action.permitId },
    include: {
      requester: true,
      approver: true,
      holder: true,
      pic: true,
      company: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: action.userId },
  });

  if (!permit || !user) {
    return { isValid: false, message: "Permit or user not found" };
  }

  // Validate based on action type and user role
  switch (action.type) {
    case "APPROVE":
      return validateApproval(permit, user);
    case "REJECT":
      return validateRejection(permit, user);
    case "SUSPEND":
      return validateSuspension(permit, user);
    case "COMPLETE":
      return validateCompletion(permit, user);
    case "CANCEL":
      return validateCancellation(permit, user);
    default:
      return { isValid: false, message: "Invalid action type" };
  }
}

// Array of roles with approval authority
const APPROVAL_AUTHORITY_ROLES: UserRole[] = [
  UserRole.HSE_LEAD,
  UserRole.ADMIN,
  UserRole.PIC
];

// Array of roles with suspension authority
const SUSPENSION_AUTHORITY_ROLES: UserRole[] = [
  UserRole.HSE_LEAD,
  UserRole.HSE_OFFICER,
  UserRole.HSE_ENGINEER,
  UserRole.ADMIN
];

async function validateApproval(permit: Permit, user: User): Promise<PermitValidation> {
  if (!["PENDING_APPROVAL", "RISK_ASSESSMENT_COMPLETED"].includes(permit.status)) {
    return { isValid: false, message: "Permit is not in an approvable state" };
  }

  if (!APPROVAL_AUTHORITY_ROLES.includes(user.role)) {
    return { isValid: false, message: "User does not have approval authority" };
  }

  return { isValid: true, message: "Valid approval" };
}

async function validateRejection(permit: Permit, user: User): Promise<PermitValidation> {
  if (!["PENDING_APPROVAL", "RISK_ASSESSMENT_COMPLETED"].includes(permit.status)) {
    return { isValid: false, message: "Permit cannot be rejected in its current state" };
  }

  if (!APPROVAL_AUTHORITY_ROLES.includes(user.role)) {
    return { isValid: false, message: "User does not have rejection authority" };
  }

  return { isValid: true, message: "Valid rejection" };
}

async function validateSuspension(permit: Permit, user: User): Promise<PermitValidation> {
  if (permit.status !== "ACTIVE") {
    return { isValid: false, message: "Only active permits can be suspended" };
  }

  if (!SUSPENSION_AUTHORITY_ROLES.includes(user.role)) {
    return { isValid: false, message: "User does not have suspension authority" };
  }

  return { isValid: true, message: "Valid suspension" };
}

async function validateCompletion(permit: Permit, user: User): Promise<PermitValidation> {
  if (permit.status !== "ACTIVE") {
    return { isValid: false, message: "Only active permits can be completed" };
  }

  if (user.id !== permit.holderId && user.id !== permit.picId) {
    return { isValid: false, message: "Only permit holder or PIC can complete the permit" };
  }

  return { isValid: true, message: "Valid completion" };
}

async function validateCancellation(permit: Permit, user: User): Promise<PermitValidation> {
  if (["COMPLETED", "EXPIRED", "CANCELLED"].includes(permit.status)) {
    return { isValid: false, message: "Permit cannot be cancelled in its current state" };
  }

  // Allow cancellation by requester, approver, or higher authority
  if (
    user.id !== permit.requesterId &&
    user.id !== permit.approverId &&
    !APPROVAL_AUTHORITY_ROLES.includes(user.role)
  ) {
    return { isValid: false, message: "User does not have cancellation authority" };
  }

  return { isValid: true, message: "Valid cancellation" };
}

export async function executePermitAction(action: PermitAction): Promise<Permit> {
  const validation = await validatePermitAction(action);
  
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const statusMap = {
    APPROVE: "APPROVED",
    REJECT: "REJECTED",
    SUSPEND: "SUSPENDED",
    COMPLETE: "COMPLETED",
    CANCEL: "CANCELLED",
  } as const;

  return prisma.permit.update({
    where: { id: action.permitId },
    data: {
      status: statusMap[action.type],
      approverId: action.type === "APPROVE" ? action.userId : undefined,
    },
  });
}

export async function getPermitsByRole(userId: string): Promise<Permit[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { company: true },
  });

  if (!user) {
    throw new Error("User not found");
  }
  
  // Handle case where user doesn't belong to a company
  if (!user.companyId) {
    return [];
  }

  const baseQuery = {
    where: {
      companyId: user.companyId,
    },
  };

  switch (user.role) {
    case UserRole.HSE_LEAD:
    case UserRole.ADMIN:
      // Can see all permits in the company
      return prisma.permit.findMany(baseQuery);

    case UserRole.HSE_OFFICER:
    case UserRole.HSE_ENGINEER:
      // Can see permits they're involved with and their subordinates'
      const subordinates = await getSubordinates(userId, true);
      const subordinateIds = subordinates.map(s => s.id);
      
      return prisma.permit.findMany({
        where: {
          companyId: user.companyId,
          OR: [
            { requesterId: { in: [...subordinateIds, userId] } },
            { holderId: { in: [...subordinateIds, userId] } },
            { picId: { in: [...subordinateIds, userId] } },
          ],
        },
      });

    default:
      // Other roles can only see permits they're directly involved with
      return prisma.permit.findMany({
        where: {
          companyId: user.companyId,
          OR: [
            { requesterId: userId },
            { holderId: userId },
            { picId: userId },
            { approverId: userId },
          ],
        },
      });
  }
}

export async function processExpiredPermits(): Promise<void> {
  console.log("Processing expired permits...");
  await checkForExpiredPermits();
  console.log("Expired permit processing complete");
} 