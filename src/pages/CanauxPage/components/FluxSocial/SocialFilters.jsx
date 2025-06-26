// src/pages/CanauxPage/components/FluxSocial/SocialFilters.jsx
import React from 'react';
import { Filter, Clock } from 'lucide-react';
import { useCustomizer } from '@/context/CustomizerContext';

const SocialFilters = ({ filters, selectedFilter, setSelectedFilter }) => {
  const { theme } = useCustomizer();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? `${theme.primary} text-white`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Mis à jour il y a 5 min</span>
        </div>
      </div>
    </div>
  );
};

export default SocialFilters;