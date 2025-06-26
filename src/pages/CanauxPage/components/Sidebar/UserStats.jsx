// src/pages/CanauxPage/components/Sidebar/UserStats.jsx
import React from 'react';

const UserStats = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Votre activité
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Articles partagés</span>
          <span className="font-medium text-gray-900 dark:text-white">{stats.articlesShared}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Abonnés</span>
          <span className="font-medium text-gray-900 dark:text-white">{stats.followers}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Abonnements</span>
          <span className="font-medium text-gray-900 dark:text-white">{stats.following}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Collections</span>
          <span className="font-medium text-gray-900 dark:text-white">{stats.collections}</span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;