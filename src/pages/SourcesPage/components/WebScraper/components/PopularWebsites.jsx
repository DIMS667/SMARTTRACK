// src/pages/SourcesPage/components/WebScraper/components/PopularWebsites.jsx
import React from 'react';
import { ExternalLink, Users, TrendingUp, Globe } from 'lucide-react';

const PopularWebsites = ({ 
  name, 
  url, 
  description, 
  category, 
  subscribers, 
  trending, 
  favicon, 
  color,
  onClick 
}) => {
  const handleClick = () => {
    onClick({ name, url, description, category });
  };

  const formatSubscribers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative p-6">
        {/* Header avec favicon et trending */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
              {favicon ? (
                <img src={favicon} alt={name} className="w-8 h-8 rounded" />
              ) : (
                <Globe className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category}
              </p>
            </div>
          </div>
          
          {trending && (
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* URL et stats */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <ExternalLink className="w-4 h-4" />
            <span className="truncate">{url}</span>
          </div>
          
          {subscribers && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>{formatSubscribers(subscribers)} lecteurs</span>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300">
              Scrapper ce site
            </span>
            <ExternalLink className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 border-2 border-green-400 dark:border-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default PopularWebsites;