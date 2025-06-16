// //useFilters.js

// import { useState, useMemo } from 'react';

// export const useFilters = (articles, feeds) => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedFeed, setSelectedFeed] = useState("All");
//   const [sortBy, setSortBy] = useState("newest");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [feedSearchQuery, setFeedSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("cards"); // cards, list, expanded, column, magazine

//   // Filtrer les articles
//   const filteredArticles = useMemo(() => {
//     return articles.filter(article => {
//       const categoryMatch = selectedCategory === "All" || article.category === selectedCategory;
//       const feedMatch = selectedFeed === "All" || article.feedId.toString() === selectedFeed;
//       const searchMatch = searchQuery === "" || 
//         article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         article.author.toLowerCase().includes(searchQuery.toLowerCase());
//       return categoryMatch && feedMatch && searchMatch;
//     });
//   }, [articles, selectedCategory, selectedFeed, searchQuery]);

//   // Trier les articles
//   const sortedArticles = useMemo(() => {
//     return [...filteredArticles].sort((a, b) => {
//       switch (sortBy) {
//         case "newest":
//           return new Date(b.publishedAt) - new Date(a.publishedAt);
//         case "oldest":
//           return new Date(a.publishedAt) - new Date(b.publishedAt);
//         case "unread":
//           return a.isRead - b.isRead;
//         default:
//           return 0;
//       }
//     });
//   }, [filteredArticles, sortBy]);

//   // Filtrer les flux pour la recherche
//   const filteredFeeds = useMemo(() => {
//     return feeds.filter(feed =>
//       feedSearchQuery === "" || 
//       feed.name.toLowerCase().includes(feedSearchQuery.toLowerCase()) ||
//       feed.description.toLowerCase().includes(feedSearchQuery.toLowerCase())
//     );
//   }, [feeds, feedSearchQuery]);

//   return {
//     // States
//     selectedCategory,
//     selectedFeed,
//     sortBy,
//     searchQuery,
//     feedSearchQuery,
//     viewMode,
    
//     // Setters
//     setSelectedCategory,
//     setSelectedFeed,
//     setSortBy,
//     setSearchQuery,
//     setFeedSearchQuery,
//     setViewMode,
    
//     // Computed values
//     filteredArticles,
//     sortedArticles,
//     filteredFeeds
//   };
// };

import { useState, useMemo } from 'react';

export const useFilters = (articles, feeds) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFeed, setSelectedFeed] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedSearchQuery, setFeedSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // cards, list, expanded, column, magazine

  // Filtrer les articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const categoryMatch = selectedCategory === "All" || article.category === selectedCategory;
      const feedMatch = selectedFeed === "All" || article.feedId.toString() === selectedFeed;
      const searchMatch = searchQuery === "" || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()));
      return categoryMatch && feedMatch && searchMatch;
    });
  }, [articles, selectedCategory, selectedFeed, searchQuery]);

  // Trier les articles
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case "oldest":
          return new Date(a.publishedAt) - new Date(b.publishedAt);
        case "title":
          return a.title.localeCompare(b.title);
        case "source":
          return (a.source || '').localeCompare(b.source || '');
        case "unread":
          if (a.isRead === b.isRead) {
            // Si même statut de lecture, trier par date (plus récent d'abord)
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          }
          // Articles non lus en premier (isRead = false en premier)
          return a.isRead - b.isRead;
        default:
          return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
    });
  }, [filteredArticles, sortBy]);

  // Filtrer les flux pour la recherche
  const filteredFeeds = useMemo(() => {
    return feeds.filter(feed =>
      feedSearchQuery === "" || 
      feed.name.toLowerCase().includes(feedSearchQuery.toLowerCase()) ||
      (feed.description && feed.description.toLowerCase().includes(feedSearchQuery.toLowerCase())) ||
      (feed.url && feed.url.toLowerCase().includes(feedSearchQuery.toLowerCase()))
    );
  }, [feeds, feedSearchQuery]);

  return {
    // States
    selectedCategory,
    selectedFeed,
    sortBy,
    searchQuery,
    feedSearchQuery,
    viewMode,
    
    // Setters
    setSelectedCategory,
    setSelectedFeed,
    setSortBy,
    setSearchQuery,
    setFeedSearchQuery,
    setViewMode,
    
    // Computed values
    filteredArticles,
    sortedArticles,
    filteredFeeds
  };
};