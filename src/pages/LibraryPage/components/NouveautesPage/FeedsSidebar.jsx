import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const FeedCard = ({ feed, isSelected, onSelect, theme }) => (
  <div 
    onClick={() => onSelect(feed.id.toString())}
    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
      isSelected
        ? `${theme.primaryLight} ${theme.primary.replace('bg-', 'border-')} dark:bg-opacity-20` 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    }`}
  >
    <div className="flex items-center gap-3 mb-3">
      <img 
        src={feed.logo} 
        alt={feed.name}
        className="w-10 h-10 rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">{feed.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{feed.description}</p>
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-600 dark:text-gray-300">
        {feed.totalArticles} articles
      </span>
      {feed.unreadCount > 0 && (
        <span 
          className="px-2 py-1 rounded-full text-white text-xs font-medium"
          style={{ backgroundColor: feed.color }}
        >
          {feed.unreadCount} non lus
        </span>
      )}
    </div>
  </div>
);

const FeedsSidebar = ({ 
  showFeedsPanel, 
  onCloseSidebar, 
  feedSearchQuery, 
  onFeedSearchChange, 
  filteredFeeds, 
  selectedFeed, 
  onFeedSelect, 
  articles 
}) => {
  const themeContext = useTheme();
  const { theme } = themeContext || { 
    theme: { 
      primary: 'bg-purple-600', 
      primaryText: 'text-purple-600', 
      primaryLight: 'bg-purple-50' 
    }
  };

  if (!showFeedsPanel) return null;

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header fixe */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Flux RSS</h2>
          <button
            onClick={onCloseSidebar}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Barre de recherche des flux */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un flux..."
            value={feedSearchQuery}
            onChange={(e) => onFeedSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            style={{ focusRingColor: theme.primary.replace('bg-', '') }}
          />
        </div>
      </div>

      {/* Zone scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Flux "Tous" */}
        <div 
          onClick={() => onFeedSelect("All")}
          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 mb-4 ${
            selectedFeed === "All"
              ? `${theme.primaryLight} ${theme.primary.replace('bg-', 'border-')} dark:bg-opacity-20` 
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${theme.primary} flex items-center justify-center`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Tous les flux</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {articles.length} articles au total
              </p>
            </div>
          </div>
        </div>

        {/* Liste des flux */}
        <div className="space-y-3">
          {filteredFeeds.map(feed => (
            <FeedCard 
              key={feed.id} 
              feed={feed} 
              isSelected={selectedFeed === feed.id.toString()}
              onSelect={onFeedSelect}
              theme={theme}
            />
          ))}
          {filteredFeeds.length === 0 && feedSearchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Aucun flux trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedsSidebar;