// src/pages/SourcesPage/components/GoogleNews/hooks/useNewsActions.js
import { useCallback } from 'react';

const useNewsActions = (articles, setArticles) => {
  const handleToggleFavorite = useCallback((articleId) => {
    setArticles(prev => prev.map(article =>
      article.id === articleId 
        ? { ...article, isFavorite: !article.isFavorite }
        : article
    ));
  }, [setArticles]);

  const handleMarkAsRead = useCallback((articleId) => {
    setArticles(prev => prev.map(article =>
      article.id === articleId 
        ? { ...article, isRead: !article.isRead }
        : article
    ));
  }, [setArticles]);

  const handleMarkAllAsRead = useCallback(() => {
    setArticles(prev => prev.map(article => ({ ...article, isRead: true })));
  }, [setArticles]);

  const handleRefreshNews = useCallback(() => {
    // Déclencher un rafraîchissement des actualités
    console.log('Actualisation des actualités...');
    // Ici vous pourriez déclencher un nouveau fetch des données
  }, []);

  return {
    handleToggleFavorite,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleRefreshNews
  };
};

export default useNewsActions;