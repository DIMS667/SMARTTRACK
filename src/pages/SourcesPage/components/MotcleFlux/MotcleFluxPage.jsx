// // src/pages/SourcesPage/components/MotcleFlux/MotcleFluxPage.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Filter, 
//   Grid, 
//   List, 
//   Calendar,
//   ExternalLink,
//   BookOpen,
//   TrendingUp,
//   Clock,
//   Tag,
//   Globe,
//   Star,
//   AlertCircle,
//   RefreshCw,
//   Trash2,
//   Edit,
//   MoreVertical,
//   Eye,
//   EyeOff,
//   Bookmark,
//   Share2,
//   CheckCircle2,
//   Sparkles
// } from 'lucide-react';

// // Données simulées d'articles trouvés par mot-clé
// const mockArticles = [
//   {
//     id: 1,
//     title: "Football : La Coupe du Monde 2026 préparations intensives",
//     description: "Les équipes se préparent activement pour la prochaine Coupe du Monde de football qui aura lieu en 2026. Les infrastructures sont en cours de finalisation dans les trois pays hôtes...",
//     source: "L'Équipe",
//     sourceUrl: "https://lequipe.fr",
//     sourceFavicon: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=32&h=32&fit=crop&crop=faces",
//     url: "https://lequipe.fr/football/article1",
//     publishedAt: new Date(Date.now() - 2 * 3600000), // 2h ago
//     keywords: ["football", "coupe du monde", "2026"],
//     category: "Sport",
//     readTime: "3 min",
//     isRead: false,
//     isFavorite: false,
//     isFollowed: false,
//     image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop",
//     matchedKeywords: ["football"],
//     engagement: { views: 1245, shares: 34, comments: 12 }
//   },
//   {
//     id: 2,
//     title: "Transferts football : Les dernières rumeurs du mercato estival",
//     description: "Le mercato estival bat son plein avec de nombreuses rumeurs de transferts dans le monde du football européen. Les clubs cherchent à renforcer leurs effectifs...",
//     source: "France Football",
//     sourceUrl: "https://francefootball.fr",
//     sourceFavicon: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
//     url: "https://francefootball.fr/transferts",
//     publishedAt: new Date(Date.now() - 4 * 3600000), // 4h ago
//     keywords: ["football", "transferts", "mercato"],
//     category: "Sport",
//     readTime: "5 min",
//     isRead: true,
//     isFavorite: true,
//     isFollowed: true,
//     image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=300&fit=crop",
//     matchedKeywords: ["football"],
//     engagement: { views: 2341, shares: 89, comments: 23 }
//   },
//   {
//     id: 3,
//     title: "Football féminin : Record d'audience pour la finale du championnat",
//     description: "La finale du championnat de football féminin a battu tous les records d'audience télévisée, marquant une étape importante pour le sport féminin en France...",
//     source: "RMC Sport",
//     sourceUrl: "https://rmcsport.bfmtv.com",
//     sourceFavicon: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
//     url: "https://rmcsport.bfmtv.com/football-feminin",
//     publishedAt: new Date(Date.now() - 6 * 3600000), // 6h ago
//     keywords: ["football", "féminin", "audience"],
//     category: "Sport",
//     readTime: "4 min",
//     isRead: false,
//     isFavorite: false,
//     isFollowed: false,
//     image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=300&fit=crop",
//     matchedKeywords: ["football"],
//     engagement: { views: 892, shares: 45, comments: 8 }
//   },
//   {
//     id: 4,
//     title: "Intelligence artificielle dans le football : La révolution tactique",
//     description: "L'IA transforme l'analyse tactique dans le football professionnel avec des outils de plus en plus sophistiqués. Les entraîneurs utilisent désormais des algorithmes avancés...",
//     source: "TechCrunch",
//     sourceUrl: "https://techcrunch.com",
//     sourceFavicon: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=faces",
//     url: "https://techcrunch.com/ai-football",
//     publishedAt: new Date(Date.now() - 12 * 3600000), // 12h ago
//     keywords: ["football", "intelligence artificielle", "tactique"],
//     category: "Tech",
//     readTime: "7 min",
//     isRead: false,
//     isFavorite: false,
//     isFollowed: false,
//     image: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=600&h=300&fit=crop",
//     matchedKeywords: ["football"],
//     engagement: { views: 3456, shares: 156, comments: 67 }
//   }
// ];

// // Mots-clés suggérés populaires
// const suggestedKeywords = [
//   { keyword: "football", count: 1250, trend: "up", color: "from-green-500 to-emerald-600" },
//   { keyword: "technologie", count: 890, trend: "up", color: "from-blue-500 to-cyan-600" },
//   { keyword: "climat", count: 654, trend: "stable", color: "from-yellow-500 to-orange-600" },
//   { keyword: "économie", count: 543, trend: "down", color: "from-red-500 to-pink-600" },
//   { keyword: "santé", count: 432, trend: "up", color: "from-purple-500 to-violet-600" },
//   { keyword: "politique", count: 321, trend: "stable", color: "from-indigo-500 to-blue-600" }
// ];

// const ArticleCard = ({ article, viewMode = 'grid', onToggleFavorite, onMarkAsRead, onToggleFollow }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const formatTimeAgo = (date) => {
//     const now = new Date();
//     const diff = now - date;
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
//     if (hours > 0) {
//       return `Il y a ${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
//     }
//     return `Il y a ${minutes}m`;
//   };

//   const getCategoryColor = (category) => {
//     const colorMap = {
//       'Sport': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
//       'Tech': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white',
//       'News': 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
//       'Business': 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
//     };
//     return colorMap[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
//   };

//   const formatNumber = (num) => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'k';
//     }
//     return num.toString();
//   };

//   if (viewMode === 'list') {
//     return (
//       <div 
//         className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-1 ${article.isRead ? 'opacity-75' : ''}`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="flex gap-6">
//           {/* Image */}
//           {article.image && (
//             <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-lg">
//               <img 
//                 src={article.image} 
//                 alt={article.title}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                 onError={(e) => e.target.style.display = 'none'}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//             </div>
//           )}
          
//           {/* Contenu */}
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between mb-3">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
//                   {article.category}
//                 </span>
//                 <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                   {article.sourceFavicon && (
//                     <img 
//                       src={article.sourceFavicon} 
//                       alt={article.source}
//                       className="w-4 h-4 rounded-full"
//                       onError={(e) => e.target.style.display = 'none'}
//                     />
//                   )}
//                   <span className="font-medium">{article.source}</span>
//                   <span>•</span>
//                   <span>{formatTimeAgo(article.publishedAt)}</span>
//                 </div>
//               </div>
              
//               <div className="relative">
//                 <button
//                   onClick={() => setShowMenu(!showMenu)}
//                   className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <MoreVertical className="w-4 h-4" />
//                 </button>
                
//                 {showMenu && (
//                   <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-700 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 py-2 z-20">
//                     <button
//                       onClick={() => { onToggleFollow(article.id); setShowMenu(false); }}
//                       className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
//                         article.isFollowed 
//                           ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' 
//                           : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
//                       }`}
//                     >
//                       <Eye className="w-4 h-4" />
//                       {article.isFollowed ? 'Ne plus suivre' : 'Suivre cet article'}
//                     </button>
//                     <button
//                       onClick={() => { onToggleFavorite(article.id); setShowMenu(false); }}
//                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                     >
//                       <Star className={`w-4 h-4 ${article.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
//                       {article.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
//                     </button>
//                     <button
//                       onClick={() => { onMarkAsRead(article.id); setShowMenu(false); }}
//                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                     >
//                       <BookOpen className="w-4 h-4" />
//                       {article.isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
//                     </button>
//                     <hr className="my-2 border-gray-200 dark:border-gray-600" />
//                     <button
//                       onClick={() => { setShowMenu(false); }}
//                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                     >
//                       <Share2 className="w-4 h-4" />
//                       Partager
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
//               {article.title}
//             </h3>
            
//             <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
//               {article.description}
//             </p>
            
//             <div className="flex items-center justify-between">
//               <div className="flex flex-wrap gap-2">
//                 {article.matchedKeywords.map((keyword, index) => (
//                   <span key={index} className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full font-medium">
//                     #{keyword}
//                   </span>
//                 ))}
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
//                   <span className="flex items-center gap-1">
//                     <Eye className="w-3 h-3" />
//                     {formatNumber(article.engagement.views)}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Share2 className="w-3 h-3" />
//                     {article.engagement.shares}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     {article.readTime}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => onToggleFollow(article.id)}
//                     className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
//                       article.isFollowed
//                         ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50'
//                         : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-900/30 dark:hover:text-orange-400'
//                     }`}
//                   >
//                     {article.isFollowed ? 'Suivi' : 'Suivre'}
//                   </button>
//                   <a
//                     href={article.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
//                   >
//                     <ExternalLink className="w-4 h-4" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Vue grille améliorée
//   return (
//     <div 
//       className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-2 group ${article.isRead ? 'opacity-75' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image avec overlay */}
//       {article.image && (
//         <div className="aspect-video relative overflow-hidden">
//           <img 
//             src={article.image} 
//             alt={article.title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//             onError={(e) => e.target.style.display = 'none'}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
//           {/* Boutons overlay */}
//           <div className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//             <button
//               onClick={() => onToggleFavorite(article.id)}
//               className={`p-2 rounded-full backdrop-blur-sm transition-all ${article.isFavorite ? 'bg-yellow-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'}`}
//             >
//               <Star className={`w-4 h-4 ${article.isFavorite ? 'fill-current' : ''}`} />
//             </button>
//             <button
//               onClick={() => onToggleFollow(article.id)}
//               className={`p-2 rounded-full backdrop-blur-sm transition-all ${
//                 article.isFollowed 
//                   ? 'bg-orange-500 text-white' 
//                   : 'bg-white/90 text-gray-700 hover:bg-white'
//               }`}
//             >
//               <Eye className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Catégorie */}
//           <div className="absolute top-3 left-3">
//             <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(article.category)}`}>
//               {article.category}
//             </span>
//           </div>

//           {/* Badge suivi */}
//           {article.isFollowed && (
//             <div className="absolute bottom-3 left-3">
//               <span className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
//                 <CheckCircle2 className="w-3 h-3" />
//                 Suivi
//               </span>
//             </div>
//           )}
//         </div>
//       )}
      
//       <div className="p-5">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//             {article.sourceFavicon && (
//               <img 
//                 src={article.sourceFavicon} 
//                 alt={article.source}
//                 className="w-4 h-4 rounded-full"
//                 onError={(e) => e.target.style.display = 'none'}
//               />
//             )}
//             <span className="font-medium">{article.source}</span>
//             <span>•</span>
//             <span>{formatTimeAgo(article.publishedAt)}</span>
//           </div>
//         </div>
        
//         <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer">
//           {article.title}
//         </h3>
        
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
//           {article.description}
//         </p>
        
//         <div className="flex flex-wrap gap-2 mb-4">
//           {article.matchedKeywords.map((keyword, index) => (
//             <span key={index} className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full font-medium">
//               #{keyword}
//             </span>
//           ))}
//         </div>

//         {/* Engagement metrics */}
//         <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-1">
//               <Eye className="w-3 h-3" />
//               {formatNumber(article.engagement.views)}
//             </span>
//             <span className="flex items-center gap-1">
//               <Share2 className="w-3 h-3" />
//               {article.engagement.shares}
//             </span>
//           </div>
//           <span className="flex items-center gap-1">
//             <Clock className="w-3 h-3" />
//             {article.readTime}
//           </span>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <button
//             onClick={() => onToggleFollow(article.id)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//               article.isFollowed
//                 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50'
//                 : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-900/30 dark:hover:text-orange-400'
//             }`}
//           >
//             <Eye className="w-4 h-4" />
//             {article.isFollowed ? 'Suivi' : 'Suivre'}
//           </button>
          
//           <div className="flex gap-2">
//             <button
//               onClick={() => onMarkAsRead(article.id)}
//               className={`p-2 rounded-lg transition-colors ${article.isRead ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'}`}
//               title={article.isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
//             >
//               <BookOpen className="w-4 h-4" />
//             </button>
//             <a
//               href={article.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
//             >
//               <ExternalLink className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const KeywordSuggestion = ({ keyword, count, trend, color, onClick }) => {
//   const getTrendIcon = () => {
//     switch (trend) {
//       case 'up': 
//         return <TrendingUp className="w-4 h-4 text-green-500" />;
//       case 'down': 
//         return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
//       default: 
//         return <div className="w-3 h-3 bg-yellow-400 rounded-full" />;
//     }
//   };

//   const getTrendText = () => {
//     switch (trend) {
//       case 'up': 
//         return 'En hausse';
//       case 'down': 
//         return 'En baisse';
//       default: 
//         return 'Stable';
//     }
//   };

//   return (
//     <button
//       onClick={() => onClick(keyword)}
//       className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-1"
//     >
//       <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
//       <div className="relative">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
//               <Tag className="w-5 h-5 text-white" />
//             </div>
//             <div className="text-left">
//               <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
//                 {keyword}
//               </h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {getTrendText()}
//               </p>
//             </div>
//           </div>
//           {getTrendIcon()}
//         </div>
        
//         <div className="flex items-center justify-between">
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">
//             {count.toLocaleString()}
//           </span>
//           <span className="text-sm text-gray-500 dark:text-gray-400">
//             articles
//           </span>
//         </div>
        
//         <div className="mt-3 flex items-center gap-2">
//           <Sparkles className="w-4 h-4 text-orange-500" />
//           <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
//             Rechercher maintenant
//           </span>
//         </div>
//       </div>
//     </button>
//   );
// };

// function MotcleFluxPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentKeyword, setCurrentKeyword] = useState('');
//   const [articles, setArticles] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('date');
//   const [filterCategory, setFilterCategory] = useState('all');

//   // Simulation de recherche
//   const performSearch = async (keyword) => {
//     if (!keyword.trim()) return;
    
//     setIsSearching(true);
//     setCurrentKeyword(keyword);
    
//     try {
//       // Simulation d'appel API
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Filtrer les articles qui contiennent le mot-clé
//       const filteredArticles = mockArticles.filter(article =>
//         article.title.toLowerCase().includes(keyword.toLowerCase()) ||
//         article.description.toLowerCase().includes(keyword.toLowerCase()) ||
//         article.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
//       );
      
//       setArticles(filteredArticles);
//     } catch (error) {
//       console.error('Erreur de recherche:', error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     performSearch(searchTerm);
//   };

//   const handleKeywordClick = (keyword) => {
//     setSearchTerm(keyword);
//     performSearch(keyword);
//   };

//   const handleToggleFavorite = (articleId) => {
//     setArticles(prev => prev.map(article =>
//       article.id === articleId 
//         ? { ...article, isFavorite: !article.isFavorite }
//         : article
//     ));
//   };

//   const handleMarkAsRead = (articleId) => {
//     setArticles(prev => prev.map(article =>
//       article.id === articleId 
//         ? { ...article, isRead: !article.isRead }
//         : article
//     ));
//   };

//   const handleToggleFollow = (articleId) => {
//     setArticles(prev => prev.map(article =>
//       article.id === articleId 
//         ? { ...article, isFollowed: !article.isFollowed }
//         : article
//     ));
    
//     // Afficher une notification
//     const article = articles.find(a => a.id === articleId);
//     if (article) {
//       const message = article.isFollowed 
//         ? `Vous ne suivez plus "${article.title}"` 
//         : `Vous suivez maintenant "${article.title}"`;
      
//       // Ici vous pourriez intégrer un système de notification
//       console.log(message);
//     }
//   };

//   // Filtrage et tri des articles
//   const filteredAndSortedArticles = articles
//     .filter(article => {
//       if (filterCategory === 'all') return true;
//       if (filterCategory === 'unread') return !article.isRead;
//       if (filterCategory === 'favorites') return article.isFavorite;
//       if (filterCategory === 'followed') return article.isFollowed;
//       return article.category === filterCategory;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'title':
//           return a.title.localeCompare(b.title);
//         case 'source':
//           return a.source.localeCompare(b.source);
//         case 'engagement':
//           return b.engagement.views - a.engagement.views;
//         case 'date':
//         default:
//           return new Date(b.publishedAt) - new Date(a.publishedAt);
//       }
//     });

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
//       {/* Header avec thème adaptatif */}
//       <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-6xl mx-auto px-6 py-12">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center">
//                 <Search className="w-8 h-8 text-orange-600 dark:text-orange-400" />
//               </div>
//             </div>
//             <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
//               Recherche par mot-clé
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
//               Découvrez des articles pertinents en recherchant par mots-clés spécifiques. 
//               Suivez les sujets qui vous intéressent.
//             </p>
//           </div>

//           {/* Formulaire de recherche amélioré */}
//           <form onSubmit={handleSearch} className="mb-8">
//             <div className="max-w-2xl mx-auto relative">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Entrez un mot-clé (ex: football, technologie, climat...)"
//                   className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 text-lg shadow-lg"
//                   disabled={isSearching}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={!searchTerm.trim() || isSearching}
//                 className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-lg"
//               >
//                 {isSearching ? (
//                   <RefreshCw className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Search className="w-5 h-5" />
//                 )}
//                 {isSearching ? 'Recherche...' : 'Rechercher'}
//               </button>
//             </div>
//           </form>

//           {/* Mots-clés suggérés - Affiché seulement quand pas de recherche active */}
//           {!currentKeyword && (
//             <div>
//               <div className="text-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                   Mots-clés populaires
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   Explorez les sujets tendances
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
//                 {suggestedKeywords.map((item, index) => (
//                   <KeywordSuggestion
//                     key={index}
//                     keyword={item.keyword}
//                     count={item.count}
//                     trend={item.trend}
//                     color={item.color}
//                     onClick={handleKeywordClick}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Résultats - Affiché seulement quand recherche active */}
//       {currentKeyword && (
//         <div className="flex-1 overflow-hidden">
//           {/* Barre de filtres améliorée */}
//           <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
//             <div className="max-w-6xl mx-auto px-6 py-4">
//               <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
//                       <Tag className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                         "{currentKeyword}"
//                       </h2>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {filteredAndSortedArticles.length} article{filteredAndSortedArticles.length > 1 ? 's' : ''} trouvé{filteredAndSortedArticles.length > 1 ? 's' : ''}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setCurrentKeyword('');
//                       setSearchTerm('');
//                       setArticles([]);
//                     }}
//                     className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium hover:underline"
//                   >
//                     Nouvelle recherche
//                   </button>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   <select
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[120px]"
//                   >
//                     <option value="all">Tous</option>
//                     <option value="unread">Non lus</option>
//                     <option value="favorites">Favoris</option>
//                     <option value="followed">Suivis</option>
//                     <option value="Sport">Sport</option>
//                     <option value="Tech">Tech</option>
//                     <option value="News">News</option>
//                   </select>

//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[140px]"
//                   >
//                     <option value="date">Plus récent</option>
//                     <option value="engagement">Plus populaire</option>
//                     <option value="title">Titre A-Z</option>
//                     <option value="source">Source</option>
//                   </select>

//                   <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
//                     <button
//                       onClick={() => setViewMode('grid')}
//                       className={`p-2 ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
//                       title="Vue grille"
//                     >
//                       <Grid className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`p-2 ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
//                       title="Vue liste"
//                     >
//                       <List className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Liste des articles */}
//           <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
//             <div className="max-w-6xl mx-auto">
//               {isSearching ? (
//                 <div className="text-center py-16">
//                   <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                     <RefreshCw className="w-8 h-8 text-white animate-spin" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
//                     Recherche en cours...
//                   </h3>
//                   <p className="text-gray-500 dark:text-gray-400 text-lg">
//                     Nous analysons des milliers d'articles pour "{currentKeyword}"
//                   </p>
//                 </div>
//               ) : filteredAndSortedArticles.length > 0 ? (
//                 <div className={viewMode === 'grid' 
//                   ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
//                   : 'space-y-6'
//                 }>
//                   {filteredAndSortedArticles.map((article) => (
//                     <ArticleCard
//                       key={article.id}
//                       article={article}
//                       viewMode={viewMode}
//                       onToggleFavorite={handleToggleFavorite}
//                       onMarkAsRead={handleMarkAsRead}
//                       onToggleFollow={handleToggleFollow}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-16">
//                   <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                     <Search className="w-12 h-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
//                     Aucun article trouvé
//                   </h3>
//                   <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
//                     Aucun article ne correspond au mot-clé "{currentKeyword}". 
//                     Essayez avec d'autres termes ou explorez nos suggestions.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setCurrentKeyword('');
//                       setSearchTerm('');
//                       setArticles([]);
//                     }}
//                     className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-lg"
//                   >
//                     Nouvelle recherche
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MotcleFluxPage;


// src/pages/SourcesPage/components/MotcleFlux/MotcleFluxPage.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Components
import {
  ContentTypeSelector,
  SearchForm,
  FilterBar,
  KeywordSuggestion,
  ArticleCard,
  EmptyState
} from './components';

// Hooks
import { useKeywordSearch, useArticleActions } from './hooks';

// Constants
import { SUGGESTED_KEYWORDS } from './constants';

function MotcleFluxPage() {
  const [selectedContentTypes, setSelectedContentTypes] = useState(['all']);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('all');

  const {
    searchTerm,
    setSearchTerm,
    currentKeyword,
    articles,
    setArticles,
    isSearching,
    filteredAndSortedArticles,
    performSearch,
    clearSearch
  } = useKeywordSearch({
    selectedContentTypes,
    sortBy,
    filterCategory
  });

  const {
    handleToggleFavorite,
    handleMarkAsRead,
    handleToggleFollow
  } = useArticleActions(articles, setArticles);

  // Gestion des types de contenu
  const handleContentTypeChange = (typeId) => {
    if (typeId === 'all') {
      setSelectedContentTypes(['all']);
    } else {
      setSelectedContentTypes(prev => {
        const newTypes = prev.filter(t => t !== 'all');
        if (newTypes.includes(typeId)) {
          const filtered = newTypes.filter(t => t !== typeId);
          return filtered.length === 0 ? ['all'] : filtered;
        } else {
          return [...newTypes, typeId];
        }
      });
    }
  };

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
    performSearch(keyword);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Header avec thème adaptatif */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center">
                <Search className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              Recherche par mot-clé
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Découvrez des articles pertinents en recherchant par mots-clés spécifiques. 
              Choisissez le type de contenu qui vous intéresse.
            </p>
          </div>

          {/* Sélecteur de types de contenu */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Types de contenu
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sélectionnez les formats que vous souhaitez surveiller
              </p>
            </div>
            <ContentTypeSelector 
              selectedTypes={selectedContentTypes}
              onTypeChange={handleContentTypeChange}
            />
          </div>

          {/* Formulaire de recherche */}
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={performSearch}
            isSearching={isSearching}
          />

          {/* Mots-clés suggérés - Affiché seulement quand pas de recherche active */}
          {!currentKeyword && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Mots-clés populaires
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explorez les sujets tendances
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                {SUGGESTED_KEYWORDS.map((item, index) => (
                  <KeywordSuggestion
                    key={index}
                    {...item}
                    onClick={handleKeywordClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Résultats - Affiché seulement quand recherche active */}
      {currentKeyword && (
        <div className="flex-1 overflow-hidden">
          {/* Barre de filtres */}
          <FilterBar
            currentKeyword={currentKeyword}
            filteredCount={filteredAndSortedArticles.length}
            selectedContentTypes={selectedContentTypes}
            onContentTypeChange={handleContentTypeChange}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onClearSearch={clearSearch}
          />

          {/* Liste des articles */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              {isSearching ? (
                <EmptyState
                  type="loading"
                  keyword={currentKeyword}
                />
              ) : filteredAndSortedArticles.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-6'
                }>
                  {filteredAndSortedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      viewMode={viewMode}
                      onToggleFavorite={handleToggleFavorite}
                      onMarkAsRead={handleMarkAsRead}
                      onToggleFollow={handleToggleFollow}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  type="no-results"
                  keyword={currentKeyword}
                  onClearSearch={clearSearch}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MotcleFluxPage;