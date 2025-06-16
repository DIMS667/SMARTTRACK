//AutoMarkAsRead.jsx
import React, { useState } from 'react';

const AutoMarkAsRead = ({ onMarkAsReadByAge }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ageOptions = [
    {
      id: 'day',
      label: 'Older than a day',
      labelFr: 'Âgés de plus d\'un jour',
      hours: 24
    },
    {
      id: 'two-days',
      label: 'Older than two days',
      labelFr: 'Âgés de plus de deux jours',
      hours: 48
    },
    {
      id: 'three-days',
      label: 'Older than three days',
      labelFr: 'Âgés de plus de trois jours',
      hours: 72
    },
    {
      id: 'week',
      label: 'Older than a week',
      labelFr: 'Âgés de plus d\'une semaine',
      hours: 168
    },
    {
      id: 'two-weeks',
      label: 'Older than two weeks',
      labelFr: 'Âgés de plus de deux semaines',
      hours: 336
    }
  ];

  const handleMarkAsRead = (option) => {
    onMarkAsReadByAge(option.hours);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-20">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Mark as read articles</h3>
            </div>
            
            {/* Options */}
            <div className="py-2">
              {ageOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleMarkAsRead(option)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <div className="text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{option.labelFr}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AutoMarkAsRead;