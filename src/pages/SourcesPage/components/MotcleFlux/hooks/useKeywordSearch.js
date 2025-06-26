// src/pages/SourcesPage/components/MotcleFlux/hooks/useKeywordSearch.js
import { useState, useMemo } from 'react';
import { mockArticles } from '../mockData';

const useKeywordSearch = ({ sortBy, filterCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulation de recherche
  const performSearch = async (keyword) => {
    if (!keyword.trim()) return;
    
    setIsSearching(true);
    setCurrentKeyword(keyword);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filtrer les articles qui contiennent le mot-clé
      const filteredArticles = mockArticles.filter(article =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description.toLowerCase().includes(keyword.toLowerCase()) ||
        article.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
      );
      
      setArticles(filteredArticles);
    } catch (error) {
      console.error('Erreur de recherche:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Fonction pour vider la recherche
  const clearSearch = () => {
    setCurrentKeyword('');
    setSearchTerm('');
    setArticles([]);
  };

  // Filtrage et tri des articles
  const filteredAndSortedArticles = useMemo(() => {
    return articles
      .filter(article => {
        if (filterCategory === 'all') return true;
        if (filterCategory === 'unread') return !article.isRead;
        if (filterCategory === 'favorites') return article.isFavorite;
        if (filterCategory === 'followed') return article.isFollowed;
        return article.category === filterCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'source':
            return a.source.localeCompare(b.source);
          case 'engagement':
            return b.engagement.views - a.engagement.views;
          case 'date':
          default:
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
      });
  }, [articles, sortBy, filterCategory]);

  return {
    searchTerm,
    setSearchTerm,
    currentKeyword,
    articles,
    setArticles,
    isSearching,
    filteredAndSortedArticles,
    performSearch,
    clearSearch
  };
};

export default useKeywordSearch;