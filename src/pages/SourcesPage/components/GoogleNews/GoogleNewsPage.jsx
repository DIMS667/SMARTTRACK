// src/pages/SourcesPage/components/GoogleNews/GoogleNewsPage.jsx
import React, { useState } from 'react';
import { Newspaper, RefreshCw } from 'lucide-react';

// Components
import {
  CategorySelector,
  SearchForm,
  FilterBar,
  TrendingTopics,
  NewsCard,
  EmptyState
} from './components';

// Hooks
import { useGoogleNews, useNewsActions } from './hooks';

// Constants
import { TRENDING_TOPICS } from './constants';

function GoogleNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('fr');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [viewMode, setViewMode] = useState('grid');

  const {
    searchTerm,
    setSearchTerm,
    currentQuery,
    articles,
    setArticles,
    filteredAndSortedArticles,
    isLoading,
    error,
    searchByTopic,
    searchByQuery,
    clearSearch,
    refreshNews
  } = useGoogleNews({
    selectedCategory,
    selectedLocation,
    filterType,
    sortBy
  });

  const {
    handleToggleFavorite,
    handleMarkAsRead
  } = useNewsActions(articles, setArticles);

  const handleTrendingTopicClick = (topic) => {
    setSearchTerm(topic);
    searchByTopic(topic);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              Google Actualités
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Restez informé avec les dernières actualités du monde entier. 
              Sources vérifiées et information en temps réel.
            </p>
          </div>

          {/* Sélecteur de catégories */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Catégories d'actualités
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choisissez les sujets qui vous intéressent
              </p>
            </div>
            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Formulaire de recherche */}
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={searchByQuery}
            isSearching={isLoading}
          />

          {/* Sujets tendances - Affiché seulement quand pas de recherche active */}
          {!currentQuery && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {/* Sujets tendances */}
                </h3>
              </div>
              <TrendingTopics 
                topics={TRENDING_TOPICS}
                onTopicClick={handleTrendingTopicClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Résultats - Affiché seulement quand recherche active */}
      {currentQuery && (
        <div className="bg-gray-50 dark:bg-gray-900">
          {/* Barre de filtres */}
          <FilterBar
            currentQuery={currentQuery}
            filteredCount={filteredAndSortedArticles.length}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            filterType={filterType}
            setFilterType={setFilterType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onClearSearch={clearSearch}
          />

          {/* Liste des articles */}
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <EmptyState
                  type="loading"
                  query={currentQuery}
                />
              ) : filteredAndSortedArticles.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-6'
                }>
                  {filteredAndSortedArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      viewMode={viewMode}
                      onToggleFavorite={handleToggleFavorite}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  type="no-results"
                  query={currentQuery}
                  selectedCategory={selectedCategory}
                  onClearSearch={clearSearch}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleNewsPage;