// src/pages/SourcesPage/components/WebScraper/components/WebsiteTypeSelector.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { WEBSITE_TYPES } from '../constants';

const WebsiteTypeSelector = ({ selectedTypes, onTypeChange, isCompact = false }) => {
  if (isCompact) {
    return (
      <div className="flex flex-wrap gap-2">
        {WEBSITE_TYPES.slice(0, 4).map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTypes.includes(type.id)
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-300 dark:border-green-600'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/10 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <type.icon className="w-4 h-4" />
            {type.name}
          </button>
        ))}
        {WEBSITE_TYPES.length > 4 && (
          <div className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-600">
            +{WEBSITE_TYPES.length - 4}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {WEBSITE_TYPES.map((type) => {
        const isSelected = selectedTypes.includes(type.id);
        const isMultipleSelected = selectedTypes.length > 1 && !selectedTypes.includes('all');

        return (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
              isSelected
                ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-5 ${isSelected ? 'opacity-10' : ''}`} />
            
            <div className="relative">
              <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-1">
                {type.name}
              </h3>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {type.description}
              </p>
              
              <div className="mt-2 text-xs text-green-600 dark:text-green-400 text-center">
                {type.examples}
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  {isMultipleSelected && selectedTypes.length > 1 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                      {selectedTypes.indexOf(type.id) + 1}
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default WebsiteTypeSelector;