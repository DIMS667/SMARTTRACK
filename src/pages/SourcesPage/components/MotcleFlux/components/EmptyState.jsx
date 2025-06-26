// src/pages/SourcesPage/components/MotcleFlux/components/EmptyState.jsx
import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

const EmptyState = ({ type, keyword, onClearSearch }) => {
  if (type === 'loading') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 text-white animate-spin" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Recherche en cours...
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Nous analysons des milliers d'articles pour "{keyword}"
        </p>
      </div>
    );
  }

  if (type === 'no-results') {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Aucun article trouvé
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          Aucun article ne correspond au mot-clé "{keyword}". 
          Essayez avec d'autres termes ou explorez nos suggestions.
        </p>
        <button
          onClick={onClearSearch}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-lg"
        >
          Nouvelle recherche
        </button>
      </div>
    );
  }

  return null;
};

export default EmptyState;