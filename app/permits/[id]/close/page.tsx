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
  ArrowUpTrayIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

// This would typically be fetched from the API using the permit ID
const permitData = {
  id: '12345',
  title: 'Hot Work Permit - Welding on North Tank',
  type: 'HOT_WORK',
  status: 'ACTIVE',
  requestedBy: 'Emily Davis',
  location: 'Building A, North Process Area',
  startDate: '2023-08-15T08:00:00',
  endDate: '2023-08-15T17:00:00',
  description: 'Welding repairs on the north tank flange. This work involves cutting and welding of steel components.',
  permitHolder: 'Thomas Wilson',
};

export default function PermitClosurePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">Permit Closure</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Work Completion
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Verify work completion and close the permit
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

          {/* Closure Form */}
          <div className="p-6 space-y-8">
            {/* Closure Information */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldExclamationIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Permit Closure Information</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>Verify that all work has been completed safely, the area has been cleaned, and all equipment and personnel have been removed. This will permanently close the work permit.</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-8">
              {/* Work Completion */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <FlagIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  Work Completion
                </h3>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="actual-completion-date" className="block text-sm font-medium text-gray-700">
                      Actual Completion Date *
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="actual-completion-date"
                        id="actual-completion-date"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="actual-completion-time" className="block text-sm font-medium text-gray-700">
                      Actual Completion Time *
                    </label>
                    <div className="mt-1">
                      <input
                        type="time"
                        name="actual-completion-time"
                        id="actual-completion-time"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="work-status" className="block text-sm font-medium text-gray-700">
                      Work Status *
                    </label>
                    <select
                      id="work-status"
                      name="work-status"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select work status</option>
                      <option value="COMPLETED">Completed successfully</option>
                      <option value="PARTIALLY_COMPLETED">Partially completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="completion-notes" className="block text-sm font-medium text-gray-700">
                      Completion Notes *
                    </label>
                    <textarea
                      id="completion-notes"
                      name="completion-notes"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Describe the work completion status, any issues encountered, or remaining tasks..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Area Restoration */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  Area Restoration Verification
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="area-cleaned"
                          name="area-cleaned"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="area-cleaned" className="font-medium text-gray-700">Work area has been cleaned</label>
                        <p className="text-gray-500">All debris, waste, and unused materials have been removed</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="equipment-removed"
                          name="equipment-removed"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="equipment-removed" className="font-medium text-gray-700">All equipment has been removed</label>
                        <p className="text-gray-500">Tools, machinery, and temporary equipment have been removed from the site</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="barriers-removed"
                          name="barriers-removed"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="barriers-removed" className="font-medium text-gray-700">Barriers and signs have been removed</label>
                        <p className="text-gray-500">All temporary barriers, warning signs, and access restrictions have been cleared</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="safety-measures"
                          name="safety-measures"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="safety-measures" className="font-medium text-gray-700">Safety measures have been restored</label>
                        <p className="text-gray-500">All fire protection systems, emergency equipment, and safety features are back in service</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="area-inspected"
                          name="area-inspected"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="area-inspected" className="font-medium text-gray-700">Final area inspection completed</label>
                        <p className="text-gray-500">A thorough inspection of the work area has been conducted</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="restoration-notes" className="block text-sm font-medium text-gray-700">
                      Area Restoration Notes
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="restoration-notes"
                        name="restoration-notes"
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Any additional notes about the area restoration..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence Upload */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Evidence Upload</h3>
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload photos</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Sign Off */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Permit Closure Sign-Off</h3>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="closed-by-name" className="block text-sm font-medium text-gray-700">
                      Closed By (Name) *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="closed-by-name"
                        id="closed-by-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="closed-by-position" className="block text-sm font-medium text-gray-700">
                      Position/Role *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="closed-by-position"
                        id="closed-by-position"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="closure-comments" className="block text-sm font-medium text-gray-700">
                      Closure Comments
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="closure-comments"
                        name="closure-comments"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Any final comments regarding the permit closure..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="confirmation"
                      name="confirmation"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="confirmation" className="font-medium text-gray-700">I confirm that all work is complete and the area is safe</label>
                    <p className="text-gray-500">By checking this box, you certify that all work covered by this permit has been completed, the area has been properly restored, and it is safe for normal operations to resume.</p>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Close Permit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 