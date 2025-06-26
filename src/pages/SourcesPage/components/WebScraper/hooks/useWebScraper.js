// src/pages/SourcesPage/components/WebScraper/hooks/useWebScraper.js
import { useState, useEffect, useMemo } from 'react';
import { mockScrapedData } from '../mockData';

const useWebScraper = ({ selectedWebsiteTypes, sortBy, filterCategory }) => {
  const [articles, setArticles] = useState([]);
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  // Simulation de scrapping d'un site web
  const performScraping = async (url) => {
    console.log('🕷️ SCRAPPING DÉMARRÉ POUR:', url);
    
    if (!url.trim()) {
      console.log('❌ URL vide, arrêt');
      return;
    }
    
    setIsScrapingActive(true);
    setError(null);
    setCurrentUrl(url);
    
    try {
      // Simulation d'appel de scrapping - À remplacer par : await fetch(`/api/scrape?url=${encodeURIComponent(url)}`)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('📰 NOMBRE TOTAL D\'ARTICLES MOCKÉS:', mockScrapedData.length);
      
      // Filtrer les articles simulés par domaine (simulation basique)
      const domain = new URL(url).hostname.toLowerCase();
      console.log('🌐 DOMAINE EXTRAIT:', domain);
      
      const scrapedArticles = mockScrapedData.filter(article => {
        // Simulation : associer certains articles à certains domaines
        const articleDomain = article.sourceUrl ? new URL(article.sourceUrl).hostname.toLowerCase() : '';
        const domainMatch = articleDomain.includes(domain.split('.')[0]) || 
                           article.source.toLowerCase().includes(domain.split('.')[0]);
        
        if (domainMatch) {
          console.log('✅ ARTICLE TROUVÉ:', article.title);
        }
        
        return domainMatch;
      });
      
      // Si aucun article spécifique au domaine, prendre les premiers articles comme simulation
      const finalArticles = scrapedArticles.length > 0 ? scrapedArticles : mockScrapedData.slice(0, 8);
      
      console.log('📊 ARTICLES SCRAPPÉS:', finalArticles.length);
      setArticles(finalArticles);
      
    } catch (err) {
      console.error('❌ ERREUR DE SCRAPPING:', err);
      setError('Erreur lors du scrapping du site web');
    } finally {
      setIsScrapingActive(false);
      console.log('✅ Scrapping terminé');
    }
  };

  // Effacer le scrapping et revenir à l'état initial
  const clearScraping = () => {
    console.log('🧹 EFFACEMENT DU SCRAPPING');
    setCurrentUrl('');
    setSearchTerm('');
    setArticles([]);
    setError(null);
  };

  // Filtrage et tri des articles
  const filteredAndSortedArticles = useMemo(() => {
    console.log('🔄 FILTRAGE/TRI - Articles source:', articles.length);
    console.log('🔄 FILTRAGE/TRI - FilterCategory:', filterCategory);
    console.log('🔄 FILTRAGE/TRI - SelectedTypes:', selectedWebsiteTypes);
    
    let filtered = articles;

    // Filtrer par types de sites web
    if (!selectedWebsiteTypes.includes('all')) {
      filtered = filtered.filter(article => {
        return selectedWebsiteTypes.some(type => {
          // Logique de correspondance entre l'article et le type de site
          switch (type) {
            case 'news':
              return article.category === 'news' || article.tags.includes('actualités');
            case 'tech':
              return article.category === 'technology' || article.tags.includes('technologie');
            case 'business':
              return article.category === 'business' || article.tags.includes('économie');
            case 'lifestyle':
              return article.category === 'lifestyle' || article.tags.includes('lifestyle');
            case 'sports':
              return article.category === 'sports' || article.tags.includes('sport');
            case 'gaming':
              return article.category === 'gaming' || article.tags.includes('gaming');
            case 'education':
              return article.category === 'education' || article.tags.includes('éducation');
            default:
              return true;
          }
        });
      });
    }

    // Filtrer par catégorie
    filtered = filtered.filter(article => {
      switch (filterCategory) {
        case 'recent':
          const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          return new Date(article.scrapedAt) > dayAgo;
        case 'trending':
          return article.engagement?.views > 10000;
        case 'favorites':
          return article.isFavorite;
        case 'unread':
          return !article.isRead;
        case 'all':
        default:
          return true;
      }
    });

    // Trier les articles
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.engagement?.views || 0) - (a.engagement?.views || 0);
        case 'relevance':
          // Tri par pertinence (articles récents et populaires)
          const scoreA = (a.engagement?.views || 0) + (new Date(a.scrapedAt).getTime() / 1000000);
          const scoreB = (b.engagement?.views || 0) + (new Date(b.scrapedAt).getTime() / 1000000);
          return scoreB - scoreA;
        case 'source':
          return a.source.localeCompare(b.source);
        case 'date':
        default:
          return new Date(b.scrapedAt) - new Date(a.scrapedAt);
      }
    });
    
    console.log('🔄 FILTRAGE/TRI - Articles finaux:', sorted.length);
    return sorted;
  }, [articles, selectedWebsiteTypes, filterCategory, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    currentUrl,
    articles,
    setArticles,
    isScrapingActive,
    error,
    filteredAndSortedArticles,
    performScraping,
    clearScraping
  };
};

export default useWebScraper;