// src/pages/CanauxPage/components/Tendances/TrendingStats.jsx
import React from 'react';
import { BarChart3, PieChart, Activity, Users, MessageCircle, Share2 } from 'lucide-react';

const TrendingStats = ({ timeRange, setTimeRange }) => {
  const timeRanges = [
    { id: '1h', label: '1 heure' },
    { id: '24h', label: '24 heures' },
    { id: '7j', label: '7 jours' },
    { id: '30j', label: '30 jours' }
  ];

  const stats = [
    {
      label: 'Total des mentions',
      value: '15.2k',
      change: '+12%',
      icon: MessageCircle,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Articles publiés',
      value: '234',
      change: '+8%',
      icon: PieChart,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Partages',
      value: '1.8k',
      change: '+25%',
      icon: Share2,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Engagement',
      value: '89%',
      change: '+5%',
      icon: BarChart3,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Sélecteur de période */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Statistiques des tendances
          </h3>
          <div className="flex space-x-2">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  timeRange === range.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingStats;