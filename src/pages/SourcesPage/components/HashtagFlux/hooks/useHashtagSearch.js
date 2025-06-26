// src/pages/SourcesPage/components/HashtagFlux/hooks/useHashtagSearch.js
import { useState, useEffect, useMemo } from 'react';
import mockData from '../hashtagMockData.json';

// Fonction pour convertir les dates string en objets Date
const parseDates = (articles) => {
  return articles.map(article => ({
    ...article,
    publishedAt: new Date(article.publishedAt)
  }));
};

const mockHashtagArticles = parseDates(mockData.articles);

const useHashtagSearch = ({ selectedContentTypes, sortBy, filterCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulation de recherche
  const performSearch = async (hashtag) => {
    if (!hashtag.trim()) return;
    
    setIsSearching(true);
    setCurrentHashtag(hashtag);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filtrer les articles qui contiennent le hashtag
      let filteredArticles = mockHashtagArticles.filter(article =>
        article.hashtags.some(h => h.toLowerCase().includes(hashtag.toLowerCase().replace('#', ''))) ||
        article.title.toLowerCase().includes(hashtag.toLowerCase()) ||
        article.description.toLowerCase().includes(hashtag.toLowerCase())
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
    setCurrentHashtag('');
    setSearchTerm('');
    setArticles([]);
  };

  // Filtrage et tri des articles
  const filteredAndSortedArticles = useMemo(() => {
    return articles
      .filter(article => {
        // Filtrage par catégorie
        let categoryMatch = true;
        if (filterCategory === 'unread') categoryMatch = !article.isRead;
        else if (filterCategory === 'favorites') categoryMatch = article.isFavorite;
        else if (filterCategory === 'followed') categoryMatch = article.isFollowed;
        else if (filterCategory === 'trending') categoryMatch = article.trending;
        else if (filterCategory !== 'all') categoryMatch = article.category === filterCategory;

        // Filtrage par type de contenu
        let contentTypeMatch = true;
        if (!selectedContentTypes.includes('all')) {
          contentTypeMatch = selectedContentTypes.includes(article.contentType);
        }

        return categoryMatch && contentTypeMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'source':
            return a.source.localeCompare(b.source);
          case 'engagement':
            return b.engagement.views - a.engagement.views;
          case 'likes':
            return b.engagement.likes - a.engagement.likes;
          case 'date':
          default:
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
      });
  }, [articles, selectedContentTypes, sortBy, filterCategory]);

  return {
    searchTerm,
    setSearchTerm,
    currentHashtag,
    articles,
    setArticles,
    isSearching,
    filteredAndSortedArticles,
    performSearch,
    clearSearch
  };
};

export default useHashtagSearch;