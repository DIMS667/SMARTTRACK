
import React from 'react';
import Card from '@/components/common/Card'; // ✅ Import par défaut
import Button from '@/components/common/Button'; // ✅ Import par défaut
import { 
  Mail, 
  Users, 
  Calendar, 
  Star, 
  Play, 
  Pause,
  Eye,
  Heart,
  ExternalLink,
  Globe,
  Clock
} from 'lucide-react';

const NewsletterList = ({ 
  newsletters, 
  onSubscribe, 
  onUnsubscribe, 
  onUpdateSettings,
  onMarkAsRead,
  onAddToFavorites,
  onNewsletterClick,
  activeTab 
}) => {
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
      tech: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      business: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      design: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      startup: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      productivity: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      finance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      health: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      news: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      science: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
    };
    return colors[category] || colors.news;
  };

  return (
    <Card>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.id}
            className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${
              newsletter.unreadCount > 0 ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
            }`}
            onClick={() => onNewsletterClick && onNewsletterClick(newsletter)}
          >
            <div className="flex items-center justify-between">
              {/* Left section */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Logo */}
                {newsletter.logo ? (
                  <img
                    src={newsletter.logo}
                    alt={newsletter.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {newsletter.name}
                    </h3>
                    
                    {newsletter.unreadCount > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {newsletter.unreadCount}
                        </span>
                      </div>
                    )}
                    
                    {newsletter.rating && (
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs">{newsletter.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {newsletter.publisher}
                  </p>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                    {newsletter.description}
                  </p>
                  
                  {/* Meta info */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{formatSubscriberCount(newsletter.subscriberCount)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatFrequency(newsletter.frequency)}</span>
                    </div>
                    
                    {newsletter.language && (
                      <div className="flex items-center space-x-1">
                        <Globe className="h-3 w-3" />
                        <span className="uppercase">{newsletter.language}</span>
                      </div>
                    )}
                    
                    {newsletter.lastIssueDate && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(newsletter.lastIssueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Categories */}
                  {newsletter.categories && newsletter.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newsletter.categories.slice(0, 3).map((category) => (
                        <span
                          key={category}
                          className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(category)}`}
                        >
                          {category}
                        </span>
                      ))}
                      {newsletter.categories.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{newsletter.categories.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right section - Actions */}
              <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                {activeTab === 'subscribed' && (
                  <>
                    <Button
                      onClick={() => onMarkAsRead(newsletter.id)}
                      variant="outline"
                      size="sm"
                      className="p-2"
                      title="Marquer comme lu"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      onClick={() => onAddToFavorites(newsletter.id)}
                      variant="outline"
                      size="sm"
                      className="p-2"
                      title="Ajouter aux favoris"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      onClick={() => onUpdateSettings(newsletter.id, { 
                        status: newsletter.status === 'active' ? 'paused' : 'active' 
                      })}
                      variant="outline"
                      size="sm"
                      className="p-2"
                      title={newsletter.status === 'active' ? 'Suspendre' : 'Reprendre'}
                    >
                      {newsletter.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </>
                )}

                {activeTab === 'discover' && !newsletter.isSubscribed && (
                  <Button
                    onClick={() => onSubscribe(newsletter.id)}
                    variant="primary"
                    size="sm"
                  >
                    S'abonner
                  </Button>
                )}

                {newsletter.sampleUrl && (
                  <a
                    href={newsletter.sampleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Voir un aperçu"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NewsletterList;