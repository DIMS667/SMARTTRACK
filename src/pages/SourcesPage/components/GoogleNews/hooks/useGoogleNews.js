// // src/pages/SourcesPage/components/GoogleNews/hooks/useGoogleNews.js
// import { useState, useEffect, useMemo } from 'react';
// import { mockGoogleNews } from '../mockData';

// const useGoogleNews = ({ selectedCategory, selectedLocation, filterType, sortBy }) => {
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentQuery, setCurrentQuery] = useState('');

//   // Simulation de chargement des actualités
//   const loadNews = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Simulation d'appel API
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Filtrer par catégorie et localisation
//       let filteredNews = [...mockGoogleNews];
      
//       if (selectedCategory !== 'all') {
//         filteredNews = filteredNews.filter(article => article.category === selectedCategory);
//       }
      
//       if (selectedLocation !== 'world') {
//         filteredNews = filteredNews.filter(article => 
//           article.location === selectedLocation || article.location === 'world'
//         );
//       }
      
//       setArticles(filteredNews);
//     } catch (err) {
//       setError('Erreur lors du chargement des actualités');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Recherche par sujet tendance
//   const searchByTopic = async (topic) => {
//     setIsLoading(true);
//     setError(null);
//     setCurrentQuery(topic);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Filtrer les articles qui contiennent le sujet dans le titre, description ou tags
//       const filteredNews = mockGoogleNews.filter(article =>
//         article.title.toLowerCase().includes(topic.toLowerCase()) ||
//         article.description.toLowerCase().includes(topic.toLowerCase()) ||
//         article.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
//       );
      
//       setArticles(filteredNews);
//     } catch (err) {
//       setError('Erreur lors de la recherche');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Recherche par requête utilisateur
//   const searchByQuery = async (query) => {
//     if (!query.trim()) return;
    
//     setIsLoading(true);
//     setError(null);
//     setCurrentQuery(query);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Filtrer les articles qui contiennent la requête
//       const filteredNews = mockGoogleNews.filter(article =>
//         article.title.toLowerCase().includes(query.toLowerCase()) ||
//         article.description.toLowerCase().includes(query.toLowerCase()) ||
//         article.content.toLowerCase().includes(query.toLowerCase()) ||
//         article.source.toLowerCase().includes(query.toLowerCase()) ||
//         article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
//       );
      
//       setArticles(filteredNews);
//     } catch (err) {
//       setError('Erreur lors de la recherche');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Effacer la recherche et revenir aux actualités générales
//   const clearSearch = () => {
//     setCurrentQuery('');
//     setSearchTerm('');
//     loadNews();
//   };

//   // Actualiser les actualités
//   const refreshNews = () => {
//     if (currentQuery) {
//       // Si on est en mode recherche, relancer la recherche
//       if (searchTerm) {
//         searchByQuery(currentQuery);
//       } else {
//         searchByTopic(currentQuery);
//       }
//     } else {
//       // Sinon charger les actualités générales
//       loadNews();
//     }
//   };

//   // Filtrage et tri des articles
//   const filteredAndSortedArticles = useMemo(() => {
//     return articles
//       .filter(article => {
//         switch (filterType) {
//           case 'breaking':
//             return article.isBreaking;
//           case 'verified':
//             return article.isVerified;
//           case 'favorites':
//             return article.isFavorite;
//           case 'unread':
//             return !article.isRead;
//           case 'all':
//           default:
//             return true;
//         }
//       })
//       .sort((a, b) => {
//         switch (sortBy) {
//           case 'relevancy':
//             // Tri par pertinence (breaking news en premier, puis par engagement)
//             if (a.isBreaking && !b.isBreaking) return -1;
//             if (!a.isBreaking && b.isBreaking) return 1;
//             return b.engagement.views - a.engagement.views;
//           case 'popularity':
//             return b.engagement.views - a.engagement.views;
//           case 'source':
//             return a.source.localeCompare(b.source);
//           case 'publishedAt':
//           default:
//             return new Date(b.publishedAt) - new Date(a.publishedAt);
//         }
//       });
//   }, [articles, filterType, sortBy]);

//   // Charger les actualités au montage et quand les filtres changent
//   useEffect(() => {
//     if (!currentQuery) {
//       loadNews();
//     }
//   }, [selectedCategory, selectedLocation]);

//   return {
//     searchTerm,
//     setSearchTerm,
//     currentQuery,
//     articles,
//     setArticles,
//     filteredAndSortedArticles,
//     isLoading,
//     error,
//     loadNews,
//     searchByTopic,
//     searchByQuery,
//     clearSearch,
//     refreshNews
//   };
// };

// export default useGoogleNews;


// src/pages/SourcesPage/components/GoogleNews/hooks/useGoogleNews.js
import { useState, useEffect, useMemo } from 'react';
import { mockGoogleNews } from '../mockData';

const useGoogleNews = ({ selectedCategory, selectedLocation, filterType, sortBy }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

  // Simulation de chargement des actualités
  const loadNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filtrer par catégorie et localisation
      let filteredNews = [...mockGoogleNews];
      
      if (selectedCategory !== 'all') {
        filteredNews = filteredNews.filter(article => article.category === selectedCategory);
      }
      
      if (selectedLocation !== 'world') {
        filteredNews = filteredNews.filter(article => 
          article.location === selectedLocation || article.location === 'world'
        );
      }
      
      setArticles(filteredNews);
    } catch (err) {
      setError('Erreur lors du chargement des actualités');
    } finally {
      setIsLoading(false);
    }
  };

  // Recherche par sujet tendance
  const searchByTopic = async (topic) => {
    console.log('🎯 RECHERCHE PAR SUJET:', topic);
    setIsLoading(true);
    setError(null);
    setCurrentQuery(topic);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filtrer les articles qui contiennent le sujet dans le titre, description ou tags
      const filteredNews = mockGoogleNews.filter(article =>
        article.title.toLowerCase().includes(topic.toLowerCase()) ||
        article.description.toLowerCase().includes(topic.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
      );
      
      console.log('📊 SUJET - Articles trouvés:', filteredNews.length);
      setArticles(filteredNews);
    } catch (err) {
      setError('Erreur lors de la recherche');
    } finally {
      setIsLoading(false);
    }
  };

  // Recherche par requête utilisateur - VERSION DEBUG
  const searchByQuery = async (query) => {
    console.log('🔍 RECHERCHE DÉMARRÉE POUR:', query);
    
    if (!query.trim()) {
      console.log('❌ Requête vide, arrêt');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCurrentQuery(query);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('📰 NOMBRE TOTAL D\'ARTICLES:', mockGoogleNews.length);
      console.log('📰 TOUS LES TITRES DISPONIBLES:');
      mockGoogleNews.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title}`);
        console.log(`   Tags: [${article.tags.join(', ')}]`);
      });
      
      const queryLower = query.toLowerCase();
      console.log('🎯 RECHERCHE POUR:', queryLower);
      
      // Filtrer les articles qui contiennent la requête
      const filteredNews = mockGoogleNews.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(queryLower);
        const descMatch = article.description.toLowerCase().includes(queryLower);
        const sourceMatch = article.source.toLowerCase().includes(queryLower);
        const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(queryLower));
        
        // Note: on enlève content car il n'existe pas dans vos données
        
        const hasMatch = titleMatch || descMatch || sourceMatch || tagsMatch;
        
        if (hasMatch) {
          console.log('✅ ARTICLE TROUVÉ:', article.title);
          console.log('   - Titre match:', titleMatch);
          console.log('   - Description match:', descMatch);
          console.log('   - Source match:', sourceMatch);
          console.log('   - Tags match:', tagsMatch, article.tags);
        }
        
        return hasMatch;
      });
      
      console.log('📊 RÉSULTATS FINAUX:', filteredNews.length, 'articles trouvés');
      filteredNews.forEach(article => {
        console.log('📄', article.title);
      });
      
      setArticles(filteredNews);
      console.log('📝 setArticles appelé avec', filteredNews.length, 'articles');
      
    } catch (err) {
      console.error('❌ ERREUR DE RECHERCHE:', err);
      setError('Erreur lors de la recherche');
    } finally {
      setIsLoading(false);
      console.log('✅ Recherche terminée, isLoading = false');
    }
  };

  // Effacer la recherche et revenir aux actualités générales
  const clearSearch = () => {
    console.log('🧹 EFFACEMENT DE LA RECHERCHE');
    setCurrentQuery('');
    setSearchTerm('');
    loadNews();
  };

  // Actualiser les actualités
  const refreshNews = () => {
    if (currentQuery) {
      // Si on est en mode recherche, relancer la recherche
      if (searchTerm) {
        searchByQuery(currentQuery);
      } else {
        searchByTopic(currentQuery);
      }
    } else {
      // Sinon charger les actualités générales
      loadNews();
    }
  };

  // Filtrage et tri des articles
  const filteredAndSortedArticles = useMemo(() => {
    console.log('🔄 FILTRAGE/TRI - Articles source:', articles.length);
    console.log('🔄 FILTRAGE/TRI - FilterType:', filterType);
    
    const filtered = articles
      .filter(article => {
        switch (filterType) {
          case 'breaking':
            return article.isBreaking;
          case 'verified':
            return article.isVerified;
          case 'favorites':
            return article.isFavorite;
          case 'unread':
            return !article.isRead;
          case 'all':
          default:
            return true;
        }
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'relevancy':
            // Tri par pertinence (breaking news en premier, puis par engagement)
            if (a.isBreaking && !b.isBreaking) return -1;
            if (!a.isBreaking && b.isBreaking) return 1;
            return b.engagement.views - a.engagement.views;
          case 'popularity':
            return b.engagement.views - a.engagement.views;
          case 'source':
            return a.source.localeCompare(b.source);
          case 'publishedAt':
          default:
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
      });
      
    console.log('🔄 FILTRAGE/TRI - Articles finaux:', filtered.length);
    filtered.forEach(article => {
      console.log('   -', article.title);
    });
    
    return filtered;
  }, [articles, filterType, sortBy]);

  // Charger les actualités au montage et quand les filtres changent
  useEffect(() => {
    console.log('⚡ useEffect déclenché - currentQuery:', currentQuery);
    if (!currentQuery) {
      loadNews();
    }
  }, [selectedCategory, selectedLocation]);

  return {
    searchTerm,
    setSearchTerm,
    currentQuery,
    articles,
    setArticles,
    filteredAndSortedArticles,
    isLoading,
    error,
    loadNews,
    searchByTopic,
    searchByQuery,
    clearSearch,
    refreshNews
  };
};

export default useGoogleNews;