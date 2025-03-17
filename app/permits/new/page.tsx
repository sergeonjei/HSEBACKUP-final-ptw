import React from 'react';
import Link from 'next/link';
import { 
  DocumentCheckIcon, 
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

export default function NewPermitRequestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Permit Request</h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the form below to request a new work permit
            </p>
          </div>
          <Link
            href="/dashboard/permit-requester"
            className="btn-secondary"
          >
            Cancel
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <form className="space-y-8">
            {/* Permit Type and Title Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <DocumentCheckIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Permit Details
              </h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="permitType" className="block text-sm font-medium text-gray-700">
                    Permit Type *
                  </label>
                  <select
                    id="permitType"
                    name="permitType"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select a permit type</option>
                    <option value="HOT_WORK">Hot Work Permit</option>
                    <option value="CONFINED_SPACE">Confined Space Entry</option>
                    <option value="ELECTRICAL">Electrical Work</option>
                    <option value="EXCAVATION">Excavation</option>
                    <option value="LIFTING">Lifting Operations</option>
                    <option value="WORKING_AT_HEIGHT">Working at Height</option>
                    <option value="OTHER">Other (Specify)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="permitTitle" className="block text-sm font-medium text-gray-700">
                    Permit Title *
                  </label>
                  <input
                    type="text"
                    name="permitTitle"
                    id="permitTitle"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., Welding on North Tank"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location and Timing Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Location & Timing
              </h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Work Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., Building A, Floor 3"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                    Area/Department
                  </label>
                  <select
                    id="area"
                    name="area"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select an area</option>
                    <option value="NORTH_PROCESS">North Process Area</option>
                    <option value="SOUTH_PROCESS">South Process Area</option>
                    <option value="STORAGE">Storage Area</option>
                    <option value="UTILITIES">Utilities</option>
                    <option value="ADMIN">Administration Building</option>
                    <option value="OTHER">Other (Specify)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date & Time *
                  </label>
                  <div className="mt-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                    <input
                      type="time"
                      name="startTime"
                      id="startTime"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date & Time *
                  </label>
                  <div className="mt-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                    <input
                      type="time"
                      name="endTime"
                      id="endTime"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Work Details Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <DocumentCheckIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Work Details
              </h2>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description of Work *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe the work to be performed in detail..."
                  required
                />
              </div>

              <div>
                <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">
                  Equipment/Tools to be Used
                </label>
                <textarea
                  id="equipment"
                  name="equipment"
                  rows={2}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="List all equipment and tools that will be used..."
                />
              </div>
            </div>

            {/* Personnel Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Personnel
              </h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="permitHolder" className="block text-sm font-medium text-gray-700">
                    Permit Holder *
                  </label>
                  <input
                    type="text"
                    name="permitHolder"
                    id="permitHolder"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Name of the person responsible for the work"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Emergency contact number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contractor" className="block text-sm font-medium text-gray-700">
                    Company/Contractor
                  </label>
                  <input
                    type="text"
                    name="contractor"
                    id="contractor"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Company or contractor name (if applicable)"
                  />
                </div>
                
                <div>
                  <label htmlFor="workers" className="block text-sm font-medium text-gray-700">
                    Number of Workers
                  </label>
                  <input
                    type="number"
                    name="workers"
                    id="workers"
                    min="1"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Total number of workers involved"
                  />
                </div>
              </div>
            </div>

            {/* Risk Assessment Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShieldExclamationIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Risk Assessment
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hazards Identified *
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex items-start">
                    <input
                      id="hazard_fire"
                      name="hazards"
                      type="checkbox"
                      value="FIRE"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_fire" className="ml-2 block text-sm text-gray-700">
                      Fire/Explosion
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_electrical"
                      name="hazards"
                      type="checkbox"
                      value="ELECTRICAL"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_electrical" className="ml-2 block text-sm text-gray-700">
                      Electrical
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_chemical"
                      name="hazards"
                      type="checkbox"
                      value="CHEMICAL"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_chemical" className="ml-2 block text-sm text-gray-700">
                      Chemical/Hazardous Materials
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_fall"
                      name="hazards"
                      type="checkbox"
                      value="FALL"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_fall" className="ml-2 block text-sm text-gray-700">
                      Fall from Height
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_confined"
                      name="hazards"
                      type="checkbox"
                      value="CONFINED_SPACE"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_confined" className="ml-2 block text-sm text-gray-700">
                      Confined Space
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_noise"
                      name="hazards"
                      type="checkbox"
                      value="NOISE"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_noise" className="ml-2 block text-sm text-gray-700">
                      Noise
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_mechanical"
                      name="hazards"
                      type="checkbox"
                      value="MECHANICAL"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_mechanical" className="ml-2 block text-sm text-gray-700">
                      Mechanical/Moving Parts
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_pressure"
                      name="hazards"
                      type="checkbox"
                      value="PRESSURE"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_pressure" className="ml-2 block text-sm text-gray-700">
                      Pressure Systems
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="hazard_other"
                      name="hazards"
                      type="checkbox"
                      value="OTHER"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="hazard_other" className="ml-2 block text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="controlMeasures" className="block text-sm font-medium text-gray-700">
                  Control Measures *
                </label>
                <textarea
                  id="controlMeasures"
                  name="controlMeasures"
                  rows={4}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe control measures to mitigate the identified hazards..."
                  required
                />
              </div>

              <div>
                <label htmlFor="riskAssessment" className="block text-sm font-medium text-gray-700">
                  Risk Assessment Document
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PPE Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShieldExclamationIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Personal Protective Equipment (PPE)
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required PPE *
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex items-start">
                    <input
                      id="ppe_helmet"
                      name="ppe"
                      type="checkbox"
                      value="HELMET"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_helmet" className="ml-2 block text-sm text-gray-700">
                      Safety Helmet
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="ppe_glasses"
                      name="ppe"
                      type="checkbox"
                      value="GLASSES"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_glasses" className="ml-2 block text-sm text-gray-700">
                      Safety Glasses
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="ppe_gloves"
                      name="ppe"
                      type="checkbox"
                      value="GLOVES"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_gloves" className="ml-2 block text-sm text-gray-700">
                      Gloves
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="ppe_footwear"
                      name="ppe"
                      type="checkbox"
                      value="FOOTWEAR"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_footwear" className="ml-2 block text-sm text-gray-700">
                      Safety Footwear
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="ppe_harness"
                      name="ppe"
                      type="checkbox"
                      value="HARNESS"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_harness" className="ml-2 block text-sm text-gray-700">
                      Fall Protection Harness
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="ppe_respirator"
                      name="ppe"
                      type="checkbox"
                      value="RESPIRATOR"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_respirator" className="ml-2 block text-sm text-gray-700">
                      Respirator
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="ppe_ear"
                      name="ppe"
                      type="checkbox"
                      value="EAR_PROTECTION"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_ear" className="ml-2 block text-sm text-gray-700">
                      Ear Protection
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="ppe_other"
                      name="ppe"
                      type="checkbox"
                      value="OTHER"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="ppe_other" className="ml-2 block text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShieldExclamationIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Emergency Preparedness
              </h2>
              
              <div>
                <label htmlFor="emergencyProcedures" className="block text-sm font-medium text-gray-700">
                  Emergency Procedures *
                </label>
                <textarea
                  id="emergencyProcedures"
                  name="emergencyProcedures"
                  rows={3}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe emergency procedures relevant to this work..."
                  required
                />
              </div>
            </div>

            {/* Declaration Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Declaration</h2>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="declaration"
                    name="declaration"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="declaration" className="font-medium text-gray-700">
                    I declare that the information provided is correct to the best of my knowledge
                  </label>
                  <p className="text-gray-500">
                    By checking this box, you certify that all information provided is accurate and all safety measures will be followed.
                  </p>
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
                type="submit"
                className="btn-primary"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 