import { NextResponse } from "next/server";
import { runScheduledTasks } from "@/lib/tasks/scheduled-tasks";

/**
 * This API route can be called by a cron job service (like Vercel Cron or AWS EventBridge)
 * to run scheduled tasks at regular intervals
 * 
 * Example cron schedule: "0 0 * * *" (daily at midnight)
 */
export async function GET(req: Request) {
  try {
    // In production, you would want to add authentication here
    // to ensure only authorized systems can trigger this endpoint
    
    // Run the scheduled tasks
    await runScheduledTasks();
    
    return NextResponse.json({ success: true, message: "Scheduled tasks executed successfully" });
  } catch (error) {
    console.error("Error running scheduled tasks:", error);
    return NextResponse.json(
      { success: false, message: "Error running scheduled tasks", error: String(error) },
      { status: 500 }
    );
  }
}

/**
 * For services that use POST requests (like some webhook services)
 */
export async function POST(req: Request) {
  return GET(req);
} 