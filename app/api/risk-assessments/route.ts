import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import * as z from "zod";

const prisma = new PrismaClient();

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

const hazardSchema = z.object({
  type: z.string().min(1),
  description: z.string().min(1),
  consequences: z.string().min(1),
  likelihood: z.number().min(1).max(5),
  severity: z.number().min(1).max(5),
  controlMeasures: z.array(z.string().min(1)),
});

const riskAssessmentSchema = z.object({
  permitId: z.string(),
  hazards: z.array(hazardSchema).min(1),
  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const body = riskAssessmentSchema.parse(json);

    // Check if the user is authorized to create a risk assessment
    const permit = await prisma.permit.findUnique({
      where: { id: body.permitId },
      select: { status: true },
    });

    if (!permit) {
      return new NextResponse("Permit not found", { status: 404 });
    }

    if (permit.status !== "PENDING_RISK_ASSESSMENT") {
      return new NextResponse("Permit is not in the correct state for risk assessment", {
        status: 400,
      });
    }

    const canAssessRisk = ["HSE_LEAD", "HSE_ENGINEER", "HSE_OFFICER"].includes(
      session.user.role
    );

    if (!canAssessRisk) {
      return new NextResponse("Not authorized to create risk assessments", {
        status: 403,
      });
    }

    // Create the risk assessment
    const riskAssessment = await prisma.riskAssessment.create({
      data: {
        permitId: body.permitId,
        assessorId: session.user.id,
        riskLevel: body.riskLevel,
        hazards: body.hazards,
      },
    });

    // Update the permit status
    await prisma.permit.update({
      where: { id: body.permitId },
      data: { status: "RISK_ASSESSMENT_COMPLETED" },
    });

    return NextResponse.json(riskAssessment);
  } catch (error) {
    console.error("Error in risk assessment POST:", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const permitId = searchParams.get("permitId");

    if (!permitId) {
      return new NextResponse("Permit ID is required", { status: 400 });
    }

    const riskAssessment = await prisma.riskAssessment.findUnique({
      where: { permitId },
      include: {
        assessor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!riskAssessment) {
      return new NextResponse("Risk assessment not found", { status: 404 });
    }

    return NextResponse.json(riskAssessment);
  } catch (error) {
    console.error("Error in risk assessment GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 