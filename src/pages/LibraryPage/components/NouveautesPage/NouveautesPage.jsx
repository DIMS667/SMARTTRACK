//NouveautesPage.jsx - Mis à jour avec navigation étiquettes
import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import ArticleModal from './ArticleModal';
import FeedsSidebar from './FeedsSidebar';
import FiltersSection from './FiltersSection';
import StatsCards from './StatsCards';
import ViewSelector from './ViewSelector';
import AutoMarkAsRead from './AutoMarkAsRead';
import { ListView, ExpandedView, ColumnView, MagazineView } from './ArticleViews';
import { useArticles } from './hooks/useArticles';
import { useFeeds } from './hooks/useFeeds';
import { useFilters } from './hooks/useFilters';
import { useModal } from './hooks/useModal';
import { EtiquetteDetailPage } from '../Etiquettes'; // Import de la page étiquette

const CATEGORIES = ["All", "Technology", "Science", "Society", "Economy", "Space", "Environment"];

const NouveautesPage = () => {
  // État pour la navigation étiquettes
  const [currentView, setCurrentView] = useState('articles'); // 'articles' ou 'etiquette'
  const [selectedEtiquette, setSelectedEtiquette] = useState(null);

  // Custom hooks
  const { 
    articles, 
    toggleRead, 
    toggleFavorite, 
    markAllAsRead, 
    markAsReadByAge,
    formatDate,
    updateArticleNote,
    getArticleNote
  } = useArticles();
  
  const { feeds, showFeedsPanel, closeSidebar, openSidebar } = useFeeds();
  const { selectedArticle, isOpen, openArticle, closeArticle } = useModal(toggleRead);
  
  const {
    selectedCategory,
    selectedFeed,
    sortBy,
    searchQuery,
    feedSearchQuery,
    viewMode,
    setSelectedCategory,
    setSelectedFeed,
    setSortBy,
    setSearchQuery,
    setFeedSearchQuery,
    setViewMode,
    sortedArticles,
    filteredFeeds
  } = useFilters(articles, feeds);

  // Statistiques calculées
  const unreadCount = articles.filter(a => !a.isRead).length;
  const favoritesCount = articles.filter(a => a.isFavorite).length;

  const handleLoadMore = () => {
    // Logique pour charger plus d'articles
    console.log('Charger plus d\'articles...');
  };

  const handleNoteChange = (note) => {
    if (selectedArticle) {
      updateArticleNote(selectedArticle.id, note);
    }
  };

  // Gestion de la navigation vers une étiquette
  const handleEtiquetteClick = (etiquette) => {
    console.log('🏷️ Navigation vers étiquette:', etiquette.nom);
    setSelectedEtiquette(etiquette);
    setCurrentView('etiquette');
  };

  // Retour à la vue articles
  const handleBackToArticles = () => {
    console.log('↩️ Retour à la vue articles');
    setCurrentView('articles');
    setSelectedEtiquette(null);
  };

  // Ouvrir un article depuis la page étiquette
  const handleArticleClickFromEtiquette = (article) => {
    console.log('📰 Ouverture article depuis étiquette:', article.title);
    openArticle(article);
  };

  // Fonction pour rendre l'article selon la vue sélectionnée
  const renderArticleByView = (article) => {
    const commonProps = {
      key: article.id,
      article,
      onToggleRead: toggleRead,
      onToggleFavorite: toggleFavorite,
      onOpenArticle: openArticle,
      formatDate
    };

    switch (viewMode) {
      case 'list':
        return <ListView {...commonProps} />;
      case 'expanded':
        return <ExpandedView {...commonProps} />;
      case 'column':
        return <ColumnView {...commonProps} />;
      case 'magazine':
        return <MagazineView {...commonProps} />;
      default:
        return <ArticleCard {...commonProps} />;
    }
  };

  // Fonction pour obtenir les classes CSS de la grille selon la vue
  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'space-y-2';
      case 'expanded':
        return 'space-y-4';
      case 'column':
        return 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
      case 'magazine':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      default: // cards
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  // Rendu conditionnel selon la vue actuelle
  if (currentView === 'etiquette' && selectedEtiquette) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-auto">
        <EtiquetteDetailPage
          etiquetteId={selectedEtiquette.id}
          onBack={handleBackToArticles}
          onArticleClick={handleArticleClickFromEtiquette}
        />
        
        {/* Modal d'article depuis la page étiquette */}
        <ArticleModal
          article={selectedArticle}
          isOpen={isOpen}
          onClose={closeArticle}
          onToggleFavorite={toggleFavorite}
          formatDate={formatDate}
          articleNote={selectedArticle ? getArticleNote(selectedArticle.id) : ''}
          onNoteChange={handleNoteChange}
          onEtiquetteClick={handleEtiquetteClick} // Permettre navigation entre étiquettes
        />
      </div>
    );
  }

  // Vue normale des articles
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Panel des flux */}
      <FeedsSidebar
        showFeedsPanel={showFeedsPanel}
        onCloseSidebar={closeSidebar}
        feedSearchQuery={feedSearchQuery}
        onFeedSearchChange={setFeedSearchQuery}
        filteredFeeds={filteredFeeds}
        selectedFeed={selectedFeed}
        onFeedSelect={setSelectedFeed}
        articles={articles}
      />

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {!showFeedsPanel && (
                <button
                  onClick={openSidebar}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nouveautés</h1>
                <p className="text-gray-600 dark:text-gray-400">Découvrez les derniers articles de vos flux préférés</p>
              </div>
            </div>
            
            {/* Sélecteur de vue et actions */}
            <div className="flex items-center gap-3">
              <AutoMarkAsRead onMarkAsReadByAge={markAsReadByAge} />
              <ViewSelector 
                viewMode={viewMode} 
                onViewChange={setViewMode} 
              />
            </div>
          </div>

          {/* Filtres et contrôles */}
          <FiltersSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            articles={articles}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onMarkAllAsRead={markAllAsRead}
            unreadCount={unreadCount}
          />

          {/* Statistiques */}
          <StatsCards
            articlesCount={sortedArticles.length}
            unreadCount={unreadCount}
            favoritesCount={favoritesCount}
            feedsCount={feeds.length}
          />

          {/* Grille des articles */}
          <div className={`${getGridClasses()} mb-8`}>
            {sortedArticles.length > 0 ? (
              sortedArticles.map(article => renderArticleByView(article))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Aucun article trouvé</h3>
                <p className="text-gray-600 dark:text-gray-400">Essayez de changer les filtres ou ajoutez de nouveaux flux.</p>
              </div>
            )}
          </div>

          {/* Bouton de chargement */}
          {sortedArticles.length > 0 && (
            <div className="text-center">
              <button 
                onClick={handleLoadMore}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Charger plus d'articles
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de lecture d'article */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isOpen}
        onClose={closeArticle}
        onToggleFavorite={toggleFavorite}
        formatDate={formatDate}
        articleNote={selectedArticle ? getArticleNote(selectedArticle.id) : ''}
        onNoteChange={handleNoteChange}
        onEtiquetteClick={handleEtiquetteClick} // 🎯 Navigation vers étiquettes
      />
    </div>
  );
};

export default NouveautesPage;