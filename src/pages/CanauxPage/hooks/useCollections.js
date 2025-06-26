// src/pages/CanauxPage/hooks/useCollections.js
import { useState, useCallback } from 'react';
import { collections } from '../data/mockData';
import { COLLECTION_VISIBILITY } from '../data/constants';

export const useCollections = () => {
  const [collectionsList, setCollectionsList] = useState(collections);
  const [viewMode, setViewMode] = useState('grid');
  const [filterVisibility, setFilterVisibility] = useState('all');

  const filteredCollections = collectionsList.filter(collection => {
    if (filterVisibility === 'all') return true;
    if (filterVisibility === 'public') return collection.isPublic;
    if (filterVisibility === 'private') return !collection.isPublic;
    if (filterVisibility === 'following') return collection.isFollowing;
    return true;
  });

  const handleFollowCollection = useCallback((collectionId) => {
    setCollectionsList(prev => prev.map(collection => 
      collection.id === collectionId 
        ? { ...collection, isFollowing: !collection.isFollowing }
        : collection
    ));
  }, []);

  const handleLikeCollection = useCallback((collectionId) => {
    setCollectionsList(prev => prev.map(collection => 
      collection.id === collectionId 
        ? { 
            ...collection, 
            stats: { 
              ...collection.stats, 
              likes: collection.stats.likes + 1 
            }
          }
        : collection
    ));
  }, []);

  return {
    collections: filteredCollections,
    viewMode,
    setViewMode,
    filterVisibility,
    setFilterVisibility,
    handleFollowCollection,
    handleLikeCollection
  };
};
