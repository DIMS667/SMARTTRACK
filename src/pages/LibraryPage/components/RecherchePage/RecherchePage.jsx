// src/pages/LibraryPage/components/RecherchePage/RecherchePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useArticles } from '../NouveautesPage/hooks/useArticles';
import { useSharedEtiquettes } from '../Etiquettes/hooks/useSharedEtiquettes';
import ArticleModal from '../NouveautesPage/ArticleModal';
import { EtiquetteBadge } from '../Etiquettes';

const RecherchePage = ({ onEtiquetteClick }) => {
  // États pour la recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' ou 'public'
  const [selectedSource, setSelectedSource] = useState('actualites'); // Source par défaut
  const [showAdvanced, setShowAdvanced] = useState(false);

  // États pour les résultats
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Hooks
  const { articles, toggleRead, toggleFavorite, formatDate, updateArticleNote, getArticleNote } = useArticles();
  const { etiquettes, obtenirEtiquettesArticle } = useSharedEtiquettes();

  // Sources disponibles pour les filtres
  const sources = [
    { id: 'actualites', name: 'Fil d\'actualité' },
    { id: 'favorites', name: 'Favoris' },
    { id: 'archives', name: 'Archives' },
    { id: 'etiquettes', name: 'Articles étiquetés' },
    { id: 'tous', name: 'Tous les articles' }
  ];

  // Fonction de recherche
  const performSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    let results = [...articles];
    const query = searchQuery.toLowerCase();

    // Filtrer par source sélectionnée
    switch (selectedSource) {
      case 'favorites':
        results = results.filter(article => article.isFavorite);
        break;
      case 'archives':
        results = results.filter(article => article.isRead);
        break;
      case 'etiquettes':
        results = results.filter(article => {
          const etiquettesArticle = obtenirEtiquettesArticle(article.id);
          return etiquettesArticle.length > 0;
        });
        break;
      case 'actualites':
        results = results.filter(article => !article.isRead);
        break;
      case 'tous':
      default:
        // Tous les articles
        break;
    }

    // Recherche textuelle
    results = results.filter(article => {
      return (
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });

    // Trier par pertinence
    results.sort((a, b) => {
      const queryLower = query;
      const scoreA = (a.title.toLowerCase().includes(queryLower) ? 2 : 0) + 
                    (a.excerpt.toLowerCase().includes(queryLower) ? 1 : 0);
      const scoreB = (b.title.toLowerCase().includes(queryLower) ? 2 : 0) + 
                    (b.excerpt.toLowerCase().includes(queryLower) ? 1 : 0);
      return scoreB - scoreA;
    });

    return results;
  }, [searchQuery, selectedSource, articles, obtenirEtiquettesArticle]);

  // Effectuer la recherche avec débounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      setSearchResults(performSearch);
      setIsSearching(false);
      if (searchQuery.trim()) {
        setHasSearched(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [performSearch, searchQuery]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
    toggleRead(article.id);
  };

  const handleNoteChange = (note) => {
    if (selectedArticle) {
      updateArticleNote(selectedArticle.id, note);
    }
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header - Style similaire à NouveautesPage */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recherche</h1>
              <p className="text-gray-600 dark:text-gray-400">Trouvez rapidement vos articles</p>
            </div>
          </div>

          {/* Onglets de recherche */}
          <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'personal'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  Dans votre compte
                </button>
                <button
                  onClick={() => setActiveTab('public')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'public'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  Dans tous les flux publics
                </button>
              </nav>
            </div>
          </div>

          {/* Barre de recherche - Style cohérent avec FiltersSection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex gap-4 items-center">
              {/* Sélecteur de source */}
              <div className="flex-shrink-0">
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sources.map(source => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Champ de recherche principal */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tapez pour commencer votre recherche..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Bouton recherche avancée */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  showAdvanced 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            </div>

            {/* Filtres avancés (repliables) */}
            {showAdvanced && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Options avancées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Étiquette spécifique
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                      <option value="">Toutes les étiquettes</option>
                      {etiquettes.map(etiquette => (
                        <option key={etiquette.id} value={etiquette.id}>
                          {etiquette.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Période
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                      <option value="">Toutes les dates</option>
                      <option value="today">Aujourd'hui</option>
                      <option value="week">Cette semaine</option>
                      <option value="month">Ce mois</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Résultats - Style similaire aux cartes d'articles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {!hasSearched ? (
              <div className="text-center py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Commencez votre recherche</h3>
                <p className="text-gray-600 dark:text-gray-400">Utilisez la barre de recherche pour trouver vos articles</p>
              </div>
            ) : isSearching ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Recherche en cours...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600 dark:text-gray-400">Essayez avec d'autres mots-clés ou changez les filtres</p>
              </div>
            ) : (
              <>
                {/* Header des résultats */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {searchResults.length} résultat{searchResults.length !== 1 ? 's' : ''} trouvé{searchResults.length !== 1 ? 's' : ''} 
                    {searchQuery.trim() && <span className="font-medium"> pour "{searchQuery}"</span>}
                  </p>
                </div>

                {/* Liste des résultats - Style cards cohérent */}
                <div className="p-6">
                  <div className="space-y-6">
                    {searchResults.map((article) => {
                      const etiquettesArticle = obtenirEtiquettesArticle(article.id);
                      
                      return (
                        <div
                          key={article.id}
                          onClick={() => handleArticleClick(article)}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <div className="flex gap-4">
                            {/* Image */}
                            {article.displayImage && (
                              <div className="flex-shrink-0">
                                <img
                                  src={article.displayImage}
                                  alt={article.title}
                                  className="w-20 h-20 object-cover rounded-lg"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              </div>
                            )}

                            {/* Contenu */}
                            <div className="flex-1 min-w-0">
                              {/* Badge source et métadonnées */}
                              <div className="flex items-center gap-3 mb-2">
                                <div 
                                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                                  style={{ backgroundColor: article.feedColor }}
                                >
                                  {article.feedName}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatDate(article.publishedAt)}
                                </span>
                                {!article.isRead && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                                {article.isFavorite && (
                                  <span className="text-yellow-500">★</span>
                                )}
                              </div>

                              {/* Titre avec surlignage */}
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                {highlightText(article.title, searchQuery)}
                              </h3>

                              {/* Excerpt avec surlignage */}
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                {highlightText(article.excerpt, searchQuery)}
                              </p>

                              {/* Métadonnées */}
                              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span>{article.author}</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                              </div>

                              {/* Étiquettes */}
                              {etiquettesArticle.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {etiquettesArticle.slice(0, 3).map(etiquette => (
                                    <EtiquetteBadge
                                      key={etiquette.id}
                                      etiquette={etiquette}
                                      taille="petit"
                                      onEtiquetteClick={onEtiquetteClick}
                                    />
                                  ))}
                                  {etiquettesArticle.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                      +{etiquettesArticle.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de lecture d'article */}
      <ArticleModal
        article={selectedArticle}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onToggleFavorite={toggleFavorite}
        formatDate={formatDate}
        articleNote={selectedArticle ? getArticleNote(selectedArticle.id) : ''}
        onNoteChange={handleNoteChange}
        onEtiquetteClick={onEtiquetteClick}
      />
    </div>
  );
};

export default RecherchePage;