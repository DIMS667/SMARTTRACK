// src/pages/CanauxPage/components/Collections/CollectionFilters.jsx
import React from 'react';
import { Grid, List, Filter } from 'lucide-react';
import { useCustomizer } from '@/context/CustomizerContext';

const CollectionFilters = ({ 
  viewMode, 
  setViewMode, 
  filterVisibility, 
  setFilterVisibility 
}) => {
  const { theme } = useCustomizer();

  const visibilityFilters = [
    { id: 'all', label: 'Toutes' },
    { id: 'public', label: 'Publiques' },
    { id: 'private', label: 'Privées' },
    { id: 'following', label: 'Suivies' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div className="flex space-x-2">
            {visibilityFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterVisibility(filter.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterVisibility === filter.id
                    ? `${theme.primary} text-white`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? `${theme.primary} text-white`
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? `${theme.primary} text-white`
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionFilters;