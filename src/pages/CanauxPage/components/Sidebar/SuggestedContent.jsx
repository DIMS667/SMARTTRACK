// src/pages/CanauxPage/components/Sidebar/SuggestedContent.jsx
import React from 'react';
import { UserPlus } from 'lucide-react';
import Button from '@/components/common/Button';

const SuggestedContent = ({ suggestedUsers, popularCollections }) => {
  return (
    <>
      {/* Utilisateurs suggérés */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Experts à suivre
        </h3>
        <div className="space-y-4">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {user.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.expertise.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user.followers} abonnés
                  </span>
                  <Button size="sm" variant="ghost">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Suivre
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collections populaires */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Collections tendances
        </h3>
        <div className="space-y-4">
          {popularCollections.map((collection, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {collection.name}
                </h4>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {collection.trend}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{collection.articles} articles</span>
                <span>{collection.contributors} contributeurs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuggestedContent;