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
  XCircleIcon,
  ExclamationTriangleIcon,
  CameraIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';

// This would typically be fetched from the API using the permit ID
const permitData = {
  id: '12345',
  title: 'Hot Work Permit - Welding on North Tank',
  type: 'HOT_WORK',
  status: 'ACTIVE',
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
  safetyChecklist: [
    {
      id: '1',
      question: 'Has the work area been inspected?',
      category: 'PREPARATION'
    },
    {
      id: '2',
      question: 'Are all personnel briefed on emergency procedures?',
      category: 'PREPARATION'
    },
    {
      id: '3',
      question: 'Have all flammable materials been removed from the area?',
      category: 'FIRE_SAFETY'
    },
    {
      id: '4',
      question: 'Are fire extinguishers readily available and in working condition?',
      category: 'FIRE_SAFETY'
    },
    {
      id: '5',
      question: 'Has the area been cordoned off with appropriate barriers?',
      category: 'AREA_CONTROL'
    },
    {
      id: '6',
      question: 'Are all workers wearing required PPE?',
      category: 'PPE'
    },
    {
      id: '7',
      question: 'Is a fire watch person assigned?',
      category: 'FIRE_SAFETY'
    },
    {
      id: '8',
      question: 'Is all equipment inspected and in good working condition?',
      category: 'EQUIPMENT'
    },
    {
      id: '9',
      question: 'Has gas testing been conducted if required?',
      category: 'TESTING'
    },
    {
      id: '10',
      question: 'Are emergency communication systems in place?',
      category: 'EMERGENCY'
    }
  ]
};

export default function PermitValidationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">Permit Validation</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Pre-Work Verification
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Validate safety measures before work begins
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href={`/permits/${params.id}`}
              className="btn-secondary"
            >
              Back to Permit
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
                    Holder: {permitData.permitHolder}
                  </span>
                  <span className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {permitData.location}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {permitData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Validation Form */}
          <div className="p-6 space-y-8">
            {/* Validation Information */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldExclamationIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Validation Instructions</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>Verify that all safety measures are in place and the work area is properly prepared before allowing work to begin. Check each item and provide comments where necessary.</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-8">
              {/* Validation Checklist */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  Safety Checklist Verification
                </h3>
                
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Safety Item</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {permitData.safetyChecklist.map((item) => (
                        <tr key={item.id}>
                          <td className="whitespace-normal py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-start">
                              <div className="ml-1">
                                <div className="font-medium text-gray-900">{item.question}</div>
                                <div className="text-gray-500">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {item.category.replace(/_/g, ' ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <input
                                  id={`compliant-${item.id}`}
                                  name={`status-${item.id}`}
                                  type="radio"
                                  value="compliant"
                                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                />
                                <label htmlFor={`compliant-${item.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                                  Compliant
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id={`non-compliant-${item.id}`}
                                  name={`status-${item.id}`}
                                  type="radio"
                                  value="non-compliant"
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                />
                                <label htmlFor={`non-compliant-${item.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                                  Non-Compliant
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id={`na-${item.id}`}
                                  name={`status-${item.id}`}
                                  type="radio"
                                  value="not-applicable"
                                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                                />
                                <label htmlFor={`na-${item.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                                  N/A
                                </label>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <input
                              type="text"
                              name={`notes-${item.id}`}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Add notes if needed"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Additional Safety Concerns */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  Additional Safety Concerns
                </h3>
                
                <div>
                  <label htmlFor="safety-concerns" className="block text-sm font-medium text-gray-700">
                    Note any additional safety concerns or observations
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="safety-concerns"
                      name="safety-concerns"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Enter any additional safety concerns, observations, or requirements..."
                    />
                  </div>
                </div>
              </div>

              {/* Evidence Upload */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <CameraIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  Photo Evidence
                </h3>
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="photo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload photos</span>
                        <input id="photo-upload" name="photo-upload" type="file" className="sr-only" multiple accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Validation Summary */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Validation Summary</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="validation-decision" className="block text-sm font-medium text-gray-700">
                      Validation Decision
                    </label>
                    <select
                      id="validation-decision"
                      name="validation-decision"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">-- Select Decision --</option>
                      <option value="APPROVED">Approve - Work can proceed</option>
                      <option value="CONDITIONAL">Conditional Approval - With additional requirements</option>
                      <option value="REJECTED">Reject - Safety issues must be addressed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="validation-comments" className="block text-sm font-medium text-gray-700">
                      Validation Comments
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="validation-comments"
                        name="validation-comments"
                        rows={4}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter overall validation comments and recommendations..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="btn-secondary"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="btn-danger flex items-center"
                >
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  Reject Permit
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Complete Validation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 