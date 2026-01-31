// components/HealthScoreCard.jsx
import React from 'react';

const HealthScoreCard = ({ 
  score = 78, 
  title = "HEALTH SCORE", 
  change = "+4", 
  description = "From last period",
  showIcon = false,
  trend = "up" // 'up', 'down', or 'neutral'
}) => {
  
  // Determine colors based on trend
  const getTrendColors = () => {
    switch(trend) {
      case 'up':
        return {
          text: 'text-green-600',
          bg: 'bg-green-50',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'down':
        return {
          text: 'text-red-600',
          bg: 'bg-red-50',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )
        };
      default:
        return {
          text: 'text-gray-600',
          bg: 'bg-gray-50',
          icon: null
        };
    }
  };

  const trendColors = getTrendColors();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {/* Main number with trend indicator */}
      <div className="flex items-end">
        <span className="text-6xl font-bold text-gray-900">
          {score}
        </span>
        
        {/* Trend badge */}
        {change && (
          <div className={`ml-3 mb-2 flex items-center ${trendColors.bg} ${trendColors.text} px-2 py-1 rounded-full`}>
            {trendColors.icon && <span className="mr-1">{trendColors.icon}</span>}
            <span className="text-xs font-semibold">{change}</span>
          </div>
        )}
      </div>

      {/* Title and description */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>

      {/* Optional health icon */}
      {showIcon && (
        <div className="flex justify-end mt-4 text-gray-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HealthScoreCard;