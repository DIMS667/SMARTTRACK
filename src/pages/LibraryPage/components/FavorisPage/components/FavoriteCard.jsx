import React from 'react';
import Avatar from '@/components/common/Avatar';
import Card from '@/components/common/Card';
import { useTheme } from '@/context/ThemeContext';

const FavoriteCard = ({ 
  article, 
  onRemoveFromFavorites, 
  onOpenArticle, 
  formatDate 
}) => {
  const themeContext = useTheme();
  const { theme } = themeContext || { 
    theme: { 
      primary: 'bg-purple-600', 
      primaryText: 'text-purple-600', 
      primaryLight: 'bg-purple-50' 
    }
  };

  const formatFavoriteDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Ajouté à l'instant";
    if (diffInHours < 24) return `Ajouté il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Ajouté il y a ${diffInDays}j`;
    return `Ajouté le ${date.toLocaleDateString('fr-FR')}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
      <div className="flex gap-4 p-6">
        {/* Image de l'article */}
        <div className="flex-shrink-0">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-24 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onOpenArticle(article)}
          />
        </div>
        
        {/* Contenu */}
        <div className="flex-1 min-w-0">
          {/* Header avec source et date d'ajout */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div 
                className="px-2 py-1 rounded-full text-white text-xs font-medium"
                style={{ backgroundColor: article.feedColor }}
              >
                {article.feedName}
              </div>
              <span className={`px-2 py-1 rounded-md text-xs ${theme.primaryLight} ${theme.primaryText} dark:bg-opacity-20`}>
                {article.category}
              </span>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRemoveFromFavorites(article.id)}
                className="p-2 rounded-full text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                title="Retirer des favoris"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
              
              <button
                onClick={() => onOpenArticle(article)}
                className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Lire l'article"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Titre */}
          <h3 
            onClick={() => onOpenArticle(article)}
            className="text-lg font-semibold mb-2 line-clamp-2 cursor-pointer text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {article.title}
          </h3>
          
          {/* Métadonnées */}
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-2">
              <Avatar 
                src={`https://ui-avatars.com/api/?name=${article.author}&background=random`}
                alt={article.author}
                size="sm"
              />
              <span>{article.author}</span>
            </div>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          
          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {article.excerpt}
          </p>
          
          {/* Footer avec tags et date d'ajout */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  +{article.tags.length - 3}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatFavoriteDate(article.addedToFavoritesAt)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FavoriteCard;