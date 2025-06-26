// src/pages/SourcesPage/components/HashtagFlux/hooks/useArticleActions.js
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
    
    // Afficher une notification (optionnel)
    const article = articles.find(a => a.id === articleId);
    if (article) {
      const message = article.isFollowed 
        ? `Vous ne suivez plus cet article` 
        : `Vous suivez maintenant cet article`;
      
      console.log(message);
      
      // Ici, vous pourriez ajouter une vraie notification toast
      // toast.success(message);
    }
  }, [articles, setArticles]);

  return {
    handleToggleFavorite,
    handleMarkAsRead,
    handleToggleFollow
  };
};

export default useArticleActions;