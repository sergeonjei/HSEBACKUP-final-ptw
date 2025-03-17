import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface NotificationRequest {
  userId: string;
  title: string;
  message: string;
  type: string;
  linkUrl?: string;
  data?: Record<string, any>;
}

/**
 * Sends a notification to a user
 * In a real application, this could:
 * 1. Store notification in database
 * 2. Send push notification
 * 3. Send email
 * 4. Send in-app notification
 */
export async function sendNotification(notification: NotificationRequest): Promise<void> {
  // Store notification in database
  await prisma.notification.create({
    data: {
      userId: notification.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      linkUrl: notification.linkUrl,
      data: notification.data ? JSON.stringify(notification.data) : null,
      isRead: false,
      createdAt: new Date(),
    },
  });

  // Log notification for debugging
  console.log(`Notification sent to user ${notification.userId}:`, notification.title);

  // You could add code here to send email or push notifications
  // For example:
  // await sendEmail(notification.userId, notification.title, notification.message);
  // await sendPushNotification(notification.userId, notification.title, notification.message);
}

/**
 * Sends a notification to multiple users
 */
export async function sendBulkNotifications(
  userIds: string[],
  notification: Omit<NotificationRequest, "userId">
): Promise<void> {
  // Create notification entries for each user
  await prisma.notification.createMany({
    data: userIds.map(userId => ({
      userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      linkUrl: notification.linkUrl,
      data: notification.data ? JSON.stringify(notification.data) : null,
      isRead: false,
      createdAt: new Date(),
    })),
  });

  // Log notifications for debugging
  console.log(`Bulk notification sent to ${userIds.length} users:`, notification.title);
} 