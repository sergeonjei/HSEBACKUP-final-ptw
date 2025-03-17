import { processExpiredPermits } from "../permits/workflow";

/**
 * Runs all scheduled tasks
 * This can be called from a cron job or other scheduling mechanism
 */
export async function runScheduledTasks(): Promise<void> {
  try {
    console.log("Starting scheduled tasks...");
    
    // Check for expired permits
    await processExpiredPermits();
    
    // Add other scheduled tasks here
    
    console.log("Scheduled tasks completed successfully");
  } catch (error) {
    console.error("Error running scheduled tasks:", error);
    throw error;
  }
}

/**
 * Example implementation for setting up a daily task
 * This can be used in a serverless function or as part of a server process
 */
export function setupDailyTasks(): void {
  // Calculate time until midnight
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const timeUntilMidnight = midnight.getTime() - now.getTime();
  
  // Schedule the first run at midnight
  setTimeout(async () => {
    await runScheduledTasks();
    
    // Then set up a daily interval
    setInterval(async () => {
      await runScheduledTasks();
    }, 24 * 60 * 60 * 1000); // 24 hours
  }, timeUntilMidnight);
  
  console.log(`Scheduled daily tasks to start in ${Math.floor(timeUntilMidnight / 1000 / 60)} minutes`);
} 