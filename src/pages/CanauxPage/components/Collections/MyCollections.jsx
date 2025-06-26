// src/pages/CanauxPage/components/Collections/MyCollections.jsx
import React from 'react';
import { Edit, Trash2, Share2, Settings, Users, Lock, Globe } from 'lucide-react';
import Button from '@/components/common/Button';
import { TagsList } from '../shared';

const MyCollections = ({ collections, onEdit, onDelete, onShare, onSettings }) => {
  return (
    <div className="space-y-4">
      {collections.map((collection) => (
        <div key={collection.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {collection.title}
                </h3>
                {collection.isPublic ? (
                  <Globe className="h-4 w-4 text-green-500" title="Collection publique" />
                ) : (
                  <Lock className="h-4 w-4 text-gray-500" title="Collection privée" />
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  collection.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {collection.status === 'active' ? 'Actif' : 'Brouillon'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {collection.description}
              </p>
              
              <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>{collection.articlesCount} articles</span>
                <span>{collection.collaborators} collaborateurs</span>
                <span>Créé le {collection.createdAt}</span>
                <span>Modifié il y a {collection.lastModified}</span>
              </div>
              
              <TagsList tags={collection.tags} size="xs" />
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button size="sm" variant="ghost" onClick={() => onEdit(collection.id)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onShare(collection.id)}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onSettings(collection.id)}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(collection.id)} className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Stats rapides */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {collection.stats.views}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Vues</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {collection.stats.likes}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">J'aime</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {collection.stats.shares}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Partages</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {collection.stats.comments}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Commentaires</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCollections;