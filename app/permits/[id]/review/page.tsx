import React from 'react';
import Link from 'next/link';
import { 
  DocumentCheckIcon, 
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// This would typically be fetched from the API using the permit ID
const permitData = {
  id: '12345',
  title: 'Hot Work Permit - Welding on North Tank',
  type: 'HOT_WORK',
  status: 'PENDING_TECHNICAL_REVIEW',
  requestedBy: 'Emily Davis',
  requestedDate: '2023-08-12T09:30:00',
  location: 'Building A, North Process Area',
  startDate: '2023-08-15T08:00:00',
  endDate: '2023-08-15T17:00:00',
  description: 'Welding repairs on the north tank flange. This work involves cutting and welding of steel components.',
  equipment: 'Welding machine, cutting tools, grinder, safety barriers',
  permitHolder: 'Thomas Wilson',
  contactNumber: '+1 (555) 123-4567',
  contractor: 'ABC Welding Services',
  workers: 3,
  hazards: ['FIRE', 'ELECTRICAL', 'MECHANICAL'],
  controlMeasures: 'Fire watch assigned throughout work and 30 minutes after completion. Area cleared of all flammable materials. Fire extinguishers placed at strategic locations. Work area cordoned off.',
  ppe: ['HELMET', 'GLASSES', 'GLOVES', 'FOOTWEAR'],
  emergencyProcedures: 'In case of fire, stop work immediately, call emergency at extension 555, and use fire extinguishers if safe to do so. Emergency assembly point is Parking Lot B.',
  attachments: [
    { 
      id: '1', 
      name: 'Risk Assessment Document.pdf',
      type: 'application/pdf',
      size: '2.4 MB',
      url: '#'
    }
  ]
};

export default function PermitReviewPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">Technical Review</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending Review
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Review permit request for approval
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/dashboard/permits"
              className="btn-secondary"
            >
              Back to Permits
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          {/* Permit Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{permitData.title}</h2>
                <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                  <span className="flex items-center">
                    <DocumentCheckIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {permitData.type.replace(/_/g, ' ')}
                  </span>
                  <span className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1 text-gray-400" />
                    Requested by {permitData.requestedBy}
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(permitData.requestedDate).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  {permitData.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Permit Details */}
          <div className="p-6 space-y-8">
            {/* Location and Timing */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Location & Timing
              </h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500">Work Location</h4>
                  <p className="mt-1 text-sm text-gray-900">{permitData.location}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500">Work Period</h4>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-900">
                      <CalendarIcon className="inline-block h-4 w-4 mr-1 text-gray-400" />
                      Start: {new Date(permitData.startDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-900">
                      <CalendarIcon className="inline-block h-4 w-4 mr-1 text-gray-400" />
                      End: {new Date(permitData.endDate).toLocaleString()}
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
                <p className="mt-1 text-sm text-gray-900">{permitData.description}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Equipment/Tools</h4>
                <p className="mt-1 text-sm text-gray-900">{permitData.equipment}</p>
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
                  <p className="mt-1 text-sm text-gray-900">{permitData.permitHolder}</p>
                  <p className="mt-1 text-sm text-gray-500">{permitData.contactNumber}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500">Company/Contractor</h4>
                  <p className="mt-1 text-sm text-gray-900">{permitData.contractor}</p>
                  <p className="mt-1 text-sm text-gray-500">{permitData.workers} workers</p>
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
                  {permitData.hazards.map((hazard) => (
                    <span 
                      key={hazard}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      {hazard.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Control Measures</h4>
                <p className="mt-1 text-sm text-gray-900">{permitData.controlMeasures}</p>
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
                  {permitData.ppe.map((item) => (
                    <span 
                      key={item}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {item.replace(/_/g, ' ')}
                    </span>
                  ))}
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
                <p className="text-sm text-gray-900">{permitData.emergencyProcedures}</p>
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="divide-y divide-gray-200">
                  {permitData.attachments.map((file) => (
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
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Review Form */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Technical Review</h3>

              <form className="space-y-6">
                <div>
                  <label htmlFor="safety-measures" className="block text-sm font-medium text-gray-700">
                    Are safety measures adequate?
                  </label>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="safety-adequate-yes"
                        name="safety-adequate"
                        type="radio"
                        value="yes"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="safety-adequate-yes" className="ml-3 block text-sm font-medium text-gray-700">
                        Yes, safety measures are adequate
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="safety-adequate-partial"
                        name="safety-adequate"
                        type="radio"
                        value="partial"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="safety-adequate-partial" className="ml-3 block text-sm font-medium text-gray-700">
                        Partially adequate, needs improvements
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="safety-adequate-no"
                        name="safety-adequate"
                        type="radio"
                        value="no"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="safety-adequate-no" className="ml-3 block text-sm font-medium text-gray-700">
                        No, safety measures are inadequate
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="hazard-identification" className="block text-sm font-medium text-gray-700">
                    Are all hazards properly identified?
                  </label>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="hazards-yes"
                        name="hazards-identified"
                        type="radio"
                        value="yes"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="hazards-yes" className="ml-3 block text-sm font-medium text-gray-700">
                        Yes, all hazards are identified
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="hazards-partial"
                        name="hazards-identified"
                        type="radio"
                        value="partial"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="hazards-partial" className="ml-3 block text-sm font-medium text-gray-700">
                        Some hazards are missing
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="hazards-no"
                        name="hazards-identified"
                        type="radio"
                        value="no"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="hazards-no" className="ml-3 block text-sm font-medium text-gray-700">
                        Major hazards are not identified
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="additional-controls" className="block text-sm font-medium text-gray-700">
                    Additional Control Measures Required
                  </label>
                  <textarea
                    id="additional-controls"
                    name="additional-controls"
                    rows={4}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter any additional control measures that should be implemented..."
                  />
                </div>

                <div>
                  <label htmlFor="technical-comments" className="block text-sm font-medium text-gray-700">
                    Technical Review Comments
                  </label>
                  <textarea
                    id="technical-comments"
                    name="technical-comments"
                    rows={4}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Provide technical review comments..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="btn-danger flex items-center"
                  >
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Reject Permit
                  </button>
                  <button
                    type="button"
                    className="btn-secondary flex items-center"
                  >
                    <DocumentCheckIcon className="h-5 w-5 mr-2" />
                    Request Modifications
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Approve Permit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 