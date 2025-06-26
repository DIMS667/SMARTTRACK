// src/pages/SourcesPage/components/GoogleNews/components/TrendingTopics.jsx
import React from 'react';
import { TrendingUp, Hash, Flame } from 'lucide-react';
import { getCategoryIcon } from '../utils/categoryUtils';

const TrendingTopics = ({ topics, onTopicClick }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': 
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': 
        return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default: 
        return <div className="w-3 h-3 bg-yellow-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          Sujets tendances
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Les actualités les plus recherchées en ce moment
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((item, index) => (
          <button
            key={index}
            onClick={() => onTopicClick(item.topic)}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-1 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-5 group-hover:opacity-10 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(item.category)}</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(item.trend)}
                  <span className={`text-xs font-medium ${getTrendColor(item.trend)}`}>
                    {item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}
                  </span>
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {item.topic}
              </h4>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                  {item.count.toLocaleString()} articles
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  Rechercher
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;