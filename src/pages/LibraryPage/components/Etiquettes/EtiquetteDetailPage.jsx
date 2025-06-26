// src/pages/LibraryPage/components/Etiquettes/EtiquetteDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useSharedEtiquettes } from './hooks/useSharedEtiquettes';
import { useArticles } from '../NouveautesPage/hooks/useArticles'; // Chemin corrigé
import EtiquetteBadge from './EtiquetteBadge';

const EtiquetteDetailPage = ({ etiquetteId, onBack, onArticleClick }) => {
  const { etiquettes, obtenirArticlesEtiquette } = useSharedEtiquettes();
  const { articles } = useArticles();
  
  const [etiquette, setEtiquette] = useState(null);
  const [articlesAssocies, setArticlesAssocies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'title', 'author'

  useEffect(() => {
    if (etiquetteId) {
      // Trouver l'étiquette
      const etiquetteTrouvee = etiquettes.find(e => e.id === etiquetteId);
      setEtiquette(etiquetteTrouvee);

      if (etiquetteTrouvee) {
        // Obtenir les IDs des articles associés
        const articleIds = obtenirArticlesEtiquette(etiquetteId);
        
        // Filtrer les articles complets
        const articlesFilters = articles.filter(article => 
          articleIds.includes(article.id.toString())
        );

        setArticlesAssocies(articlesFilters);
      }
      
      setLoading(false);
    }
  }, [etiquetteId, etiquettes, articles, obtenirArticlesEtiquette]);

  // Trier les articles
  const articlesTries = [...articlesAssocies].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'recent':
      default:
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!etiquette) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Étiquette introuvable</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour</span>
            </button>
            
            <div className="flex items-center gap-3">
              <EtiquetteBadge etiquette={etiquette} taille="grand" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Articles avec l'étiquette "{etiquette.nom}"
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {articlesAssocies.length} article{articlesAssocies.length !== 1 ? 's' : ''} trouvé{articlesAssocies.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Filtres et tri */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Plus récents</option>
                <option value="title">Titre (A-Z)</option>
                <option value="author">Auteur (A-Z)</option>
              </select>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Créée le {new Date(etiquette.dateCreation).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>

        {/* Liste des articles */}
        {articlesTries.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Aucun article avec cette étiquette
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              L'étiquette a peut-être été créée mais pas encore utilisée
            </p>
          </div>
        ) : (
          <div className="space-y-6 pb-16">
            {articlesTries.map(article => (
              <div
                key={article.id}
                onClick={() => onArticleClick && onArticleClick(article)}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="flex items-start gap-4">
                  {/* Image de l'article */}
                  {article.displayImage && (
                    <div className="flex-shrink-0">
                      <img
                        src={article.displayImage}
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    {/* Header de l'article */}
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="px-2 py-1 rounded-full text-white text-xs font-medium"
                        style={{ backgroundColor: article.feedColor }}
                      >
                        {article.feedName}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {article.category}
                      </span>
                      {article.isRead && (
                        <span className="text-xs text-green-600 dark:text-green-400">
                          ✓ Lu
                        </span>
                      )}
                      {article.isFavorite && (
                        <span className="text-xs text-red-500">
                          ❤️ Favori
                        </span>
                      )}
                    </div>

                    {/* Titre */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Métadonnées */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{formatDate(article.publishedAt)}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EtiquetteDetailPage;