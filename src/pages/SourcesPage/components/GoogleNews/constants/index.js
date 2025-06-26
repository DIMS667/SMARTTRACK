// src/pages/SourcesPage/components/GoogleNews/constants/index.js
import { 
  Globe,
  Newspaper,
  Trophy,
  Laptop,
  Heart,
  DollarSign,
  Briefcase,
  Gamepad2,
  Film,
  Zap
} from 'lucide-react';

// Catégories Google News
export const NEWS_CATEGORIES = [
  { id: "all", name: "Toutes", icon: Globe, color: "from-gray-500 to-gray-600", description: "Toutes les actualités" },
  { id: "general", name: "Actualités", icon: Newspaper, color: "from-blue-500 to-cyan-600", description: "Actualités générales" },
  { id: "sports", name: "Sport", icon: Trophy, color: "from-green-500 to-emerald-600", description: "Sport et compétitions" },
  { id: "technology", name: "Tech", icon: Laptop, color: "from-purple-500 to-violet-600", description: "Technologie et innovation" },
  { id: "health", name: "Santé", icon: Heart, color: "from-red-500 to-pink-600", description: "Santé et bien-être" },
  { id: "business", name: "Économie", icon: DollarSign, color: "from-yellow-500 to-orange-600", description: "Économie et finance" },
  { id: "entertainment", name: "Culture", icon: Film, color: "from-pink-500 to-rose-600", description: "Culture et spectacles" },
  { id: "science", name: "Science", icon: Zap, color: "from-indigo-500 to-blue-600", description: "Sciences et recherche" }
];

// Localisations
export const LOCATIONS = [
  { id: "fr", name: "France", country: "France", flag: "🇫🇷" },
  { id: "world", name: "International", country: "Monde", flag: "🌍" },
  { id: "eu", name: "Europe", country: "Europe", flag: "🇪🇺" },
  { id: "us", name: "États-Unis", country: "États-Unis", flag: "🇺🇸" },
  { id: "uk", name: "Royaume-Uni", country: "Royaume-Uni", flag: "🇬🇧" },
  { id: "de", name: "Allemagne", country: "Allemagne", flag: "🇩🇪" }
];

// Options de tri
export const SORT_OPTIONS = [
  { value: 'publishedAt', label: 'Plus récent' },
  { value: 'relevancy', label: 'Pertinence' },
  { value: 'popularity', label: 'Popularité' },
  { value: 'source', label: 'Source A-Z' }
];

// Options de filtrage
export const FILTER_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'breaking', label: 'Dernière heure' },
  { value: 'verified', label: 'Sources vérifiées' },
  { value: 'favorites', label: 'Favoris' },
  { value: 'unread', label: 'Non lus' }
];

// Sujets tendances
export const TRENDING_TOPICS = [
  { topic: "Élections européennes", count: 1250, trend: "up", category: "general" },
  { topic: "Euro 2024", count: 980, trend: "up", category: "sports" },
  { topic: "Intelligence artificielle", count: 756, trend: "stable", category: "technology" },
  { topic: "Changement climatique", count: 642, trend: "up", category: "science" },
  { topic: "Inflation en France", count: 523, trend: "down", category: "business" },
  { topic: "Festival de Cannes", count: 445, trend: "up", category: "entertainment" }
];