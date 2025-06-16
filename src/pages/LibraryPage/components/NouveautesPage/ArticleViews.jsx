import React from 'react';
import Avatar from '@/components/common/Avatar';
import Card from '@/components/common/Card';
import { useTheme } from '@/context/ThemeContext';

// Vue Liste compacte
export const ListView = ({ article, onToggleRead, onToggleFavorite, onOpenArticle, formatDate }) => {
  const themeContext = useTheme();
  const { theme } = themeContext || { theme: { primaryText: 'text-purple-600' } };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 p-4">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-16 h-12 object-cover rounded cursor-pointer"
          onClick={() => onOpenArticle(article)}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="px-2 py-0.5 rounded text-white text-xs font-medium"
              style={{ backgroundColor: article.feedColor }}
            >
              {article.feedName}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(article.publishedAt)}
            </span>
          </div>
          <h3 
            onClick={() => onOpenArticle(article)}
            className={`font-medium line-clamp-1 cursor-pointer transition-colors ${
              !article.isRead 
                ? 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {article.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(article.id)}
            className={`p-1.5 rounded transition-colors ${
              article.isFavorite 
                ? 'text-yellow-500' 
                : 'text-gray-400 hover:text-yellow-500'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
          <button
            onClick={() => onToggleRead(article.id)}
            className={`p-1.5 rounded transition-colors ${
              !article.isRead 
                ? 'text-blue-500' 
                : 'text-gray-400 hover:text-blue-500'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

// Vue Expanded
export const ExpandedView = ({ article, onToggleRead, onToggleFavorite, onOpenArticle, formatDate }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex gap-4 p-6">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-32 h-24 object-cover rounded-lg cursor-pointer"
          onClick={() => onOpenArticle(article)}
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="px-2 py-1 rounded-full text-white text-xs font-medium"
              style={{ backgroundColor: article.feedColor }}
            >
              {article.feedName}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {article.author} • {formatDate(article.publishedAt)} • {article.readTime}
            </span>
          </div>
          <h3 
            onClick={() => onOpenArticle(article)}
            className={`text-lg font-semibold mb-2 cursor-pointer transition-colors ${
              !article.isRead 
                ? 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {article.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onToggleFavorite(article.id)}
                className={`p-2 rounded transition-colors ${
                  article.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
              <button
                onClick={() => onToggleRead(article.id)}
                className={`p-2 rounded transition-colors ${
                  !article.isRead ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Vue Colonne
export const ColumnView = ({ article, onToggleRead, onToggleFavorite, onOpenArticle, formatDate }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <img 
        src={article.image} 
        alt={article.title}
        className="w-full h-32 object-cover cursor-pointer"
        onClick={() => onOpenArticle(article)}
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div 
            className="px-2 py-1 rounded text-white text-xs font-medium"
            style={{ backgroundColor: article.feedColor }}
          >
            {article.feedName}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onToggleFavorite(article.id)}
              className={`p-1 rounded transition-colors ${
                article.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
              }`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
            <button
              onClick={() => onToggleRead(article.id)}
              className={`p-1 rounded transition-colors ${
                !article.isRead ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
              }`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
        <h3 
          onClick={() => onOpenArticle(article)}
          className={`font-medium text-sm mb-2 line-clamp-2 cursor-pointer transition-colors ${
            !article.isRead 
              ? 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {article.title}
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {article.author} • {formatDate(article.publishedAt)}
        </div>
      </div>
    </Card>
  );
};

// Vue Magazine
export const MagazineView = ({ article, onToggleRead, onToggleFavorite, onOpenArticle, formatDate }) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
          onClick={() => onOpenArticle(article)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <div 
            className="px-3 py-1 rounded-full text-white text-sm font-medium shadow-lg"
            style={{ backgroundColor: article.feedColor }}
          >
            {article.feedName}
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
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
              !article.isRead 
                ? 'bg-blue-500 text-white' 
                : 'bg-black/20 text-white hover:bg-blue-500'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 
            onClick={() => onOpenArticle(article)}
            className="text-white text-xl font-bold mb-2 cursor-pointer hover:text-blue-300 transition-colors line-clamp-2"
          >
            {article.title}
          </h3>
          <div className="flex items-center text-white/80 text-sm">
            <Avatar 
              src={`https://ui-avatars.com/api/?name=${article.author}&background=random`}
              alt={article.author}
              size="sm"
              className="mr-2"
            />
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};