
//useArticles.js
import { useState } from 'react';
import { useSharedFavorites } from '../../FavorisPage/hooks/useSharedFavorites';
import defaultImage from '/src/assets/undraw_hot-air-balloon_6knx.svg';

// Données fictives pour les articles
const FAKE_ARTICLES = [
  {
    id: 1,
    title: "L'Intelligence Artificielle révolutionne l'industrie pharmaceutique",
    author: "Sarah Chen",
    publishedAt: "2025-06-11T08:30:00Z",
    readTime: "5 min",
    category: "Technology",
    excerpt: "Les dernières avancées en IA permettent d'accélérer la découverte de nouveaux médicaments et de personnaliser les traitements selon les patients. Cette révolution technologique promet de transformer fondamentalement l'approche médicale moderne.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    isRead: false,
    isFavorite: false,
    tags: ["IA", "Santé", "Innovation"],
    feedId: 1,
    feedName: "TechCrunch",
    feedColor: "#ff6b35"
  },
  {
    id: 2,
    title: "Le télétravail transforme l'architecture urbaine",
    author: "Pierre Dubois",
    publishedAt: "2025-06-11T07:15:00Z",
    readTime: "8 min",
    category: "Society",
    excerpt: "Avec la généralisation du télétravail, les villes repensent leurs espaces de bureaux et développent de nouveaux concepts d'aménagement. Les architectes imaginent des solutions innovantes pour adapter nos environnements urbains.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    isRead: true,
    isFavorite: true,
    tags: ["Urbanisme", "Travail", "Architecture"],
    feedId: 2,
    feedName: "Le Monde",
    feedColor: "#1e3a8a"
  },
  {
    id: 3,
    title: "Breakthrough in Quantum Computing reaches new milestone",
    author: "Dr. Lisa Wang",
    publishedAt: "2025-06-11T06:45:00Z",
    readTime: "12 min",
    category: "Science",
    excerpt: "Researchers at MIT have successfully demonstrated quantum supremacy in a practical application, opening new possibilities for cryptography and simulation. Cette avancée majeure pourrait révolutionner le calcul informatique.",
    // Pas d'image - utilisera l'image par défaut
    image: null,
    isRead: false,
    isFavorite: false,
    tags: ["Quantum", "Research", "Computing"],
    feedId: 3,
    feedName: "Nature",
    feedColor: "#059669"
  },
  {
    id: 4,
    title: "L'économie circulaire gagne du terrain en Europe",
    author: "Marie Laurent",
    publishedAt: "2025-06-10T16:20:00Z",
    readTime: "6 min",
    category: "Economy",
    excerpt: "Les entreprises européennes adoptent massivement les principes de l'économie circulaire, réduisant leurs déchets de 40% en moyenne. Cette transformation écologique s'accompagne de nouveaux modèles économiques durables.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
    isRead: false,
    isFavorite: false,
    tags: ["Écologie", "Économie", "Europe"],
    feedId: 4,
    feedName: "Les Échos",
    feedColor: "#dc2626"
  },
  {
    id: 5,
    title: "Space Tourism takes off with affordable orbital flights",
    author: "Michael Torres",
    publishedAt: "2025-06-10T14:30:00Z",
    readTime: "7 min",
    category: "Space",
    excerpt: "New space companies are making orbital flights accessible to middle-class travelers, with prices dropping below $50,000 per seat. Cette démocratisation de l'espace ouvre de nouvelles perspectives pour le tourisme spatial.",
    // Pas d'image - utilisera l'image par défaut
    image: "",
    isRead: false,
    isFavorite: true,
    tags: ["Space", "Tourism", "Innovation"],
    feedId: 1,
    feedName: "TechCrunch",
    feedColor: "#ff6b35"
  },
  {
    id: 6,
    title: "Les énergies renouvelables atteignent un record historique",
    author: "Jean Martin",
    publishedAt: "2025-06-10T12:00:00Z",
    readTime: "4 min",
    category: "Environment",
    excerpt: "La production d'énergie renouvelable a franchi la barre des 30% de la production mondiale totale, marquant un tournant décisif dans la transition énergétique globale.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
    isRead: false,
    isFavorite: false,
    tags: ["Énergie", "Environnement", "Renouvelable"],
    feedId: 2,
    feedName: "Le Monde",
    feedColor: "#1e3a8a"
  },
  {
    id: 7,
    title: "L'Inde devient la 3e puissance économique mondiale",
    author: "Priya Sharma",
    publishedAt: "2025-06-09T11:17:00Z",
    readTime: "12 min",
    category: "Economy",
    excerpt: "Avec un PIB dépassant celui du Japon, l'Inde confirme son statut de géant économique émergent. Cette progression s'accompagne de défis majeurs en matière d'inégalités et d'environnement.",
    // Pas d'image - utilisera l'image par défaut
    image: undefined,
    isRead: false,
    isFavorite: false,
    tags: ["Inde", "Économie", "Croissance"],
    feedId: 4,
    feedName: "Les Échos",
    feedColor: "#dc2626"
  },
  {
    id: 8,
    title: "Nouvelle découverte archéologique en Égypte",
    author: "Ahmed Hassan",
    publishedAt: "2025-06-09T09:30:00Z",
    readTime: "6 min",
    category: "Science",
    excerpt: "Une équipe internationale d'archéologues a mis au jour un temple datant de l'Ancien Empire, révélant de nouveaux secrets sur la civilisation pharaonique.",
    // Image vide - utilisera l'image par défaut
    image: " ",
    isRead: false,
    isFavorite: false,
    tags: ["Archéologie", "Égypte", "Histoire"],
    feedId: 3,
    feedName: "Nature",
    feedColor: "#059669"
  }
];

export const useArticles = () => {
  const [articles, setArticles] = useState(FAKE_ARTICLES);
  const [articleNotes, setArticleNotes] = useState({});
  const { toggleFavorite: toggleGlobalFavorite, isFavorite } = useSharedFavorites();

  // Fonction utilitaire pour obtenir l'image à afficher
  const getArticleImage = (article) => {
    // Vérifier si l'article a une image valide
    if (article.image && 
        article.image.trim() !== '' && 
        article.image !== null && 
        article.image !== undefined) {
      return article.image;
    }
    // Retourner l'image par défaut si pas d'image
    return defaultImage;
  };

  const toggleRead = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, isRead: !article.isRead } : article
    ));
  };

  const toggleFavorite = (id) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      // Mettre à jour l'état global des favoris
      const newFavoriteState = toggleGlobalFavorite(article);
      
      // Mettre à jour l'état local
      setArticles(articles.map(a => 
        a.id === id ? { ...a, isFavorite: newFavoriteState } : a
      ));
    }
  };

  const markAllAsRead = () => {
    setArticles(articles.map(article => ({ ...article, isRead: true })));
  };

  const markAsReadByAge = (maxAgeInHours) => {
    const now = new Date();
    const cutoffTime = new Date(now.getTime() - (maxAgeInHours * 60 * 60 * 1000));
    
    setArticles(articles.map(article => {
      const articleDate = new Date(article.publishedAt);
      if (articleDate < cutoffTime && !article.isRead) {
        return { ...article, isRead: true };
      }
      return article;
    }));
  };

  const updateArticleNote = (articleId, note) => {
    setArticleNotes(prev => ({
      ...prev,
      [articleId]: note
    }));
  };

  const getArticleNote = (articleId) => {
    return articleNotes[articleId] || '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  // Synchroniser l'état local avec l'état global des favoris et ajouter l'image par défaut
  const getArticlesWithFavoriteState = () => {
    return articles.map(article => ({
      ...article,
      isFavorite: isFavorite(article.id),
      displayImage: getArticleImage(article) // Ajouter l'image à afficher
    }));
  };

  return {
    articles: getArticlesWithFavoriteState(),
    toggleRead,
    toggleFavorite,
    markAllAsRead,
    markAsReadByAge,
    formatDate,
    updateArticleNote,
    getArticleNote,
    getArticleImage // Exporter la fonction utilitaire
  };
};