// src/pages/SourcesPage/components/HashtagFlux/constants/index.js
import { 
  Globe,
  FileText,
  Video,
  MessageSquare,
  Download,
  Image,
  Music,
  Link
} from 'lucide-react';

// Mapping des icônes
const iconComponents = {
  Globe,
  FileText,
  Video,
  MessageSquare,
  Download,
  Image,
  Music,
  Link
};

// Types de contenu disponibles
export const contentTypes = [
  { id: "all", name: "Tout", icon: Globe, color: "from-gray-500 to-gray-600", description: "Tous types de contenu" },
  { id: "article", name: "Articles", icon: FileText, color: "from-blue-500 to-cyan-600", description: "Articles de blog et actualités" },
  { id: "video", name: "Vidéos", icon: Video, color: "from-red-500 to-pink-600", description: "YouTube, TikTok, Instagram" },
  { id: "post", name: "Posts sociaux", icon: MessageSquare, color: "from-purple-500 to-violet-600", description: "Twitter, Facebook, LinkedIn" },
  { id: "document", name: "Documents", icon: Download, color: "from-green-500 to-emerald-600", description: "PDF, Word, PowerPoint" },
  { id: "image", name: "Images", icon: Image, color: "from-yellow-500 to-orange-600", description: "Photos et infographies" },
  { id: "audio", name: "Audio", icon: Music, color: "from-indigo-500 to-purple-600", description: "Podcasts et musique" },
  { id: "link", name: "Liens", icon: Link, color: "from-teal-500 to-cyan-600", description: "Pages web et ressources" }
];

// Options de tri
export const SORT_OPTIONS = [
  { value: 'date', label: 'Plus récent' },
  { value: 'engagement', label: 'Plus vues' },
  { value: 'likes', label: 'Plus aimé' },
  { value: 'title', label: 'Titre A-Z' },
  { value: 'source', label: 'Source' }
];

// Options de filtrage par catégorie
export const FILTER_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'trending', label: 'Tendances' },
  { value: 'unread', label: 'Non lus' },
  { value: 'favorites', label: 'Favoris' },
  { value: 'followed', label: 'Suivis' },
  { value: 'Tech', label: 'Tech' },
  { value: 'Business', label: 'Business' },
  { value: 'Environment', label: 'Environment' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Music', label: 'Music' }
];

export { iconComponents };