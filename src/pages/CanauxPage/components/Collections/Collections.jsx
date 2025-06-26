// src/pages/CanauxPage/components/Collections/Collections.jsx
import React from 'react';
import CollectionTabs from './CollectionTabs';
import MyCollections from './MyCollections';
import CollaborativeCollections from './CollaborativeCollections';
import CollectionCard from './CollectionCard';
import CreateCollectionModal from './CreateCollectionModal';
import { Bookmark } from 'lucide-react';

const Collections = ({ 
  collections,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  filterVisibility,
  setFilterVisibility,
  showCreateModal,
  setShowCreateModal,
  handleFollowCollection,
  handleLikeCollection,
  handleCreateCollection,
  handleEditCollection,
  handleDeleteCollection,
  handleShareCollection,
  handleNotifyToggle,
  handleLeaveCollection
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'my':
        return (
          <MyCollections 
            collections={collections}
            onEdit={handleEditCollection}
            onDelete={handleDeleteCollection}
            onShare={handleShareCollection}
            onSettings={handleEditCollection}
          />
        );
      case 'collaborative':
        return (
          <CollaborativeCollections 
            collections={collections}
            onNotifyToggle={handleNotifyToggle}
            onLeave={handleLeaveCollection}
          />
        );
      case 'public':
      case 'trending':
        return (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
              : 'space-y-4'
          }>
            {collections.map((collection) => (
              <CollectionCard 
                key={collection.id}
                collection={collection}
                onFollow={handleFollowCollection}
                onLike={handleLikeCollection}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <CollectionTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateCollection={() => setShowCreateModal(true)}
      />

      {collections.length > 0 ? (
        renderTabContent()
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucune collection trouvée
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {activeTab === 'my' 
              ? 'Vous n\'avez pas encore créé de collection.' 
              : 'Aucune collection ne correspond à vos critères.'}
          </p>
        </div>
      )}

      <CreateCollectionModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateCollection}
      />
    </div>
  );
};

export default Collections;