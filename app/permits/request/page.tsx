import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";

// Dynamically import the PermitRequestForm with no SSR
const PermitRequestForm = dynamic(
  () => import("@/components/permits/PermitRequestForm"),
  { ssr: false }
);

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

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Request New Permit</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Suspense fallback={<div>Loading form...</div>}>
                <PermitRequestForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 