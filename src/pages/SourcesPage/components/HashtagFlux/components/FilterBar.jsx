// src/pages/SourcesPage/components/HashtagFlux/components/FilterBar.jsx
import React from 'react';
import { Hash, Grid, List } from 'lucide-react';
import ContentTypeSelector from './ContentTypeSelector';
import { SORT_OPTIONS, FILTER_OPTIONS, contentTypes } from '../constants';

const FilterBar = ({
  currentHashtag,
  filteredCount,
  selectedContentTypes,
  onContentTypeChange,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onClearSearch
}) => {
  const getSelectedTypesLabel = () => {
    if (selectedContentTypes.includes('all')) return 'Tous';
    return selectedContentTypes
      .map(t => contentTypes.find(ct => ct.id === t)?.name)
      .join(', ');
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentHashtag}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredCount} résultat{filteredCount > 1 ? 's' : ''} • 
                  Types: {getSelectedTypesLabel()}
                </p>
              </div>
            </div>
            <button
              onClick={onClearSearch}
              className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium hover:underline"
            >
              Nouvelle recherche
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Sélecteur compact de types de contenu */}
            <ContentTypeSelector 
              selectedTypes={selectedContentTypes}
              onTypeChange={onContentTypeChange}
              isCompact={true}
            />

            {/* Filtre par catégorie */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[120px]"
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
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[140px]"
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
                className={`p-2 ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                title="Vue grille"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
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