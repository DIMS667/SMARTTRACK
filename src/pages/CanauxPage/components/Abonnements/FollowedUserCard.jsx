// src/pages/CanauxPage/components/Abonnements/FollowedUserCard.jsx
import React from 'react';
import { Bell, UserMinus, Check } from 'lucide-react';
import Button from '@/components/common/Button';

const FollowedUserCard = ({ user, expertises, onUnfollow, onNotifyToggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {user.name.charAt(0)}
            </span>
          </div>
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h4>
                {user.isVerified && (
                  <span className="text-blue-500 text-sm">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.role}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{user.followers.toLocaleString()} abonnés</span>
                <span>{user.posts} publications</span>
                <span>Actif il y a {user.lastActivity}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {user.expertise.map((exp) => {
                  const expertise = expertises.find(e => e.id === exp);
                  return expertise ? (
                    <span
                      key={exp}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                    >
                      {expertise.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onNotifyToggle(user.id)}
              >
                <Bell className="h-4 w-4 mr-1" />
                Notifier
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => onUnfollow(user.id)}
              >
                <UserMinus className="h-4 w-4 mr-1" />
                Ne plus suivre
              </Button>
            </div>
          </div>
          
          {/* Dernière activité */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                user.recentPost.type === 'article' ? 'bg-green-500' :
                user.recentPost.type === 'discussion' ? 'bg-blue-500' : 'bg-purple-500'
              }`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                Dernier {user.recentPost.type}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {user.recentPost.engagement} interactions
              </span>
            </div>
            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
              {user.recentPost.title}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowedUserCard;