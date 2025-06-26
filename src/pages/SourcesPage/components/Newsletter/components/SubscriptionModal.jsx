import React, { useState } from 'react';
import Button from '@/components/common/Button'; // ✅ Import par défaut
import { 
  X, 
  Mail, 
  Users, 
  Calendar, 
  Star, 
  ExternalLink,
  Check,
  Globe,
  Clock
} from 'lucide-react';

const SubscriptionModal = ({ newsletter, onClose, onSubscribe }) => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSettings, setSubscriptionSettings] = useState({
    frequency: newsletter?.frequency || 'weekly',
    format: 'html',
    notifications: true
  });

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    try {
      await onSubscribe(newsletter.id, subscriptionSettings);
      onClose();
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const formatSubscriberCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
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

  if (!newsletter) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            S'abonner à la newsletter
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Newsletter Info */}
          <div className="flex items-start space-x-4 mb-6">
            {newsletter.logo ? (
              <img
                src={newsletter.logo}
                alt={newsletter.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-8 w-8 text-white" />
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {newsletter.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {newsletter.publisher}
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{formatSubscriberCount(newsletter.subscriberCount)} abonnés</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{newsletter.frequency}</span>
                </div>
                
                {newsletter.rating && (
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{newsletter.rating}</span>
                  </div>
                )}
                
                {newsletter.language && (
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">{newsletter.language}</span>
                  </div>
                )}
              </div>
              
              {/* Categories */}
              {newsletter.categories && newsletter.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newsletter.categories.map((category) => (
                    <span
                      key={category}
                      className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(category)}`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              À propos de cette newsletter
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {newsletter.description}
            </p>
          </div>

          {/* Subscription Settings */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Paramètres d'abonnement
            </h4>
            
            <div className="space-y-4">
              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fréquence de réception
                </label>
                <select
                  value={subscriptionSettings.frequency}
                  onChange={(e) => setSubscriptionSettings({
                    ...subscriptionSettings,
                    frequency: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="biweekly">Bi-hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      value="html"
                      checked={subscriptionSettings.format === 'html'}
                      onChange={(e) => setSubscriptionSettings({
                        ...subscriptionSettings,
                        format: e.target.value
                      })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">HTML</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Avec images et mise en forme</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      value="text"
                      checked={subscriptionSettings.format === 'text'}
                      onChange={(e) => setSubscriptionSettings({
                        ...subscriptionSettings,
                        format: e.target.value
                      })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Texte</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Texte simple uniquement</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Notifications
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Recevoir une notification pour chaque nouvelle édition
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionSettings.notifications}
                    onChange={(e) => setSubscriptionSettings({
                      ...subscriptionSettings,
                      notifications: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Ce que vous recevrez
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Contenu exclusif et sélectionné avec soin
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Possibilité de se désabonner à tout moment
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Aucune publicité tierce
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Support client réactif
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 text-sm">
              {newsletter.sampleUrl && (
                <a
                  href={newsletter.sampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Voir un exemple</span>
                </a>
              )}
              
              {newsletter.websiteUrl && (
                <a
                  href={newsletter.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Site web</span>
                </a>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              variant="primary"
              className="flex-1"
            >
              {isSubscribing ? 'Abonnement...' : 'S\'abonner maintenant'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;