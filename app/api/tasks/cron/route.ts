import { NextResponse } from "next/server";
import { runScheduledTasks } from "@/lib/tasks/scheduled-tasks";

/**
 * This API route can be called by a cron job service (like Vercel Cron or AWS EventBridge)
 * to run scheduled tasks at regular intervals
 * 
 * Example cron schedule: "0 0 * * *" (daily at midnight)
 * 
 * Security: Protected by API key authentication
 */
export async function GET(req: Request) {
  try {
    // Validate API key
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Missing API key" },
        { status: 401 }
      );
    }
    
    const apiKey = authHeader.split(' ')[1];
    const expectedApiKey = process.env.CRON_API_KEY;
    
    if (!expectedApiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }
    
    // Run the scheduled tasks
    await runScheduledTasks();
    
    return NextResponse.json({ 
      success: true, 
      message: "Scheduled tasks executed successfully",
      timestamp: new Date().toISOString()
    });
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