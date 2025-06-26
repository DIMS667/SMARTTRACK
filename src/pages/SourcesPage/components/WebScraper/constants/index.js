// src/pages/SourcesPage/components/WebScraper/constants/index.js
import { 
  Newspaper, 
  Code, 
  TrendingUp, 
  Heart, 
  Briefcase, 
  Gamepad2,
  Globe,
  Zap,
  Users,
  BookOpen
} from 'lucide-react';

// Types de sites web
export const WEBSITE_TYPES = [
  {
    id: 'all',
    name: 'Tous',
    description: 'Tous types de sites',
    examples: 'Toutes catégories',
    icon: Globe,
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'news',
    name: 'Actualités',
    description: 'Sites d\'information et presse',
    examples: 'BBC, CNN, Le Monde',
    icon: Newspaper,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'tech',
    name: 'Technologie',
    description: 'Sites tech et innovation',
    examples: 'TechCrunch, Wired, Ars Technica',
    icon: Code,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Finance et économie',
    examples: 'Forbes, Bloomberg, Les Échos',
    icon: Briefcase,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Mode, santé, bien-être',
    examples: 'Vogue, Health, Marie Claire',
    icon: Heart,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Actualités sportives',
    examples: 'ESPN, L\'Équipe, Sky Sports',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Jeux vidéo et esports',
    examples: 'IGN, GameSpot, Polygon',
    icon: Gamepad2,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'education',
    name: 'Éducation',
    description: 'Contenu éducatif et académique',
    examples: 'Khan Academy, Coursera, edX',
    icon: BookOpen,
    color: 'from-teal-500 to-teal-600'
  }
];

// Sites populaires suggérés
export const POPULAR_WEBSITES = [
  {
    name: 'Le Monde',
    url: 'https://lemonde.fr',
    description: 'Journal français de référence pour l\'actualité nationale et internationale',
    category: 'Actualités',
    subscribers: 2500000,
    trending: true,
    favicon: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=32&h=32&fit=crop',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com',
    description: 'Actualités tech, startups et innovation technologique',
    category: 'Technologie',
    subscribers: 8500000,
    trending: true,
    favicon: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=32&h=32&fit=crop',
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'BBC News',
    url: 'https://bbc.com/news',
    description: 'Service d\'information de la BBC, actualités mondiales fiables',
    category: 'Actualités',
    subscribers: 15000000,
    trending: false,
    favicon: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=32&h=32&fit=crop',
    color: 'from-red-500 to-red-600'
  },
  {
    name: 'Forbes',
    url: 'https://forbes.com',
    description: 'Magazine business, finance et actualités économiques',
    category: 'Business',
    subscribers: 6200000,
    trending: false,
    favicon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=32&h=32&fit=crop',
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Reuters',
    url: 'https://reuters.com',
    description: 'Agence de presse internationale, actualités en temps réel',
    category: 'Actualités',
    subscribers: 4800000,
    trending: true,
    favicon: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=32&h=32&fit=crop',
    color: 'from-orange-500 to-orange-600'
  },
  {
    name: 'The Guardian',
    url: 'https://theguardian.com',
    description: 'Journal britannique progressiste, actualités et opinions',
    category: 'Actualités',
    subscribers: 7300000,
    trending: false,
    favicon: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=32&h=32&fit=crop',
    color: 'from-blue-500 to-teal-500'
  }
];

// Options de tri
export const SORT_OPTIONS = [
  { value: 'date', label: 'Plus récent' },
  { value: 'popularity', label: 'Popularité' },
  { value: 'relevance', label: 'Pertinence' },
  { value: 'source', label: 'Source' }
];

// Options de filtrage
export const FILTER_OPTIONS = [
  { value: 'all', label: 'Tous les articles' },
  { value: 'recent', label: 'Récents (24h)' },
  { value: 'trending', label: 'Tendances' },
  { value: 'favorites', label: 'Favoris' },
  { value: 'unread', label: 'Non lus' }
];

// Statuts de scrapping
export const SCRAPING_STATUS = {
  IDLE: 'idle',
  SCRAPING: 'scraping',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  INVALID_URL: 'URL invalide ou inaccessible',
  NETWORK_ERROR: 'Erreur de connexion réseau',
  SCRAPING_FAILED: 'Échec du scrapping du site',
  NO_CONTENT: 'Aucun contenu trouvé sur cette page',
  RATE_LIMITED: 'Trop de requêtes, veuillez patienter'
};