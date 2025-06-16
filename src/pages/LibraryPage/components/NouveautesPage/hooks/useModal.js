import { useState } from 'react';

export const useModal = (onToggleRead) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openArticle = (article) => {
    setSelectedArticle(article);
    // Marquer l'article comme lu quand on l'ouvre
    if (!article.isRead && onToggleRead) {
      onToggleRead(article.id);
    }
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const isOpen = Boolean(selectedArticle);

  return {
    selectedArticle,
    isOpen,
    openArticle,
    closeArticle
  };
};