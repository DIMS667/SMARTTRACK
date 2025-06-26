// src/pages/SourcesPage/components/MotcleFlux/components/SearchForm.jsx
import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

const SearchForm = ({ searchTerm, setSearchTerm, onSearch, isSearching }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Entrez un mot-clé (ex: football, technologie, climat...)"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 text-lg shadow-lg"
            disabled={isSearching}
          />
        </div>
        <button
          type="submit"
          disabled={!searchTerm.trim() || isSearching}
          className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg"
        >
          {isSearching ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          {isSearching ? 'Recherche...' : 'Rechercher'}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;