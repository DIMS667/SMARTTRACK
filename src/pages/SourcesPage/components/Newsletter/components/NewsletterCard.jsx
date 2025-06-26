import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { 
  Mail, 
  Users, 
  Calendar, 
  Star, 
  Settings, 
  Play, 
  Pause,
  ExternalLink,
  Heart,
  MoreHorizontal,
  Eye,
  Globe,
  Clock
} from 'lucide-react';

const NewsletterCard = ({ 
  newsletter, 
  onSubscribe, 
  onUnsubscribe, 
  onUpdateSettings, 
  onMarkAsRead,
  onAddToFavorites,
  onNewsletterClick,
  activeTab 
}) => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    try {
      await onSubscribe(newsletter.id);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleUnsubscribe = async () => {
    await onUnsubscribe(newsletter.id);
  };

  const handleCardClick = () => {
    if (onNewsletterClick) {
      onNewsletterClick(newsletter);
    }
  };

  const formatSubscriberCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const formatFrequency = (frequency) => {
    const frequencies = {
      daily: 'Quotidienne',
      weekly: 'Hebdomadaire',
      biweekly: 'Bi-hebdomadaire',
      monthly: 'Mensuelle',
      occasional: 'Occasionnelle'
    };
    return frequencies[frequency] || frequency;
  };

  const getCategoryColor = (category) => {
    const colors = {
      tech: 'bg-blue-500 text-white',
      business: 'bg-green-500 text-white',
      design: 'bg-purple-500 text-white',
      marketing: 'bg-pink-500 text-white',
      startup: 'bg-orange-500 text-white',
      productivity: 'bg-indigo-500 text-white',
      finance: 'bg-yellow-500 text-black',
      health: 'bg-red-500 text-white',
      news: 'bg-gray-500 text-white',
      science: 'bg-cyan-500 text-white'
    };
    return colors[category] || colors.news;
  };

  return (
    <Card 
      className={`h-full flex flex-col transition-all duration-200 hover:shadow-lg cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
        newsletter.unreadCount > 0 ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Header avec logo et infos */}
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            {newsletter.logo ? (
              <img
                src={newsletter.logo}
                alt={newsletter.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-white" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">
                {newsletter.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {newsletter.publisher}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {newsletter.rating && (
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{newsletter.rating}</span>
              </div>
            )}
            
            {activeTab === 'subscribed' && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="py-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead(newsletter.id);
                          setShowMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Marquer comme lu</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToFavorites(newsletter.id);
                          setShowMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Ajouter aux favoris</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Indicateur de nouveaux articles */}
        {newsletter.unreadCount > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {newsletter.unreadCount} nouveau{newsletter.unreadCount > 1 ? 'x' : ''}
            </span>
          </div>
        )}

        {/* Description - hauteur fixe pour uniformité */}
        <div className="h-16 mb-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {newsletter.description}
          </p>
        </div>

        {/* Métadonnées en ligne - hauteur fixe */}
        <div className="space-y-3 mb-4 h-16">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <span>{formatSubscriberCount(newsletter.subscriberCount)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{formatFrequency(newsletter.frequency)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            {newsletter.language && (
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{newsletter.language}</span>
              </div>
            )}
            {newsletter.lastIssueDate && (
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{new Date(newsletter.lastIssueDate).toLocaleDateString('fr-FR')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags des catégories - hauteur fixe */}
        <div className="h-8 mb-4">
          {newsletter.categories && newsletter.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {newsletter.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className={`px-2 py-1 text-xs rounded-full font-medium ${getCategoryColor(category)}`}
                >
                  {category}
                </span>
              ))}
              {newsletter.categories.length > 2 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{newsletter.categories.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Section des actions - hauteur fixe */}
      <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700 h-32" onClick={(e) => e.stopPropagation()}>
        {activeTab === 'discover' && !newsletter.isSubscribed && (
          <Button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            variant="primary"
          >
            {isSubscribing ? 'Abonnement...' : 'S\'abonner'}
          </Button>
        )}

        {activeTab === 'subscribed' && newsletter.isSubscribed && (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button
                onClick={() => onUpdateSettings(newsletter.id, { 
                  status: newsletter.status === 'active' ? 'paused' : 'active' 
                })}
                variant="outline"
                size="sm"
                className="flex-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              >
                {newsletter.status === 'active' ? (
                  <div className="flex items-center space-x-2">
                    <Pause className="h-4 w-4" />
                    <span>Suspendre</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Reprendre</span>
                  </div>
                )}
              </Button>
              <Button
                onClick={() => console.log('Open settings for', newsletter.id)}
                variant="outline"
                size="sm"
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={handleUnsubscribe}
              variant="outline"
              size="sm"
              className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Se désabonner
            </Button>
          </div>
        )}

        {/* Liens rapides */}
        <div className="flex items-center justify-between text-sm mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          {newsletter.sampleUrl && (
            <a
              href={newsletter.sampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              <span>Aperçu</span>
            </a>
          )}
          
          {newsletter.websiteUrl && (
            <a
              href={newsletter.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              Site web
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewsletterCard;