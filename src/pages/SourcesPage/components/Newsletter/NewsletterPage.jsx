import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Mail, Plus, Settings, Filter, Grid, List, Star } from 'lucide-react';
import SearchForm from './components/SearchForm';
import FilterBar from './components/FilterBar';
import NewsletterCard from './components/NewsletterCard';
import NewsletterList from './components/NewsletterList';
import EmptyState from './components/EmptyState';
import StatsSection from './components/StatsSection';
import SubscriptionModal from './components/SubscriptionModal';
import AddNewsletterModal from './components/AddNewsletterModal';
import NewsletterDetailPage from './components/NewsletterDetailPage';
import CreateCollectionModal from './components/CreateCollectionModal';
import ManageCollectionModal from './components/ManageCollectionModal';
import { useNewsletterManagement } from './hooks/useNewsletterManagement';
import { useNewsletterSearch } from './hooks/useNewsletterSearch';

const NewsletterPage = () => {
  const [activeTab, setActiveTab] = useState('subscribed'); // 'subscribed', 'discover', 'bundles'
  const [viewMode, setViewMode] = useState('list'); // 'grid', 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState({ show: false, newsletter: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null); // Pour la vue détail
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [collections, setCollections] = useState([]); // Gestion des collections
  const [manageCollectionModal, setManageCollectionModal] = useState({ show: false, collection: null });
  
  const {
    newsletters,
    loading,
    subscribedCount,
    unreadCount,
    totalCount,
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    updateNewsletterSettings,
    markAsRead,
    addToFavorites,
    addNewsletter
  } = useNewsletterManagement(activeTab);

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredNewsletters
  } = useNewsletterSearch(newsletters, activeTab);

  const handleSubscribe = async (newsletterId) => {
    await subscribeToNewsletter(newsletterId);
  };

  const handleNewsletterClick = (newsletter) => {
    if (activeTab === 'discover') {
      setSubscriptionModal({ show: true, newsletter });
    } else if (activeTab === 'subscribed') {
      // Ouvrir la vue détail pour les newsletters abonnées
      setSelectedNewsletter(newsletter);
    }
  };

  const handleAddNewsletter = async (newsletterData) => {
    await addNewsletter(newsletterData);
    setShowAddModal(false);
  };

  const handleCreateCollection = async (collectionData) => {
    // Simuler l'ajout de collection
    setCollections(prev => [...prev, collectionData]);
    console.log('Collection créée:', collectionData);
  };

  const handleUpdateCollection = (updatedCollection) => {
    setCollections(prev => 
      prev.map(col => col.id === updatedCollection.id ? updatedCollection : col)
    );
  };

  const handleDeleteCollection = (collectionId) => {
    setCollections(prev => prev.filter(col => col.id !== collectionId));
  };

  const handleManageCollection = (collection) => {
    setManageCollectionModal({ show: true, collection });
  };

  const tabs = [
    { 
      id: 'subscribed', 
      label: 'Mes newsletters', 
      icon: Mail, 
      count: subscribedCount 
    },
    { 
      id: 'discover', 
      label: 'Découvrir', 
      icon: Star, 
      count: null 
    },
    { 
      id: 'bundles', 
      label: 'Collections', 
      icon: Plus, 
      count: null 
    }
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    // Vue Collections
    if (activeTab === 'bundles') {
      return (
        <div className="space-y-6">
          {/* Afficher les collections existantes */}
          {collections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Card key={collection.id} className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      collection.color === 'blue' ? 'bg-blue-500' :
                      collection.color === 'green' ? 'bg-green-500' :
                      collection.color === 'purple' ? 'bg-purple-500' :
                      collection.color === 'red' ? 'bg-red-500' :
                      collection.color === 'orange' ? 'bg-orange-500' :
                      collection.color === 'pink' ? 'bg-pink-500' :
                      collection.color === 'indigo' ? 'bg-indigo-500' :
                      collection.color === 'yellow' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}>
                      <span className="text-lg">{collection.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {collection.newsletterIds.length} newsletter{collection.newsletterIds.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {collection.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {collection.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Créée le {new Date(collection.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 dark:text-gray-400"
                      onClick={() => handleManageCollection(collection)}
                    >
                      Gérer
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Bouton de création */}
          <Card className="p-8 text-center bg-white dark:bg-gray-800">
            <div className="max-w-md mx-auto">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Plus className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {collections.length === 0 ? 'Organisez vos newsletters en collections' : 'Créer une nouvelle collection'}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                {collections.length === 0 
                  ? 'Les collections vous permettent de grouper vos newsletters par thème. Créez des collections comme "Technologie", "Business", "Design" pour mieux organiser vos abonnements.'
                  : 'Continuez à organiser vos newsletters en créant de nouvelles collections thématiques.'
                }
              </p>
              
              <div className="space-y-6">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => setShowCreateCollectionModal(true)}
                >
                  <div className="flex items-center space-x-3">
                    <Plus className="h-5 w-5" />
                    <span>{collections.length === 0 ? 'Créer ma première collection' : 'Nouvelle collection'}</span>
                  </div>
                </Button>
                
                {collections.length === 0 && (
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Exemples de collections populaires :
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full font-medium shadow-sm">
                        🚀 Startup & Innovation
                      </span>
                      <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded-full font-medium shadow-sm">
                        💼 Business & Finance
                      </span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm rounded-full font-medium shadow-sm">
                        🎨 Design & Créativité
                      </span>
                      <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-full font-medium shadow-sm">
                        📱 Tech & Dev
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      );
    }

    if (filteredNewsletters.length === 0) {
      return <EmptyState activeTab={activeTab} onTabChange={setActiveTab} />;
    }

    if (viewMode === 'list') {
      return (
        <NewsletterList
          newsletters={filteredNewsletters}
          onSubscribe={handleSubscribe}
          onUnsubscribe={unsubscribeFromNewsletter}
          onUpdateSettings={updateNewsletterSettings}
          onMarkAsRead={markAsRead}
          onAddToFavorites={addToFavorites}
          onNewsletterClick={handleNewsletterClick}
          activeTab={activeTab}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNewsletters.map((newsletter) => (
          <NewsletterCard
            key={newsletter.id}
            newsletter={newsletter}
            onSubscribe={handleSubscribe}
            onUnsubscribe={unsubscribeFromNewsletter}
            onUpdateSettings={updateNewsletterSettings}
            onMarkAsRead={markAsRead}
            onAddToFavorites={addToFavorites}
            onNewsletterClick={handleNewsletterClick}
            activeTab={activeTab}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Si une newsletter est sélectionnée, afficher la vue détail */}
      {selectedNewsletter ? (
        <NewsletterDetailPage
          newsletter={selectedNewsletter}
          onBack={() => setSelectedNewsletter(null)}
          onMarkAsRead={markAsRead}
          onAddToFavorites={addToFavorites}
        />
      ) : (
        /* ✅ Vue principale des newsletters */
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Header avec navigation par onglets */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Newsletters
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gérez vos abonnements et découvrez de nouveaux contenus
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Bouton Ajouter Newsletter */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 shadow-sm"
              >
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Ajouter</span>
                </div>
              </Button>

              {/* Toggle view mode */}
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Filters toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>

              {/* Settings */}
              {/* <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
                {tab.count !== null && (
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-sm">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        {activeTab === 'subscribed' && (
          <StatsSection 
            subscribedCount={subscribedCount}
            unreadCount={unreadCount}
            totalCount={totalCount}
          />
        )}

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="space-y-4">
            <SearchForm
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder={
                activeTab === 'subscribed' 
                  ? "Rechercher dans mes newsletters..." 
                  : "Rechercher des newsletters..."
              }
            />
            
            {showFilters && (
              <FilterBar
                filters={filters}
                onFiltersChange={setFilters}
                activeTab={activeTab}
              />
            )}
          </div>
        </Card>

        {/* Content */}
        <div className="min-h-[400px]">
          {renderContent()}
        </div>
              </div>
      )}

      {/* Modals */}
      {subscriptionModal.show && (
        <SubscriptionModal
          newsletter={subscriptionModal.newsletter}
          onClose={() => setSubscriptionModal({ show: false, newsletter: null })}
          onSubscribe={handleSubscribe}
        />
      )}

      {showAddModal && (
        <AddNewsletterModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddNewsletter}
          existingNewsletters={newsletters}
        />
      )}
      {showCreateCollectionModal && (
        <CreateCollectionModal
          onClose={() => setShowCreateCollectionModal(false)}
          onCreateCollection={handleCreateCollection}
        />
      )}

      {manageCollectionModal.show && (
        <ManageCollectionModal
          collection={manageCollectionModal.collection}
          onClose={() => setManageCollectionModal({ show: false, collection: null })}
          onUpdateCollection={handleUpdateCollection}
          onDeleteCollection={handleDeleteCollection}
          availableNewsletters={newsletters}
        />
      )}
    </div>
  );
};

export default NewsletterPage;