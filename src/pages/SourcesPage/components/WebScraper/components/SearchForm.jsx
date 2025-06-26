// src/pages/SourcesPage/components/WebScraper/components/SearchForm.jsx
import React from 'react';
import { Globe, RefreshCw, Zap } from 'lucide-react';

const SearchForm = ({ searchTerm, setSearchTerm, onScrape, isScraping }) => {
  const handleScrape = (e) => {
    e.preventDefault();
    const url = searchTerm.trim();
    if (url) {
      onScrape(url);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const formatUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <form onSubmit={handleScrape} className="mb-8">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Entrez l'URL d'un site web (ex: lemonde.fr, techcrunch.com, bbc.com...)"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 text-lg shadow-lg"
            disabled={isScraping}
          />
        </div>
        <button
          type="submit"
          disabled={!searchTerm.trim() || isScraping}
          className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg"
        >
          {isScraping ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Zap className="w-5 h-5" />
          )}
          {isScraping ? 'Scrapping...' : 'Scrapper'}
        </button>
      </div>
      
      {/* Suggestions de sites populaires */}
      <div className="max-w-2xl mx-auto mt-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Sites populaires :</span>
          {['lemonde.fr', 'bbc.com', 'techcrunch.com', 'reuters.com', 'theguardian.com', 'cnn.com'].map((site) => (
            <button
              key={site}
              type="button"
              onClick={() => {
                const fullUrl = formatUrl(site);
                setSearchTerm(fullUrl);
                onScrape(fullUrl);
              }}
              disabled={isScraping}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-green-100 dark:hover:bg-green-600 hover:text-green-700 dark:hover:text-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {site}
            </button>
          ))}
        </div>
      </div>

      {/* Aide et validation d'URL */}
      {searchTerm && (
        <div className="max-w-2xl mx-auto mt-3">
          <div className="text-sm text-center">
            {isValidUrl(formatUrl(searchTerm)) ? (
              <span className="text-green-600 dark:text-green-400">
                ✓ URL valide : {formatUrl(searchTerm)}
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400">
                ⚠ Format d'URL détecté, sera formaté automatiquement
              </span>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

// ✅ IMPORTANT: Export par défaut
export default SearchForm;