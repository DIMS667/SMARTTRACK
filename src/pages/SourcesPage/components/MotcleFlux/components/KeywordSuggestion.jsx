// src/pages/SourcesPage/components/MotcleFlux/components/KeywordSuggestion.jsx
import React from 'react';
import { Tag, TrendingUp, Sparkles } from 'lucide-react';

const KeywordSuggestion = ({ keyword, count, trend, color, onClick }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': 
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': 
        return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default: 
        return <div className="w-3 h-3 bg-yellow-400 rounded-full" />;
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case 'up': 
        return 'En hausse';
      case 'down': 
        return 'En baisse';
      default: 
        return 'Stable';
    }
  };

  return (
    <button
      onClick={() => onClick(keyword)}
      className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {keyword}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {getTrendText()}
              </p>
            </div>
          </div>
          {getTrendIcon()}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {count.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            articles
          </span>
        </div>
        
        <div className="mt-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
            Rechercher maintenant
          </span>
        </div>
      </div>
    </button>
  );
};

export default KeywordSuggestion;