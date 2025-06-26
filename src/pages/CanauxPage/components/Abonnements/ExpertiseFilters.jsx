// src/pages/CanauxPage/components/Abonnements/ExpertiseFilters.jsx
import React from 'react';
import { useCustomizer } from '@/context/CustomizerContext';

const ExpertiseFilters = ({ expertises, selectedExpertise, setSelectedExpertise, filteredCount }) => {
  const { theme } = useCustomizer();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Filtrer par expertise
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredCount} expert{filteredCount > 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {expertises.map((expertise) => (
          <button
            key={expertise.id}
            onClick={() => setSelectedExpertise(expertise.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedExpertise === expertise.id
                ? `${theme.primary} text-white`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {expertise.name}
            <span className="ml-1 text-xs opacity-75">({expertise.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseFilters;