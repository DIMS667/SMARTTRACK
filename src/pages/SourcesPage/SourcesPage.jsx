// src/pages/SourcesPage/SourcesPage.jsx
import React, { useState } from 'react';
import { 
  Rss, 
  Plus, 
  Upload, 
  RefreshCw, 
  Search, 
  Filter,
  Grid,
  List,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Pause
} from 'lucide-react';

// Import des composants d'onglets
import FluxSuivisPage from './components/FluxSuivis/FluxSuivisPage';
import SuivreFluxPage from './components/SuivreFlux/SuivreFluxPage';
import { useFlux } from '@/context/FluxContext';

// Données simulées pour le développement
const mockFluxData = [
  {
    id: 1,
    title: "TechCrunch",
    description: "Latest technology news and startup information",
    url: "https://techcrunch.com/feed/",
    siteUrl: "https://techcrunch.com",
    category: "Tech",
    tags: ["technology", "startup"],
    isActive: true,
    status: "active",
    lastSync: new Date(Date.now() - 3600000), // 1h ago
    unreadCount: 12,
    totalArticles: 156,
    favicon: "https://techcrunch.com/favicon.ico",
    syncInterval: 3600000
  },
  {
    id: 2,
    title: "Hacker News",
    description: "News for hackers, makers and entrepreneurs",
    url: "https://hnrss.org/frontpage",
    siteUrl: "https://news.ycombinator.com",
    category: "Tech",
    tags: ["programming", "startup"],
    isActive: true,
    status: "active",
    lastSync: new Date(Date.now() - 1800000), // 30min ago
    unreadCount: 8,
    totalArticles: 89,
    favicon: "https://news.ycombinator.com/favicon.ico",
    syncInterval: 1800000
  },
  {
    id: 3,
    title: "MIT Technology Review",
    description: "In-depth analysis of emerging technologies",
    url: "https://www.technologyreview.com/feed/",
    siteUrl: "https://www.technologyreview.com",
    category: "Science",
    tags: ["research", "innovation"],
    isActive: false,
    status: "paused",
    lastSync: new Date(Date.now() - 86400000), // 1 day ago
    unreadCount: 0,
    totalArticles: 45,
    favicon: "https://www.technologyreview.com/favicon.ico",
    syncInterval: 7200000
  },
  {
    id: 4,
    title: "The Verge",
    description: "Technology, science, art, and culture",
    url: "https://www.theverge.com/rss/index.xml",
    siteUrl: "https://www.theverge.com",
    category: "Tech",
    tags: ["technology", "culture"],
    isActive: true,
    status: "error",
    lastSync: new Date(Date.now() - 7200000), // 2h ago
    lastError: "Feed temporarily unavailable (503)",
    unreadCount: 4,
    totalArticles: 234,
    favicon: "https://www.theverge.com/favicon.ico",
    syncInterval: 3600000
  }
];

const categories = [
  { id: 'tech', name: 'Tech', color: 'blue', fluxCount: 3 },
  { id: 'science', name: 'Science', color: 'green', fluxCount: 1 },
  { id: 'news', name: 'News', color: 'red', fluxCount: 0 },
  { id: 'business', name: 'Business', color: 'yellow', fluxCount: 0 }
];

function SourcesPage({ onNavigate }) {
  const { fluxData, fluxCategories, getStats, syncAllFlux, isLoading } = useFlux(); // ✅ Utiliser les vraies données
  const [activeTab, setActiveTab] = useState('flux-suivis');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // ✅ Utiliser les vraies statistiques
  const stats = getStats();
  const totalFlux = stats.totalFlux;
  const activeFlux = stats.activeFlux;
  const totalUnread = stats.totalUnread;
  const errorFlux = stats.errorFlux;

  const tabs = [
    {
      id: 'flux-suivis',
      name: 'Flux suivis',
      icon: Rss,
      count: totalFlux,
      component: FluxSuivisPage
    },
    {
      id: 'suivre',
      name: 'Suivre des flux',
      icon: Upload,
      component: SuivreFluxPage
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleQuickAction = async (type, data) => {
    switch (type) {
      case 'new-flux':
        setActiveTab('suivre');
        break;
      case 'sync-all':
        console.log('Synchronisation de tous les flux...');
        await syncAllFlux();
        break;
      case 'import-opml':
        setActiveTab('suivre');
        break;
      default:
        console.log('Action:', type, data);
    }
  };

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* En-tête de la page */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Rss className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sources RSS
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gérez vos flux RSS et suivez l'actualité de vos sources préférées
                </p>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuickAction('sync-all')}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                title="Synchroniser tous les flux"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {isLoading ? 'Synchronisation...' : 'Synchroniser'}
                </span>
              </button>
              
              <button
                onClick={() => handleQuickAction('new-flux')}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nouveau flux</span>
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                  <Rss className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Total flux</p>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{totalFlux}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">Actifs</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">{activeFlux}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Non lus</p>
                  <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">{totalUnread}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-900 dark:text-red-100">Erreurs</p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">{errorFlux}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    isActive
                      ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                  {tab.count !== undefined && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      isActive 
                        ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="flex-1 overflow-hidden">
        {ActiveTabComponent && (
          <ActiveTabComponent 
            fluxData={fluxData}
            categories={fluxCategories}
            onQuickAction={handleQuickAction}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}
      </div>
    </div>
  );
}

export default SourcesPage;