// src/pages/SourcesPage/components/GoogleNews/components/NewsCard.jsx
import React, { useState } from 'react';
import { 
  ExternalLink,
  BookOpen,
  MoreVertical,
  Eye,
  Star,
  Share2,
  CheckCircle,
  Zap,
  Clock,
  MapPin
} from 'lucide-react';

// Utils
import { formatTimeAgo, formatNumber, getNewsUrgency } from '../utils/formatters';
import { getCategoryColor } from '../utils/categoryUtils';
import { getLocationFlag } from '../utils/locationUtils';

const NewsCard = ({ article, viewMode = 'grid', onToggleFavorite, onMarkAsRead }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const urgency = getNewsUrgency(article.publishedAt, article.isBreaking);

  const getUrgencyBadge = () => {
    if (article.isBreaking) {
      return (
        <span className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          <Zap className="w-3 h-3" />
          Dernière heure
        </span>
      );
    }
    if (urgency === 'recent') {
      return (
        <span className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          Récent
        </span>
      );
    }
    return null;
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1 ${article.isRead ? 'opacity-75' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-6">
          {/* Image */}
          {article.image && (
            <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-lg">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) => e.target.style.display = 'none'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {getUrgencyBadge() && (
                <div className="absolute top-2 left-2">
                  {getUrgencyBadge()}
                </div>
              )}
            </div>
          )}
          
          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                {article.isVerified && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Vérifié
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {article.sourceFavicon && (
                    <img 
                      src={article.sourceFavicon} 
                      alt={article.source}
                      className="w-4 h-4 rounded-full"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <span className="font-medium">{article.source}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {getLocationFlag(article.location)}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-700 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 py-2 z-20">
                    <button
                      onClick={() => { onToggleFavorite(article.id); setShowMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${article.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      {article.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    </button>
                    <button
                      onClick={() => { onMarkAsRead(article.id); setShowMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      {article.isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={() => { setShowMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Partager
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatNumber(article.engagement.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    {article.engagement.shares}
                  </span>
                </div>
                
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
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

  // Vue grille
  return (
    <div 
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-2 group ${article.isRead ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec overlay */}
      {article.image && (
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges urgence */}
          {getUrgencyBadge() && (
            <div className="absolute top-3 left-3">
              {getUrgencyBadge()}
            </div>
          )}
          
          {/* Boutons overlay */}
          <div className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={() => onToggleFavorite(article.id)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all ${article.isFavorite ? 'bg-yellow-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'}`}
            >
              <Star className={`w-4 h-4 ${article.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Catégorie et vérification */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            {article.isVerified && (
              <span className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                <CheckCircle className="w-3 h-3" />
                Vérifié
              </span>
            )}
          </div>

          {/* Localisation */}
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              <MapPin className="w-3 h-3" />
              {getLocationFlag(article.location)}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {article.sourceFavicon && (
              <img 
                src={article.sourceFavicon} 
                alt={article.source}
                className="w-4 h-4 rounded-full"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <span className="font-medium">{article.source}</span>
            <span>•</span>
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
          {article.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
          {article.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Engagement metrics */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(article.engagement.views)}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="w-3 h-3" />
              {article.engagement.shares}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
              Google News
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onMarkAsRead(article.id)}
              className={`p-2 rounded-lg transition-colors ${article.isRead ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'}`}
              title={article.isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;