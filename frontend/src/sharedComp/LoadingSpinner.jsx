import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center space-y-6">
        {/* Modern animated spinner with gradient */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full absolute border-4 border-gray-200"></div>
          <div className="w-20 h-20 rounded-full animate-spin border-4 border-transparent border-t-blue-500 border-r-blue-500 border-b-purple-500 border-l-purple-500"></div>
        </div>

        {/* Brand logo or text (optional) */}
        <div className="text-2xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            GLORY
          </span>
        </div>

        {/* Animated loading text with dots */}
        <div className="flex items-center space-x-1">
          <p className="text-gray-600 text-lg">Loading</p>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Optional progress bar */}
        <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full animate-progress"
            style={{ width: '70%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;