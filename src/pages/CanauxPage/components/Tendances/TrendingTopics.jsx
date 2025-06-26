// src/pages/CanauxPage/components/Tendances/TrendingTopics.jsx
import React from 'react';
import { TrendingUp, Hash, ExternalLink } from 'lucide-react';
import { formatGrowth } from '../../utils/formatters';

const TrendingTopics = ({ topics, selectedCategory, setSelectedCategory }) => {
  const categories = ['all', 'IA', 'Tech', 'FinTech', 'Cybersécurité', 'Green Tech'];

  return (
    <div className="space-y-6">
      {/* Filtres par catégorie */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <TrendingUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'Toutes' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des tendances */}
      <div className="space-y-4">
        {topics.map((topic, index) => {
          const growth = formatGrowth(topic.growth);
          return (
            <div 
              key={topic.id} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Hash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {topic.topic}
                      </h3>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        {topic.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{topic.mentions.toLocaleString()} mentions</span>
                      <span>{topic.articles} articles</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`font-semibold ${growth.className}`}>
                      {growth.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      croissance
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingTopics;