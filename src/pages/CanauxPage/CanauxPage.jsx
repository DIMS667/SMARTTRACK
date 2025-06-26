
// src/pages/CanauxPage/CanauxPage.jsx - MIS À JOUR COMPLET
import React, { useState } from 'react';
import { Plus, Bell, Globe, Users, Bookmark, TrendingUp } from 'lucide-react';
import Button from '@/components/common/Button';
import { useCustomizer } from '@/context/CustomizerContext';

// Hooks
import { useSocialFeed } from './hooks/useSocialFeed';
import { useFollowing } from './hooks/useFollowing';
import { useCollections } from './hooks/useCollections';
import { useTrending } from './hooks/useTrending';

// Components
import FluxSocial from './components/FluxSocial';
import Abonnements from './components/Abonnements';
import Collections from './components/Collections';
import Tendances from './components/Tendances';
import Sidebar from './components/Sidebar';

const CanauxPage = () => {
  const { isDark, theme } = useCustomizer();
  const [activeTab, setActiveTab] = useState('flux');

  // Hooks data
  const socialFeedData = useSocialFeed();
  const followingData = useFollowing();
  const collectionsData = useCollections();
  const trendingData = useTrending();

  const tabs = [
    { id: 'flux', label: 'Flux Social', icon: Globe },
    { id: 'following', label: 'Abonnements', icon: Users },
    { id: 'collections', label: 'Collections', icon: Bookmark },
    { id: 'trending', label: 'Tendances', icon: TrendingUp }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'flux':
        return <FluxSocial {...socialFeedData} />;
      case 'following':
        return <Abonnements {...followingData} />;
      case 'collections':
        return <Collections {...collectionsData} />;
      case 'trending':
        return <Tendances {...trendingData} />;
      default:
        return <FluxSocial {...socialFeedData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Réseau de Veille
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Partagez, découvrez et collaborez sur la veille stratégique
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button size="sm" variant="secondary">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Partager un article
              </Button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? `border-current ${theme.primaryText}`
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>

          {/* Sidebar droite */}
          <div className="space-y-6">
            <Sidebar activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanauxPage;