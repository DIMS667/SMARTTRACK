import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const StatCard = ({ value, label, colorClass, icon, showProgress, progressValue }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
      {icon && (
        <div className={`${colorClass} opacity-60`}>
          {icon}
        </div>
      )}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</div>
    
    {/* Barre de progression optionnelle */}
    {showProgress && progressValue !== undefined && (
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Progression de lecture</span>
          <span>{Math.round(progressValue)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-emerald-600 dark:bg-emerald-400 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>
    )}
  </div>
);

const StatsCards = ({ 
  articlesCount, 
  unreadCount, 
  favoritesCount, 
  feedsCount 
}) => {
  const themeContext = useTheme();
  const { theme } = themeContext || { 
    theme: { 
      primaryText: 'text-purple-600'
    }
  };

  // Calcul de la progression de lecture
  const readProgress = articlesCount > 0 ? ((articlesCount - unreadCount) / articlesCount) * 100 : 0;

  const stats = [
    {
      value: articlesCount,
      label: "Articles affichés",
      colorClass: theme.primaryText,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      value: unreadCount,
      label: "Non lus",
      colorClass: "text-emerald-600 dark:text-emerald-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" strokeWidth="2"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
        </svg>
      ),
      showProgress: true,
      progressValue: readProgress
    },
    {
      value: favoritesCount,
      label: "Favoris",
      colorClass: "text-amber-600 dark:text-amber-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      value: feedsCount,
      label: "Flux actifs",
      colorClass: theme.primaryText,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          value={stat.value}
          label={stat.label}
          colorClass={stat.colorClass}
          icon={stat.icon}
          showProgress={stat.showProgress}
          progressValue={stat.progressValue}
        />
      ))}
    </div>
  );
};

export default StatsCards;