// src/pages/SourcesPage/components/GoogleNews/components/EmptyState.jsx
import React from 'react';
import { Newspaper, RefreshCw, Wifi } from 'lucide-react';

const EmptyState = ({ type, onRefresh }) => {
  if (type === 'loading') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 text-white animate-spin" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Chargement des actualités...
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Récupération des dernières nouvelles depuis Google News
        </p>
      </div>
    );
  }

  if (type === 'no-results') {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Newspaper className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Aucune actualité trouvée
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          Aucune actualité ne correspond aux filtres sélectionnés. 
          Essayez de modifier vos critères de recherche.
        </p>
        <button
          onClick={onRefresh}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all font-medium shadow-lg"
        >
          Actualiser
        </button>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Wifi className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Erreur de connexion
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
          Impossible de charger les actualités. Vérifiez votre connexion internet et réessayez.
        </p>
        <button
          onClick={onRefresh}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all font-medium shadow-lg"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return null;
};

export default EmptyState;