'use client';

import React from 'react';
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the ClientPermitRequestForm with no SSR
const ClientPermitRequestForm = dynamic(
  () => import("@/components/permits/ClientPermitRequestForm"),
  { ssr: false }
);

export default function PermitRequestClientPage() {
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
                <ClientPermitRequestForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 