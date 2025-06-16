import { useState, useEffect } from 'react';

// Stockage global des favoris (simulé - dans une vraie app, ce serait dans un store global)
let globalFavorites = [];
let listeners = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener(globalFavorites));
};

export const useSharedFavorites = () => {
  const [favorites, setFavorites] = useState(globalFavorites);

  useEffect(() => {
    const updateFavorites = (newFavorites) => {
      setFavorites([...newFavorites]);
    };

    listeners.push(updateFavorites);

    return () => {
      listeners = listeners.filter(listener => listener !== updateFavorites);
    };
  }, []);

  const addToFavorites = (article) => {
    const isAlreadyFavorite = globalFavorites.some(fav => fav.id === article.id);
    if (!isAlreadyFavorite) {
      globalFavorites = [...globalFavorites, {
        ...article,
        addedToFavoritesAt: new Date().toISOString(),
        type: 'article' // Pour distinguer des autres types de favoris
      }];
      notifyListeners();
    }
  };

  const removeFromFavorites = (articleId) => {
    globalFavorites = globalFavorites.filter(fav => fav.id !== articleId);
    notifyListeners();
  };

  const toggleFavorite = (article) => {
    const isCurrentlyFavorite = globalFavorites.some(fav => fav.id === article.id);
    if (isCurrentlyFavorite) {
      removeFromFavorites(article.id);
    } else {
      addToFavorites(article);
    }
    return !isCurrentlyFavorite; // Retourne le nouvel état
  };

  const isFavorite = (articleId) => {
    return globalFavorites.some(fav => fav.id === articleId);
  };

  const getFavoriteArticles = () => {
    return globalFavorites.filter(fav => fav.type === 'article');
  };

  const clearAllFavorites = () => {
    globalFavorites = [];
    notifyListeners();
  };

  return {
    favorites: getFavoriteArticles(),
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    favoritesCount: getFavoriteArticles().length
  };
};