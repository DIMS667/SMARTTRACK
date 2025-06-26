// src/pages/SourcesPage/components/GoogleNews/components/SearchForm.jsx
import React from 'react';
import { Search, RefreshCw, Globe } from 'lucide-react';

const SearchForm = ({ searchTerm, setSearchTerm, onSearch, isSearching }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = searchTerm.trim();
    if (searchValue) {
      onSearch(searchValue);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Recherchez des actualités (ex: technologie, politique, sport, économie...)"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-lg shadow-lg"
            disabled={isSearching}
          />
        </div>
        <button
          type="submit"
          disabled={!searchTerm.trim() || isSearching}
          className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg"
        >
          {isSearching ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          {isSearching ? 'Recherche...' : 'Rechercher'}
        </button>
      </div>
      
      {/* Suggestions de recherche rapide */}
      <div className="max-w-2xl mx-auto mt-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Suggestions :</span>
          {['Technologie', 'Politique', 'Économie', 'Sport', 'Santé', 'Sciences'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setSearchTerm(suggestion);
                onSearch(suggestion);
              }}
              disabled={isSearching}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-600 hover:text-blue-700 dark:hover:text-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default SearchForm;