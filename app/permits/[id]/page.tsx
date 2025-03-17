'use client';

import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import RiskAssessmentForm from "@/components/permits/RiskAssessmentForm";
import type { PermitStatus } from "@prisma/client";
import { ExtendedPermit, convertToExtendedPermit } from "@/app/types/permit";
import Link from 'next/link';
import { 
  DocumentCheckIcon, 
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  ShieldExclamationIcon,
  ClipboardDocumentCheckIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

async function getPermitDetails(id: string): Promise<ExtendedPermit> {
  const permit = await prisma.permit.findUnique({
    where: { id },
    include: {
      requester: true,
      approver: true,
      holder: true,
      pic: true,
      riskAssessment: {
        include: {
          assessor: true,
          reviewer: true,
        },
      },
    },
  });
  
  if (!permit) {
    throw new Error("Permit not found");
  }
  
  return convertToExtendedPermit(permit);
}

interface PermitDetailsProps {
  params: {
    id: string;
  };
}

export default async function PermitDetailsPage({ params }: PermitDetailsProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const permit = await getPermitDetails(params.id);

  if (!permit) {
    redirect("/permits");
  }

  const canAssessRisk = ["HSE_LEAD", "HSE_ENGINEER", "HSE_OFFICER"].includes(
    session.user.role as string
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">Permit Details</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(permit.status)}`}>
                {permit.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Permit #{permit.permitNumber}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="btn-white flex items-center"
            >
              <PrinterIcon className="h-5 w-5 mr-2" />
              Print
            </button>
            {canAssessRisk && permit.status === 'ACTIVE' && (
              <Link
                href={`/permits/${params.id}/validate`}
                className="btn-primary"
              >
                Validate Permit
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          {/* Permit Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{permit.title}</h2>
                <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                  <span className="flex items-center">
                    <DocumentCheckIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {permit.workType.replace(/_/g, ' ')}
                  </span>
                  <span className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1 text-gray-400" />
                    Requested by {permit.requester.name}
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(permit.startDate).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(permit.status)}`}>
                  {permit.status}
                </span>
              </div>
            </div>
          </div>

          {/* Permit Details */}
          <div className="p-6 space-y-8">
            {/* Approval Information (if approved) */}
            {permit.approver && permit.approvalDate && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Approved Permit</h3>
                    <div className="mt-1 text-sm text-green-700">
                      <p>Approved by {permit.approver.name} on {new Date(permit.approvalDate).toLocaleString()}</p>
                      {permit.riskAssessment && permit.riskAssessment.reviewer && permit.reviewDate && (
                        <p className="mt-1">Technical review by {permit.riskAssessment.reviewer.name} on {new Date(permit.reviewDate).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location and Timing */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Location & Timing
              </h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500">Work Location</h4>
                  <p className="mt-1 text-sm text-gray-900">{permit.location}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500">Work Period</h4>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-900">
                      <CalendarIcon className="inline-block h-4 w-4 mr-1 text-gray-400" />
                      Start: {new Date(permit.startDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-900">
                      <CalendarIcon className="inline-block h-4 w-4 mr-1 text-gray-400" />
                      End: {new Date(permit.endDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <DocumentCheckIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Work Details
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Description of Work</h4>
                <p className="mt-1 text-sm text-gray-900">{permit.description}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Equipment/Tools</h4>
                <p className="mt-1 text-sm text-gray-900">{permit.equipment}</p>
              </div>
            </div>

            {/* Personnel */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Personnel
              </h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500">Permit Holder</h4>
                  {permit.holder && (
                    <p className="mt-1 text-sm text-gray-900">{permit.holder.name}</p>
                  )}
                  {permit.holder && permit.holder.contactNumber && (
                    <p className="mt-1 text-sm text-gray-500">{permit.holder.contactNumber}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500">Company/Contractor</h4>
                  <p className="mt-1 text-sm text-gray-900">{permit.contractor}</p>
                  <p className="mt-1 text-sm text-gray-500">{permit.workers} workers</p>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ShieldExclamationIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Risk Assessment
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Hazards Identified</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {permit.riskAssessment?.hazards && Array.isArray(permit.riskAssessment.hazards) && (
                    permit.riskAssessment.hazards.map((hazard: any, index: number) => (
                      <span 
                        key={hazard.type || hazard.id || index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        {typeof hazard === 'string' ? hazard.replace(/_/g, ' ') : hazard.name || 'Unknown Hazard'}
                      </span>
                    ))
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Control Measures</h4>
                <p className="mt-1 text-sm text-gray-900">{permit.riskAssessment?.controlMeasures}</p>
              </div>
            </div>

            {/* PPE */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ShieldExclamationIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Personal Protective Equipment (PPE)
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Required PPE</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {permit.riskAssessment?.ppe && Array.isArray(permit.riskAssessment.ppe) && (
                    permit.riskAssessment.ppe.map((item: any, index: number) => (
                      <span 
                        key={item.type || item.id || index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {typeof item === 'string' ? item.replace(/_/g, ' ') : item.name || 'Unknown PPE'}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Procedures */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ShieldExclamationIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Emergency Procedures
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900">{permit.riskAssessment?.emergencyProcedures}</p>
              </div>
            </div>

            {/* Validations */}
            {permit.riskAssessment?.validations && permit.riskAssessment.validations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  Field Validations
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="divide-y divide-gray-200">
                    {permit.riskAssessment.validations.map((validation) => (
                      <li key={validation.id} className="py-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="p-1 rounded-full bg-green-100">
                              <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                {validation.type.replace(/_/g, ' ')} Validation
                              </p>
                              <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800">
                                {validation.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Validated by {validation.validator} on {new Date(validation.validationDate).toLocaleString()}
                            </p>
                            <p className="mt-1 text-sm text-gray-700">
                              {validation.comments}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Attachments */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="divide-y divide-gray-200">
                  {permit.riskAssessment?.attachments && Array.isArray(permit.riskAssessment.attachments) && (
                    permit.riskAssessment.attachments.map((file: any) => (
                      <li key={file.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <DocumentCheckIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{file.size}</span>
                          <a 
                            href={file.url} 
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {/* Permit History */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Permit History
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <ol className="relative border-l border-gray-200 ml-3 space-y-4">
                  {permit.riskAssessment?.history && Array.isArray(permit.riskAssessment.history) && (
                    permit.riskAssessment.history.map((event: any, index: number) => (
                      <li key={index} className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -left-3 ring-8 ring-white">
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        </span>
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{event.action.replace(/_/g, ' ')}</h4>
                            <time className="block mb-1 text-xs font-normal leading-none text-gray-500">
                              {new Date(event.date).toLocaleString()}
                            </time>
                            <p className="text-sm text-gray-700">
                              {event.details} - by {event.by}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        {permit.status === 'ACTIVE' && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="btn-white"
            >
              Extend Permit
            </button>
            <button
              type="button"
              className="btn-danger"
            >
              Suspend Permit
            </button>
            <button
              type="button"
              className="btn-primary"
            >
              Close Permit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800';
    case 'PENDING_APPROVAL':
    case 'PENDING_RISK_ASSESSMENT':
      return 'bg-yellow-100 text-yellow-800';
    case 'APPROVED':
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'REJECTED':
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'SUSPENDED':
      return 'bg-orange-100 text-orange-800';
    case 'COMPLETED':
      return 'bg-blue-100 text-blue-800';
    case 'EXPIRED':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getRiskLevelColor(level: string): string {
  const colors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-orange-100 text-orange-800",
    CRITICAL: "bg-red-100 text-red-800",
  };
  return colors[level as keyof typeof colors] || colors.LOW;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
} 