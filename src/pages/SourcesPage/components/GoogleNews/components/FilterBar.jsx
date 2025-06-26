// src/pages/SourcesPage/components/GoogleNews/components/FilterBar.jsx
import React from 'react';
import { Grid, List, Globe } from 'lucide-react';
import CategorySelector from './CategorySelector';
import LocationSelector from './LocationSelector';
import { SORT_OPTIONS, FILTER_OPTIONS, NEWS_CATEGORIES } from '../constants';

const FilterBar = ({
  currentQuery,
  filteredCount,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onClearSearch
}) => {
  // Convertir selectedCategory en array si nécessaire
  const selectedCategories = Array.isArray(selectedCategory) ? selectedCategory : [selectedCategory];
  
  const getSelectedCategoriesLabel = () => {
    if (selectedCategories.includes('all')) return 'Toutes';
    return selectedCategories
      .map(id => NEWS_CATEGORIES.find(cat => cat.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentQuery}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredCount} résultat{filteredCount > 1 ? 's' : ''} • 
                  Catégories: {getSelectedCategoriesLabel()}
                </p>
              </div>
            </div>
            <button
              onClick={onClearSearch}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline"
            >
              Nouvelle recherche
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Sélecteur compact de catégories - Dropdown avec toutes les catégories */}
            <div className="relative">
              <details className="group">
                <summary className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
                  Catégories ({selectedCategories.includes('all') ? 'Toutes' : selectedCategories.length})
                  <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  <div className="p-2">
                    {NEWS_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          let newSelection;
                          if (category.id === 'all') {
                            newSelection = ['all'];
                          } else {
                            const filtered = selectedCategories.filter(id => id !== 'all');
                            if (filtered.includes(category.id)) {
                              newSelection = filtered.filter(id => id !== category.id);
                              if (newSelection.length === 0) newSelection = ['all'];
                            } else {
                              newSelection = [...filtered, category.id];
                            }
                          }
                          onCategoryChange(newSelection);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategories.includes(category.id)
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="flex-1 text-left">{category.name}</span>
                        {selectedCategories.includes(category.id) && (
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </details>
            </div>

            {/* Sélecteur de localisation */}
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={onLocationChange}
            />

            {/* Filtre par type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
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
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
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
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                title="Vue grille"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
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