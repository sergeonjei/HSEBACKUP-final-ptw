import React from 'react';
import Link from 'next/link';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { PermitData } from '../../types/dashboard';

interface PermitCardProps {
  permit: PermitData;
}

const PermitCard: React.FC<PermitCardProps> = ({ permit }) => {
  // Function to determine the CSS class for the status badge
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
      case 'PENDING_APPROVAL':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
      case 'CLOSED':
        return 'bg-blue-100 text-blue-800';
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-800';
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
            href={`/dashboard/permits/${permit.id}`}
            className="font-medium text-gray-900 hover:text-indigo-600"
          >
            {permit.title}
          </Link>
          <div className="mt-1 text-sm text-gray-500 flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(permit.status)}`}>
              {typeof permit.status === 'string' ? permit.status.replace(/_/g, ' ') : permit.status}
            </span>
            <span className="mx-2">•</span>
            <span>{permit.type.replace(/_/g, ' ')}</span>
          </div>
        </div>
        <div>
          <Link 
            href={`/dashboard/permits/${permit.id}`}
            className="text-xs text-indigo-600 hover:text-indigo-900 font-medium"
          >
            View
          </Link>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-500 grid grid-cols-1 gap-1 sm:grid-cols-2">
        <div className="flex items-center">
          <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
          {permit.location}
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
          {formatDate(permit.startDate)} - {formatDate(permit.endDate)}
        </div>
        <div className="flex items-center">
          <UserIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
          Requested by: {permit.requestedBy}
        </div>
        {permit.approvedBy && (
          <div className="flex items-center">
            <CheckCircleIcon className="h-4 w-4 text-gray-400 mr-1" aria-hidden="true" />
            Approved by: {permit.approvedBy}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermitCard; 