// src/pages/SourcesPage/components/HashtagFlux/components/ContentTypeSelector.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { contentTypes } from '../constants';

const ContentTypeSelector = ({ selectedTypes, onTypeChange, isCompact = false }) => {
  if (isCompact) {
    return (
      <div className="flex flex-wrap gap-2">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTypes.includes(type.id)
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-300 dark:border-orange-600'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/10 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <type.icon className="w-4 h-4" />
            {type.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {contentTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeChange(type.id)}
          className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTypes.includes(type.id)
              ? 'border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 shadow-lg'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-5 ${selectedTypes.includes(type.id) ? 'opacity-10' : ''}`} />
          
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
            
            {selectedTypes.includes(type.id) && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ContentTypeSelector;