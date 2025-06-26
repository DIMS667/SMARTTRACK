// src/pages/SourcesPage/components/MotcleFlux/hooks/useArticleActions.js
import { useCallback } from 'react';

const useArticleActions = (articles, setArticles) => {
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

  const handleToggleFollow = useCallback((articleId) => {
    setArticles(prev => prev.map(article =>
      article.id === articleId 
        ? { ...article, isFollowed: !article.isFollowed }
        : article
    ));
    
    // Afficher une notification
    const article = articles.find(a => a.id === articleId);
    if (article) {
      const message = article.isFollowed 
        ? `Vous ne suivez plus "${article.title}"` 
        : `Vous suivez maintenant "${article.title}"`;
      
      console.log(message);
      // Ici vous pourriez intégrer un système de notification toast
    }
  }, [articles, setArticles]);

  return {
    handleToggleFavorite,
    handleMarkAsRead,
    handleToggleFollow
  };
};

export default useArticleActions;