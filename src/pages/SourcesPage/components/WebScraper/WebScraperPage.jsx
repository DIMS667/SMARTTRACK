// src/pages/SourcesPage/components/WebScraper/WebScraperPage.jsx
import React, { useState } from 'react';
import { Globe, Zap } from 'lucide-react';

// Components
import {
  WebsiteTypeSelector,
  SearchForm,
  FilterBar,
  PopularWebsites,
  ArticleCard,
  EmptyState
} from './components';

// Hooks
import { useWebScraper, useScrapingActions } from './hooks';

// Constants
import { POPULAR_WEBSITES } from './constants';

function WebScraperPage() {
  const [selectedWebsiteTypes, setSelectedWebsiteTypes] = useState(['all']);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('all');

  const {
    searchTerm,
    setSearchTerm,
    currentUrl,
    articles,
    setArticles,
    isScrapingActive,
    filteredAndSortedArticles,
    performScraping,
    clearScraping
  } = useWebScraper({
    selectedWebsiteTypes,
    sortBy,
    filterCategory
  });

  const {
    handleToggleFavorite,
    handleMarkAsRead,
    handleToggleBookmark
  } = useScrapingActions(articles, setArticles);

  // Gestion des types de sites web
  const handleWebsiteTypeChange = (typeId) => {
    if (typeId === 'all') {
      setSelectedWebsiteTypes(['all']);
    } else {
      setSelectedWebsiteTypes(prev => {
        const newTypes = prev.filter(t => t !== 'all');
        if (newTypes.includes(typeId)) {
          const filtered = newTypes.filter(t => t !== typeId);
          return filtered.length === 0 ? ['all'] : filtered;
        } else {
          return [...newTypes, typeId];
        }
      });
    }
  };

  const handlePopularWebsiteClick = (website) => {
    setSearchTerm(website.url);
    performScraping(website.url);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Header avec thème adaptatif */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              Scrapper de sites web
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Surveillez et extrayez du contenu de vos sites web préférés. 
              Collectez automatiquement les articles et actualités.
            </p>
          </div>

          {/* Sélecteur de types de sites web */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Types de sites web
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sélectionnez les catégories de sites que vous souhaitez surveiller
              </p>
            </div>
            <WebsiteTypeSelector 
              selectedTypes={selectedWebsiteTypes}
              onTypeChange={handleWebsiteTypeChange}
            />
          </div>

          {/* Formulaire de scrapping */}
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onScrape={performScraping}
            isScraping={isScrapingActive}
          />

          {/* Sites populaires - Affiché seulement quand pas de scrapping actif */}
          {!currentUrl && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Sites populaires
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Découvrez des sources d'information fiables et populaires
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {POPULAR_WEBSITES.map((website, index) => (
                  <PopularWebsites
                    key={index}
                    {...website}
                    onClick={handlePopularWebsiteClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Résultats - Affiché seulement quand scrapping actif */}
      {currentUrl && (
        <div className="bg-gray-50 dark:bg-gray-900">
          {/* Barre de filtres */}
          <FilterBar
            currentUrl={currentUrl}
            filteredCount={filteredAndSortedArticles.length}
            selectedWebsiteTypes={selectedWebsiteTypes}
            onWebsiteTypeChange={handleWebsiteTypeChange}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onClearScraping={clearScraping}
          />

          {/* Liste des articles */}
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {isScrapingActive ? (
                <EmptyState
                  type="loading"
                  url={currentUrl}
                />
              ) : filteredAndSortedArticles.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-6'
                }>
                  {filteredAndSortedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      viewMode={viewMode}
                      onToggleFavorite={handleToggleFavorite}
                      onMarkAsRead={handleMarkAsRead}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  type="no-results"
                  url={currentUrl}
                  selectedWebsiteTypes={selectedWebsiteTypes}
                  onClearScraping={clearScraping}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebScraperPage;