// src/pages/SourcesPage/components/HashtagFlux/components/HashtagSuggestion.jsx
import React from 'react';
import { Hash, TrendingUp, BarChart3, Sparkles } from 'lucide-react';
import { getSentimentColor } from '../utils/formatters';

const HashtagSuggestion = ({ 
  hashtag, 
  count, 
  trend, 
  growth, 
  category, 
  color, 
  sentiment, 
  posts24h, 
  engagement, 
  onClick 
}) => {
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

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <button
      onClick={() => onClick(hashtag)}
      className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-1 text-left w-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {hashtag}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {category}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getTrendIcon()}
            <span className={`text-xs font-medium ${getTrendColor()}`}>
              {growth}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {count.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              articles totaux
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {posts24h}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              dernières 24h
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {engagement}% engagement
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${getSentimentColor(sentiment)}`}>
              {sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😟' : '😐'}
            </span>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default HashtagSuggestion;