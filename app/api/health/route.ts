import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Health check endpoint for monitoring the application status
 * Can be used by monitoring tools and load balancers
 */
export async function GET() {
  const healthcheck = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || "development",
    database: "checking..."
  };

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    healthcheck.database = "connected";
    
    return NextResponse.json(healthcheck, { status: 200 });
  } catch (error) {
    console.error("Health check failed:", error);
    
    healthcheck.status = "error";
    healthcheck.database = "disconnected";
    
    return NextResponse.json(healthcheck, { status: 503 });
  } finally {
    await prisma.$disconnect();
  }
} 