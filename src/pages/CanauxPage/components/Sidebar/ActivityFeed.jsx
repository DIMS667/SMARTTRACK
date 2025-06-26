// src/pages/CanauxPage/components/Sidebar/ActivityFeed.jsx
import React from 'react';
import { MessageSquare, Users, Bookmark } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'article_share':
        return MessageSquare;
      case 'discussion_join':
        return Users;
      case 'collection_create':
        return Bookmark;
      default:
        return MessageSquare;
    }
  };

  const getActivityColor = (color) => {
    const colors = {
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Activité récente
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-center space-x-3 text-sm">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.color)}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">il y a {activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;