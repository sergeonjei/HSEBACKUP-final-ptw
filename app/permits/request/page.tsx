import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import PermitRequestClientPage from "./client-page";

export default async function PermitRequestPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  // Check if user has permission to request permits
  const allowedRoles = ["PERMIT_REQUESTER", "HSE_ENGINEER", "HSE_OFFICER"];
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/dashboard");
  }

  return <PermitRequestClientPage />;
} 