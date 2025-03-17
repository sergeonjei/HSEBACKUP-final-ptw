import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createPermit } from "@/lib/permits/workflow";
import { z } from "zod";

const permitRequestSchema = z.object({
  workType: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = permitRequestSchema.parse(json);

    const permit = await createPermit(
      body.workType,
      body.location,
      new Date(body.startDate),
      new Date(body.endDate),
      session.user.id,
      session.user.companyId
    );

    return NextResponse.json(permit);
  } catch (error) {
    console.error("[PERMIT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Get permits based on user role and filters
    const permits = await getPermitsByRole(session.user.id);

    return NextResponse.json(permits);
  } catch (error) {
    console.error("[PERMIT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 