// src/pages/CanauxPage/components/Abonnements/SuggestedUsers.jsx
import React from 'react';
import { UserPlus } from 'lucide-react';
import Button from '@/components/common/Button';

const SuggestedUsers = ({ suggestions, expertises, onFollow }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Suggestions pour vous
      </h3>
      <div className="space-y-4">
        {suggestions.map((user) => (
          <div key={user.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
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
                      {expertises.find(e => e.id === skill)?.name || skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  {user.reason}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {user.recentHighlight}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user.followers.toLocaleString()} abonnés
                  </span>
                  <Button 
                    size="sm"
                    onClick={() => onFollow(user.id)}
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    Suivre
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;