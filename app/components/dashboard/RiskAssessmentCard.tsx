import React from 'react';
import Link from 'next/link';
import { 
  CalendarIcon, 
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { RiskAssessmentData } from '../../types/dashboard';

interface RiskAssessmentCardProps {
  assessment: RiskAssessmentData;
}

const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({ assessment }) => {
  // Function to determine the CSS class for the risk level badge
  const getRiskLevelClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return 'bg-green-100 text-green-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'CRITICAL':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to determine the CSS class for the status badge
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format dates for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors duration-150">
      <div className="flex justify-between items-start">
        <div>
          <Link 
            href={`/dashboard/risk-assessments/${assessment.id}`}
            className="font-medium text-gray-900 hover:text-indigo-600"
          >
            {assessment.title}
          </Link>
          <div className="mt-1 text-sm text-gray-500 flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelClass(assessment.riskLevel.toString())}`}>
              {typeof assessment.riskLevel === 'string' ? assessment.riskLevel : assessment.riskLevel}
            </span>
            <span className="mx-2">•</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(assessment.status)}`}>
              {assessment.status}
            </span>
          </div>
        </div>
        <div>
          <Link 
            href={`/dashboard/risk-assessments/${assessment.id}`}
            className="text-xs text-indigo-600 hover:text-indigo-900 font-medium"
          >
            View
          </Link>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-500 grid grid-cols-1 gap-1 sm:grid-cols-2">
        <div className="flex items-center">
          <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
          Associated Permit: #{assessment.associatedPermitId}
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
          Completed: {formatDate(assessment.completedDate)}
        </div>
        <div className="flex items-center">
          <UserIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
          Assessed by: {assessment.assessedBy}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentCard; 