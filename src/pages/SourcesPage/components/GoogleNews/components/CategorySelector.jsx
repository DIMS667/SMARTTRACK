// src/pages/SourcesPage/components/GoogleNews/components/CategorySelector.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { NEWS_CATEGORIES } from '../constants';

const CategorySelector = ({ selectedCategory, onCategoryChange, isCompact = false }) => {
  // Convertir en array si nécessaire pour la sélection multiple
  const selectedCategories = Array.isArray(selectedCategory) ? selectedCategory : [selectedCategory];

  const handleCategoryClick = (categoryId) => {
    // Pour la version non-compacte (page principale), on permet la sélection multiple
    if (!isCompact) {
      let newSelection;
      
      if (categoryId === 'all') {
        newSelection = ['all'];
      } else {
        const filtered = selectedCategories.filter(id => id !== 'all');
        
        if (filtered.includes(categoryId)) {
          // Retirer la catégorie
          newSelection = filtered.filter(id => id !== categoryId);
          if (newSelection.length === 0) {
            newSelection = ['all'];
          }
        } else {
          // Ajouter la catégorie
          newSelection = [...filtered, categoryId];
        }
      }
      
      onCategoryChange(newSelection);
    } else {
      // Pour la version compacte (FilterBar), sélection simple
      onCategoryChange(categoryId);
    }
  };

  if (isCompact) {
    return (
      <div className="flex flex-wrap gap-2">
        {NEWS_CATEGORIES.slice(0, 5).map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategories.includes(category.id)
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-300 dark:border-blue-600'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/10 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </button>
        ))}
        {NEWS_CATEGORIES.length > 5 && (
          <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            +{NEWS_CATEGORIES.length - 5}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {NEWS_CATEGORIES.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        const isMultipleSelected = selectedCategories.length > 1 && !selectedCategories.includes('all');
        
        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
              isSelected
                ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 ${isSelected ? 'opacity-10' : ''}`} />
            
            <div className="relative">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-1">
                {category.name}
              </h3>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {category.description}
              </p>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {isMultipleSelected && selectedCategories.length > 1 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {selectedCategories.indexOf(category.id) + 1}
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

export default CategorySelector;