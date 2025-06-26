// src/pages/CanauxPage/components/Collections/CollectionTabs.jsx
import React from 'react';
import { User, Users, Globe, TrendingUp, Plus } from 'lucide-react';
import Button from '@/components/common/Button';
import { useCustomizer } from '@/context/CustomizerContext';

const CollectionTabs = ({ activeTab, setActiveTab, onCreateCollection }) => {
  const { theme } = useCustomizer();

  const tabs = [
    { id: 'my', label: 'Mes collections', icon: User, count: 12 },
    { id: 'collaborative', label: 'Collections collaboratives', icon: Users, count: 8 },
    { id: 'public', label: 'Collections publiques', icon: Globe, count: 45 },
    { id: 'trending', label: 'Collections tendances', icon: TrendingUp, count: 15 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? `${theme.primary} text-white`
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
        <Button onClick={onCreateCollection}>
          <Plus className="h-4 w-4 mr-2" />
          Créer une collection
        </Button>
      </div>
    </div>
  );
};

export default CollectionTabs;
