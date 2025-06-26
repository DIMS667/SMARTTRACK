// src/pages/SourcesPage/components/WebScraper/components/FilterBar.jsx
import React from 'react';
import { Grid, List, Globe } from 'lucide-react';
import WebsiteTypeSelector from './WebsiteTypeSelector';
import { SORT_OPTIONS, FILTER_OPTIONS, WEBSITE_TYPES } from '../constants';

const FilterBar = ({
  currentUrl,
  filteredCount,
  selectedWebsiteTypes,
  onWebsiteTypeChange,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onClearScraping
}) => {
  const getSelectedTypesLabel = () => {
    if (selectedWebsiteTypes.includes('all')) return 'Tous';
    return selectedWebsiteTypes
      .map(id => WEBSITE_TYPES.find(type => type.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {new URL(currentUrl).hostname}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredCount} résultat{filteredCount > 1 ? 's' : ''} • 
                  Types: {getSelectedTypesLabel()}
                </p>
              </div>
            </div>
            <button
              onClick={onClearScraping}
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium hover:underline"
            >
              Nouveau scrapping
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Sélecteur compact de types de sites web */}
            <WebsiteTypeSelector 
              selectedTypes={selectedWebsiteTypes}
              onTypeChange={onWebsiteTypeChange}
              isCompact={true}
            />

            {/* Filtre par catégorie */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[120px]"
            >
              {FILTER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Tri */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[140px]"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Vue grille/liste */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                title="Vue grille"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                title="Vue liste"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;