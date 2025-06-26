// src/pages/SourcesPage/components/WebScraper/components/ArticleCard.jsx
import React, { useState } from 'react';
import { 
  ExternalLink, 
  Heart, 
  Bookmark, 
  Share2, 
  Eye, 
  MessageSquare, 
  Calendar,
  User,
  Globe,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const ArticleCard = ({ 
  article, 
  viewMode = 'grid', 
  onToggleFavorite, 
  onMarkAsRead, 
  onToggleBookmark 
}) => {
  const [imageError, setImageError] = useState(false);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(article.id);
  };

  const handleMarkAsRead = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onMarkAsRead?.(article.id);
  };

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark?.(article.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url
      });
    } else {
      navigator.clipboard.writeText(article.url);
    }
  };

  const formatDate = (date) => {
    return new Intl.RelativeTimeFormat('fr', { numeric: 'auto' }).format(
      Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600 dark:text-green-400';
    if (confidence >= 0.8) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 0.9) return CheckCircle;
    if (confidence >= 0.8) return AlertCircle;
    return AlertCircle;
  };

  // Vue liste
  if (viewMode === 'list') {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl border ${
        article.isRead ? 'border-gray-200 dark:border-gray-700' : 'border-green-200 dark:border-green-700'
      } hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg overflow-hidden`}>
        <div className="flex gap-4 p-6">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {article.image && !imageError ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-green-600 dark:text-green-400">{article.source}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.scrapedAt)}
                </div>
                {article.scrapingMetadata && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      {React.createElement(getConfidenceIcon(article.scrapingMetadata.confidence), {
                        className: `w-3 h-3 ${getConfidenceColor(article.scrapingMetadata.confidence)}`
                      })}
                      <span className={getConfidenceColor(article.scrapingMetadata.confidence)}>
                        {Math.round(article.scrapingMetadata.confidence * 100)}%
                      </span>
                    </div>
                  </>
                )}
              </div>
              
              {!article.isRead && (
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2" />
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {article.description}
            </p>

            {/* Auteur et stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                {article.author && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {formatNumber(article.engagement?.views || 0)}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {formatNumber(article.engagement?.comments || 0)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-lg transition-colors ${
                    article.isFavorite 
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                  title={article.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  <Heart className={`w-4 h-4 ${article.isFavorite ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleToggleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    article.isBookmarked 
                      ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                  title={article.isBookmarked ? 'Retirer des signets' : 'Ajouter aux signets'}
                >
                  <Bookmark className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  title="Partager"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  title="Ouvrir l'article"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue grille (par défaut)
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border ${
      article.isRead ? 'border-gray-200 dark:border-gray-700' : 'border-green-200 dark:border-green-700'
    } hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group`}>
      
      {/* Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {article.image && !imageError ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Badge non lu */}
        {!article.isRead && (
          <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full shadow-lg" />
        )}

        {/* Badge de confiance */}
        {article.scrapingMetadata && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs shadow-lg">
            {React.createElement(getConfidenceIcon(article.scrapingMetadata.confidence), {
              className: `w-3 h-3 ${getConfidenceColor(article.scrapingMetadata.confidence)}`
            })}
            <span className={getConfidenceColor(article.scrapingMetadata.confidence)}>
              {Math.round(article.scrapingMetadata.confidence * 100)}%
            </span>
          </div>
        )}

        {/* Actions rapides */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
              article.isFavorite 
                ? 'text-red-500 bg-white/90 dark:bg-gray-800/90' 
                : 'text-white bg-black/30 hover:bg-black/50'
            }`}
          >
            <Heart className={`w-4 h-4 ${article.isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
              article.isBookmarked 
                ? 'text-blue-500 bg-white/90 dark:bg-gray-800/90' 
                : 'text-white bg-black/30 hover:bg-black/50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-green-600 dark:text-green-400">{article.source}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(article.scrapedAt)}
            </div>
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-3 hover:text-green-600 dark:hover:text-green-400 transition-colors">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className="truncate max-w-24">{article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(article.engagement?.views || 0)}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              title="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              title="Ouvrir l'article"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;