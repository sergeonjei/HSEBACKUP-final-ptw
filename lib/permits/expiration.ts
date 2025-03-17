import { PrismaClient, Permit, PermitStatus, User, UserRole } from "@prisma/client";
import { sendNotification } from "../notifications/sender";

const prisma = new PrismaClient();

/**
 * Changes a permit's expiry date
 * @param permitId The ID of the permit
 * @param newExpiryDate The new expiry date
 * @param userId The ID of the user making the change
 * @returns The updated permit
 */
export async function updatePermitExpiryDate(
  permitId: string,
  newExpiryDate: Date,
  userId: string
): Promise<Permit> {
  // Verify user has permission to update expiry date
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Only permit issuer, HSE Lead, or HSE Engineer can modify expiry date
  const allowedRoles = [UserRole.HSE_LEAD, UserRole.HSE_ENGINEER, UserRole.PIC];
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error("User does not have permission to modify permit expiry date");
  }

  // Update the permit with new expiry date
  const updatedPermit = await prisma.permit.update({
    where: { id: permitId },
    data: {
      endDate: newExpiryDate,
    },
    include: {
      requester: true,
      approver: true,
      holder: true,
      pic: true,
    },
  });

  // Log the expiry date change
  await logPermitActivity({
    permitId: permitId,
    userId: userId,
    action: "EXPIRY_DATE_MODIFIED",
    details: `Permit expiry date changed to ${newExpiryDate.toISOString()}`,
  });

  // Send notifications to relevant stakeholders
  await notifyExpiryDateChange(updatedPermit, user, newExpiryDate);

  return updatedPermit;
}

/**
 * Checks for permits that have expired and updates their status
 * This should be run as a scheduled job (e.g., daily)
 */
export async function checkForExpiredPermits(): Promise<void> {
  const now = new Date();

  // Find active permits that have passed their end date
  const expiredPermits = await prisma.permit.findMany({
    where: {
      status: "ACTIVE",
      endDate: {
        lt: now,
      },
    },
    include: {
      requester: true,
      approver: true,
      holder: true,
      pic: true,
    },
  });

  // Update each expired permit
  for (const permit of expiredPermits) {
    await prisma.permit.update({
      where: { id: permit.id },
      data: {
        status: "EXPIRED",
      },
    });

    // Log the expiration
    await logPermitActivity({
      permitId: permit.id,
      userId: "SYSTEM",
      action: "PERMIT_EXPIRED",
      details: `Permit automatically expired on ${now.toISOString()}`,
    });

    // Send notifications to relevant stakeholders
    await notifyPermitExpired(permit);
  }

  console.log(`Processed ${expiredPermits.length} expired permits`);
}

/**
 * Sends notifications to relevant stakeholders when a permit expires
 */
async function notifyPermitExpired(permit: Permit & { 
  requester: User; 
  approver: User | null; 
  holder: User | null;
  pic: User | null;
}): Promise<void> {
  // Get HSE Leads from the same company
  const hseLeads = await prisma.user.findMany({
    where: {
      companyId: permit.companyId,
      role: UserRole.HSE_LEAD,
    },
  });

  // Get HSE Engineers from the same company
  const hseEngineers = await prisma.user.findMany({
    where: {
      companyId: permit.companyId,
      role: UserRole.HSE_ENGINEER,
    },
  });

  // Define recipients - only the specific roles should receive notifications
  const recipients = [
    ...hseLeads,
    ...hseEngineers,
    permit.requester, // Permit requester
    permit.pic, // Person in charge/issuer
  ].filter(Boolean); // Remove null values

  // Send notifications to each recipient
  for (const recipient of recipients) {
    if (!recipient) continue;

    await sendNotification({
      userId: recipient.id,
      title: "Permit Expired",
      message: `Permit ${permit.permitNumber} has expired.`,
      type: "PERMIT_EXPIRATION",
      linkUrl: `/permits/${permit.id}`,
      data: {
        permitId: permit.id,
        permitNumber: permit.permitNumber,
        expiryDate: permit.endDate.toISOString(),
      },
    });
  }
}

/**
 * Sends notifications when a permit's expiry date is changed
 */
async function notifyExpiryDateChange(
  permit: Permit & { 
    requester: User; 
    approver: User | null; 
    holder: User | null;
    pic: User | null;
  },
  changedBy: User,
  newExpiryDate: Date
): Promise<void> {
  // Define recipients - only the specific roles should receive notifications
  const recipients = [
    permit.requester, // Permit requester
    permit.pic, // Person in charge/issuer
  ].filter(Boolean); // Remove null values

  // Also notify HSE Lead and Engineers
  const additionalRecipients = await prisma.user.findMany({
    where: {
      companyId: permit.companyId,
      role: {
        in: [UserRole.HSE_LEAD, UserRole.HSE_ENGINEER]
      }
    }
  });

  const allRecipients = [...recipients, ...additionalRecipients];

  // Send notifications to each recipient
  for (const recipient of allRecipients) {
    if (!recipient) continue;
    
    // Skip sending notification to the user who made the change
    if (recipient.id === changedBy.id) continue;

    await sendNotification({
      userId: recipient.id,
      title: "Permit Expiry Date Changed",
      message: `The expiry date for permit ${permit.permitNumber} has been changed to ${new Date(newExpiryDate).toLocaleDateString()}.`,
      type: "PERMIT_EXPIRY_CHANGED",
      linkUrl: `/permits/${permit.id}`,
      data: {
        permitId: permit.id,
        permitNumber: permit.permitNumber,
        newExpiryDate: newExpiryDate.toISOString(),
        previousExpiryDate: permit.endDate.toISOString(),
      },
    });
  }
}

/**
 * Logs an activity related to a permit
 */
async function logPermitActivity({
  permitId,
  userId,
  action,
  details,
}: {
  permitId: string;
  userId: string;
  action: string;
  details: string;
}): Promise<void> {
  await prisma.activityLog.create({
    data: {
      entityType: "PERMIT",
      entityId: permitId, 
      action,
      performedById: userId,
      details,
      timestamp: new Date(),
    },
  });
} 