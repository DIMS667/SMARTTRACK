import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Rechercher..." }) => {
  const themeContext = useTheme();
  const { theme } = themeContext || { 
    theme: { 
      primary: 'bg-purple-600'
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        style={{ focusRingColor: theme.primary.replace('bg-', '') }}
      />
    </div>
  );
};

export default SearchBar;