// src/pages/CanauxPage/components/Collections/CollaborativeCollections.jsx
import React from 'react';
import { Users, Crown, User, MessageSquare, Bell, BellOff } from 'lucide-react';
import Button from '@/components/common/Button';
import { UserAvatar, TagsList } from '../shared';

const CollaborativeCollections = ({ collections, onNotifyToggle, onLeave }) => {
  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-3 w-3 text-yellow-500" />;
      case 'admin':
        return <Users className="h-3 w-3 text-blue-500" />;
      default:
        return <User className="h-3 w-3 text-gray-500" />;
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'owner': return 'Propriétaire';
      case 'admin': return 'Administrateur';
      case 'editor': return 'Éditeur';
      case 'viewer': return 'Lecteur';
      default: return 'Contributeur';
    }
  };

  return (
    <div className="space-y-4">
      {collections.map((collection) => (
        <div key={collection.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {collection.title}
                </h3>
                <div className="flex items-center space-x-1">
                  {getRoleIcon(collection.userRole)}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getRoleLabel(collection.userRole)}
                  </span>
                </div>
                {collection.hasUnreadActivity && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {collection.description}
              </p>
              
              <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>{collection.articlesCount} articles</span>
                <span>Dernière activité: {collection.lastActivity}</span>
                <span>Créé par {collection.owner}</span>
              </div>
              
              <TagsList tags={collection.tags} size="xs" />
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onNotifyToggle(collection.id)}
                className={collection.notifications ? 'text-blue-600' : 'text-gray-400'}
              >
                {collection.notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="ghost">
                <MessageSquare className="h-4 w-4" />
              </Button>
              {collection.userRole !== 'owner' && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onLeave(collection.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Quitter
                </Button>
              )}
            </div>
          </div>
          
          {/* Contributeurs actifs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Contributeurs actifs:</span>
              <div className="flex -space-x-2">
                {collection.activeContributors.slice(0, 5).map((contributor, index) => (
                  <UserAvatar 
                    key={index} 
                    user={contributor} 
                    size="sm" 
                    showVerification={false}
                  />
                ))}
                {collection.activeContributors.length > 5 && (
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                      +{collection.activeContributors.length - 5}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {collection.pendingInvitations > 0 && (
                <span>{collection.pendingInvitations} invitation(s) en attente</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollaborativeCollections;