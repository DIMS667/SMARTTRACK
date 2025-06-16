import React from 'react';
import Avatar from '@/components/common/Avatar';
import { useTheme } from '@/context/ThemeContext';

const ArticleCard = ({ article, onToggleRead, onToggleFavorite, onOpenArticle, formatDate }) => {
  const themeContext = useTheme();
  const { theme } = themeContext || { 
    theme: { 
      primary: 'bg-purple-600', 
      primaryText: 'text-purple-600', 
      primaryLight: 'bg-purple-50' 
    }
  };

  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl hover:-translate-y-1 ${
      !article.isRead ? `ring-2 ring-opacity-20` : ''
    }`} style={{ ringColor: !article.isRead ? article.feedColor : 'transparent' }}>
      {/* Image de l'article */}
      <div className="relative overflow-hidden">
        <img 
          src={article.displayImage || article.image} 
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={() => onOpenArticle(article)}
          onError={(e) => {
            // Fallback supplémentaire en cas d'erreur de chargement
            console.log('Image loading error for article:', article.id);
            e.target.src = '/src/assets/undraw_hot-air-balloon_6knx.svg';
          }}
        />
        {/* Badge du flux */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-medium shadow-lg"
          style={{ backgroundColor: article.feedColor }}
        >
          {article.feedName}
        </div>
        
        {/* Actions flottantes */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggleFavorite(article.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              article.isFavorite 
                ? 'bg-yellow-500 text-white' 
                : 'bg-black/20 text-white hover:bg-yellow-500'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
          
          <button
            onClick={() => onToggleRead(article.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              article.isRead 
                ? 'bg-black/20 text-white hover:bg-blue-500' 
                : 'bg-blue-500 text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>

        {/* Indicateur non lu */}
        {!article.isRead && (
          <div 
            className="absolute bottom-3 left-3 w-3 h-3 rounded-full shadow-lg"
            style={{ backgroundColor: article.feedColor }}
          />
        )}
      </div>
      
      {/* Contenu de l'article */}
      <div className="p-6">
        {/* Header avec auteur et date */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar 
            src={`https://ui-avatars.com/api/?name=${article.author}&background=random`}
            alt={article.author}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {article.author}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(article.publishedAt)} • {article.readTime}
            </div>
          </div>
        </div>
        
        {/* Titre */}
        <h3 
          onClick={() => onOpenArticle(article)}
          className={`text-lg font-bold mb-3 line-clamp-2 cursor-pointer transition-colors ${
            !article.isRead 
              ? 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {article.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        {/* Footer avec tags */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 2).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                +{article.tags.length - 2}
              </span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-md ${
            article.category 
              ? `${theme.primaryLight} ${theme.primaryText} dark:bg-opacity-20` 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}>
            {article.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;