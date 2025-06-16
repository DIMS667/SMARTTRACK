// themecontext
import React, { useState, createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  blue: {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryLight: 'bg-blue-50',
    primaryText: 'text-blue-600',
    sidebar: 'bg-blue-600',
    sidebarHover: 'hover:bg-blue-700'
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    primaryLight: 'bg-purple-50',
    primaryText: 'text-purple-600',
    sidebar: 'bg-purple-600',
    sidebarHover: 'hover:bg-purple-700'
  },
  green: {
    primary: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    primaryLight: 'bg-green-50',
    primaryText: 'text-green-600',
    sidebar: 'bg-green-600',
    sidebarHover: 'hover:bg-green-700'
  },
  red: {
    primary: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    primaryLight: 'bg-red-50',
    primaryText: 'text-red-600',
    sidebar: 'bg-red-600',
    sidebarHover: 'hover:bg-red-700'
  }
};

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');

  useEffect(() => {
    const saved = localStorage.getItem('theme-settings');
    if (saved) {
      const { isDark: savedDark, theme: savedTheme } = JSON.parse(saved);
      setIsDark(savedDark);
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-settings', JSON.stringify({ isDark, theme: currentTheme }));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      isDark, setIsDark, 
      currentTheme, setCurrentTheme, 
      theme: themes[currentTheme] 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;