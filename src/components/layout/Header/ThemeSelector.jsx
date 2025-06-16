import React, { useState } from 'react';
import { Palette, Sun, Moon, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/common/Button';

const themes = {
  blue: { name: 'Blue', color: 'bg-blue-600' },
  purple: { name: 'Purple', color: 'bg-purple-600' },
  green: { name: 'Green', color: 'bg-green-600' },
  red: { name: 'Red', color: 'bg-red-600' }
};

function ThemeSelector() {
  const { currentTheme, setCurrentTheme, isDark, setIsDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
      >
        <Palette className="w-5 h-5" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Thème</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Mode sombre</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="p-1"
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Couleur</p>
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${theme.color} mr-3`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{theme.name}</span>
                  </div>
                  {currentTheme === key && <Check className="w-4 h-4 text-green-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;