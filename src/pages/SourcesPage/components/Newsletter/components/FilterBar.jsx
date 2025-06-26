import React from 'react';
import { RotateCcw } from 'lucide-react';
import Button from '@/components/common/Button';

const FilterBar = ({ filters, onFiltersChange, activeTab }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: '',
      frequency: '',
      status: '',
      sortBy: '',
      language: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const categories = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'tech', label: 'Technologie' },
    { value: 'business', label: 'Business' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'startup', label: 'Startup' },
    { value: 'productivity', label: 'Productivité' },
    { value: 'finance', label: 'Finance' },
    { value: 'health', label: 'Santé' },
    { value: 'news', label: 'Actualités' },
    { value: 'science', label: 'Science' }
  ];

  const frequencies = [
    { value: '', label: 'Toutes les fréquences' },
    { value: 'daily', label: 'Quotidienne' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'biweekly', label: 'Bi-hebdomadaire' },
    { value: 'monthly', label: 'Mensuelle' },
    { value: 'occasional', label: 'Occasionnelle' }
  ];

  const languages = [
    { value: '', label: 'Toutes les langues' },
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'Anglais' },
    { value: 'es', label: 'Espagnol' },
    { value: 'de', label: 'Allemand' }
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Catégorie
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Frequency Filter */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Fréquence
          </label>
          <select
            value={filters.frequency}
            onChange={(e) => handleFilterChange('frequency', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {frequencies.map((frequency) => (
              <option key={frequency.value} value={frequency.value}>
                {frequency.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Langue
          </label>
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter (for subscribed tab) */}
        {activeTab === 'subscribed' && (
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Statut
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="paused">En pause</option>
              <option value="unread">Non lues</option>
            </select>
          </div>
        )}

        {/* Sort Filter (for discover tab) */}
        {activeTab === 'discover' && (
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Trier par
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pertinence</option>
              <option value="subscribers">Plus d'abonnés</option>
              <option value="rating">Mieux notées</option>
              <option value="recent">Plus récentes</option>
              <option value="trending">Tendance</option>
            </select>
          </div>
        )}

        {/* Reset Filters */}
        {hasActiveFilters && (
          <div className="flex flex-col justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-gray-600 dark:text-gray-400"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;