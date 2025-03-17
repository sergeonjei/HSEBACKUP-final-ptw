import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: string;
  icon?: ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | 'gray';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  change, 
  icon,
  color = 'blue'
}) => {
  
  // Function to get color classes based on the color prop
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-700';
      case 'green':
        return 'bg-green-50 text-green-700';
      case 'red':
        return 'bg-red-50 text-red-700';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-700';
      case 'purple':
        return 'bg-purple-50 text-purple-700';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-700';
      case 'gray':
        return 'bg-gray-50 text-gray-700';
      default:
        return 'bg-blue-50 text-blue-700';
    }
  };
  
  const iconColorClass = getColorClasses(color);
  
  return (
    <div className="card p-6">
      <div className="flex items-center">
        {icon && (
          <div className={`p-3 rounded-full mr-4 ${iconColorClass}`}>
            {icon}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-600 truncate">
            {title}
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
          {change && (
            <p className="mt-1 text-sm text-gray-500">
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 