import React from 'react';
import ArticleCard from './ArticleCard';

const ArticlesGrid = ({ 
  articles, 
  onToggleRead, 
  onToggleFavorite, 
  onOpenArticle, 
  formatDate,
  onLoadMore 
}) => {
  if (articles.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Aucun article trouvé</h3>
        <p className="text-gray-600 dark:text-gray-400">Essayez de changer les filtres ou ajoutez de nouveaux flux.</p>
      </div>
    );
  }

  return (
    <>
      {/* Grille des articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map(article => (
          <ArticleCard 
            key={article.id}
            article={article}
            onToggleRead={onToggleRead}
            onToggleFavorite={onToggleFavorite}
            onOpenArticle={onOpenArticle}
            formatDate={formatDate}
          />
        ))}
      </div>

      {/* Bouton de chargement */}
      {articles.length > 0 && (
        <div className="text-center">
          <button 
            onClick={onLoadMore}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Charger plus d'articles
          </button>
        </div>
      )}
    </>
  );
};

export default ArticlesGrid;