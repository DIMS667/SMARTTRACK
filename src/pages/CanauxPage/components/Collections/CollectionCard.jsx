// src/pages/CanauxPage/components/Collections/CollectionCard.jsx
import React from 'react';
import { Eye, Heart, Share2, Users, Lock, Globe, UserPlus } from 'lucide-react';
import Button from '@/components/common/Button';
import { TagsList } from '../shared';

const CollectionCard = ({ collection, onFollow, onLike }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {collection.title}
            </h3>
            {collection.isPublic ? (
              <Globe className="h-4 w-4 text-green-500" />
            ) : (
              <Lock className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {collection.description}
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span>{collection.articlesCount} articles</span>
            <span>Mis à jour il y a {collection.lastUpdated}</span>
            <span className="capitalize">{collection.category}</span>
          </div>
          <TagsList tags={collection.tags} size="xs" />
        </div>
      </div>

      {/* Contributors */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <div className="flex -space-x-2">
            {collection.contributors.slice(0, 3).map((contributor, index) => (
              <div 
                key={index} 
                className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center"
                title={contributor}
              >
                <span className="text-white text-xs font-medium">
                  {contributor.charAt(0)}
                </span>
              </div>
            ))}
            {collection.contributors.length > 3 && (
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                  +{collection.contributors.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!collection.isFollowing ? (
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => onFollow(collection.id)}
            >
              <UserPlus className="h-3 w-3 mr-1" />
              Suivre
            </Button>
          ) : (
            <span className="text-xs text-green-600 dark:text-green-400">
              ✓ Suivi
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onLike(collection.id)}
            className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Heart className="h-4 w-4" />
            <span>{collection.stats.likes}</span>
          </button>
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <Share2 className="h-4 w-4" />
            <span>{collection.stats.shares}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <Eye className="h-4 w-4" />
          <span>{collection.stats.views} vues</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;