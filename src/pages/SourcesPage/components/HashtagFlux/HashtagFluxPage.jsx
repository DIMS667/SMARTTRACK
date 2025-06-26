// // src/pages/SourcesPage/components/HashtagFlux/HashtagFluxPage.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Hash, 
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
//   Sparkles,
//   Flame,
//   Award,
//   Users,
//   BarChart3,
//   FileText,
//   Video,
//   Image,
//   Music,
//   Download,
//   Link,
//   MessageSquare
// } from 'lucide-react';

// // Import des données depuis le fichier JSON
// import mockData from './hashtagMockData.json';

// // Mapping des icônes
// const iconComponents = {
//   Globe,
//   FileText,
//   Video,
//   MessageSquare,
//   Download,
//   Image,
//   Music,
//   Link
// };

// // Types de contenu disponibles - maintenant importés depuis le JSON
// const contentTypes = mockData.contentTypes.map(type => ({
//   ...type,
//   icon: iconComponents[type.icon]
// }));

// // Fonction pour convertir les dates string en objets Date
// const parseDates = (articles) => {
//   return articles.map(article => ({
//     ...article,
//     publishedAt: new Date(article.publishedAt)
//   }));
// };

// // Données d'articles - maintenant importées depuis le JSON
// const mockHashtagArticles = parseDates(mockData.articles);

// // Hashtags populaires et tendances - maintenant importés depuis le JSON
// const trendingHashtags = mockData.trendingHashtags;

// const ContentTypeSelector = ({ selectedTypes, onTypeChange, isCompact = false }) => {
//   if (isCompact) {
//     return (
//       <div className="flex flex-wrap gap-2">
//         {contentTypes.map((type) => (
//           <button
//             key={type.id}
//             onClick={() => onTypeChange(type.id)}
//             className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//               selectedTypes.includes(type.id)
//                 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-300 dark:border-orange-600'
//                 : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/10 border border-gray-200 dark:border-gray-600'
//             }`}
//           >
//             <type.icon className="w-4 h-4" />
//             {type.name}
//           </button>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {contentTypes.map((type) => (
//         <button
//           key={type.id}
//           onClick={() => onTypeChange(type.id)}
//           className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
//             selectedTypes.includes(type.id)
//               ? 'border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 shadow-lg'
//               : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600'
//           }`}
//         >
//           <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-5 ${selectedTypes.includes(type.id) ? 'opacity-10' : ''}`} />
          
//           <div className="relative">
//             <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
//               <type.icon className="w-6 h-6 text-white" />
//             </div>
            
//             <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-1">
//               {type.name}
//             </h3>
            
//             <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
//               {type.description}
//             </p>
            
//             {selectedTypes.includes(type.id) && (
//               <div className="absolute top-2 right-2">
//                 <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//               </div>
//             )}
//           </div>
//         </button>
//       ))}
//     </div>
//   );
// };

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
//       'Tech': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white',
//       'Business': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white',
//       'Environment': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
//       'Finance': 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white',
//       'News': 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
//       'Design': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
//       'Marketing': 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white',
//       'Music': 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white',
//       'Social': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
//     };
//     return colorMap[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
//   };

//   const getSentimentColor = (sentiment) => {
//     const sentimentMap = {
//       'positive': 'text-green-500',
//       'negative': 'text-red-500',
//       'neutral': 'text-yellow-500'
//     };
//     return sentimentMap[sentiment] || 'text-gray-500';
//   };

//   const getSentimentIcon = (sentiment) => {
//     switch (sentiment) {
//       case 'positive': return '😊';
//       case 'negative': return '😟';
//       case 'neutral': return '😐';
//       default: return '😐';
//     }
//   };

//   const formatNumber = (num) => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'k';
//     }
//     return num.toString();
//   };

//   const getContentTypeIcon = (contentType) => {
//     const type = contentTypes.find(t => t.id === contentType);
//     return type ? type.icon : FileText;
//   };

//   const getContentTypeColor = (contentType) => {
//     const type = contentTypes.find(t => t.id === contentType);
//     return type ? type.color : 'from-gray-500 to-gray-600';
//   };

//   const getContentInfo = (article) => {
//     switch (article.contentType) {
//       case 'video':
//         return { label: 'Durée', value: article.duration };
//       case 'document':
//         return { label: 'Taille', value: `${article.fileSize} (${article.fileType})` };
//       case 'post':
//         return { label: 'Plateforme', value: `${article.platform} - ${article.threadLength || ''}` };
//       case 'article':
//       default:
//         return { label: 'Lecture', value: article.readTime };
//     }
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
//               {article.trending && (
//                 <div className="absolute top-2 left-2">
//                   <Flame className="w-4 h-4 text-orange-500" />
//                 </div>
//               )}
//             </div>
//           )}
          
//           {/* Contenu */}
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between mb-3">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
//                   {article.category}
//                 </span>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getContentTypeColor(article.contentType)} text-white`}>
//                   {React.createElement(getContentTypeIcon(article.contentType), { className: "w-3 h-3 inline mr-1" })}
//                   {contentTypes.find(t => t.id === article.contentType)?.name || 'Article'}
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
//                   <span>•</span>
//                   <span className={getSentimentColor(article.sentiment)}>
//                     {getSentimentIcon(article.sentiment)}
//                   </span>
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
//                 {article.matchedHashtags.map((hashtag, index) => (
//                   <span key={index} className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full font-medium">
//                     {hashtag}
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
//                     {React.createElement(getContentTypeIcon(article.contentType), { className: "w-3 h-3" })}
//                     {getContentInfo(article).value}
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

//   // Vue grille
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
          
//           {/* Badge trending */}
//           {article.trending && (
//             <div className="absolute top-3 left-3">
//               <span className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
//                 <Flame className="w-3 h-3" />
//                 Tendance
//               </span>
//             </div>
//           )}
          
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

//           {/* Catégorie et Type de contenu */}
//           <div className="absolute bottom-3 left-3 flex gap-2">
//             <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(article.category)}`}>
//               {article.category}
//             </span>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-gradient-to-r ${getContentTypeColor(article.contentType)} text-white`}>
//               {React.createElement(getContentTypeIcon(article.contentType), { className: "w-3 h-3 inline mr-1" })}
//               {contentTypes.find(t => t.id === article.contentType)?.name || 'Article'}
//             </span>
//           </div>

//           {/* Badge suivi */}
//           {article.isFollowed && (
//             <div className="absolute bottom-3 right-3">
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
//             <span>•</span>
//             <span className={getSentimentColor(article.sentiment)} title={`Sentiment ${article.sentiment}`}>
//               {getSentimentIcon(article.sentiment)}
//             </span>
//           </div>
//         </div>
        
//         <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer">
//           {article.title}
//         </h3>
        
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
//           {article.description}
//         </p>
        
//         <div className="flex flex-wrap gap-2 mb-4">
//           {article.matchedHashtags.map((hashtag, index) => (
//             <span key={index} className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full font-medium">
//               {hashtag}
//             </span>
//           ))}
//         </div>

//         {/* Engagement metrics améliorées */}
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
//             <span className="flex items-center gap-1">
//               <Star className="w-3 h-3" />
//               {article.engagement.likes}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${getContentTypeColor(article.contentType)} text-white`}>
//               {React.createElement(getContentTypeIcon(article.contentType), { className: "w-3 h-3" })}
//               {getContentInfo(article).value}
//             </span>
//           </div>
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
//             <Hash className="w-4 h-4" />
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

// const HashtagSuggestion = ({ hashtag, count, trend, growth, category, color, sentiment, posts24h, engagement, onClick }) => {
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

//   const getSentimentColor = (sentiment) => {
//     const sentimentMap = {
//       'positive': 'text-green-500',
//       'negative': 'text-red-500',
//       'neutral': 'text-yellow-500'
//     };
//     return sentimentMap[sentiment] || 'text-gray-500';
//   };

//   return (
//     <button
//       onClick={() => onClick(hashtag)}
//       className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-1 text-left w-full"
//     >
//       <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
//       <div className="relative">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
//               <Hash className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
//                 {hashtag}
//               </h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {category}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col items-end gap-1">
//             {getTrendIcon()}
//             <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-yellow-500'}`}>
//               {growth}
//             </span>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <div className="text-2xl font-bold text-gray-900 dark:text-white">
//               {count.toLocaleString()}
//             </div>
//             <div className="text-xs text-gray-500 dark:text-gray-400">
//               articles totaux
//             </div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
//               {posts24h}
//             </div>
//             <div className="text-xs text-gray-500 dark:text-gray-400">
//               dernières 24h
//             </div>
//           </div>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <BarChart3 className="w-4 h-4 text-gray-400" />
//             <span className="text-sm text-gray-600 dark:text-gray-400">
//               {engagement}% engagement
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className={`text-sm ${getSentimentColor(sentiment)}`}>
//               {sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😟' : '😐'}
//             </span>
//             <Sparkles className="w-4 h-4 text-orange-500" />
//           </div>
//         </div>
//       </div>
//     </button>
//   );
// };

// function HashtagFluxPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentHashtag, setCurrentHashtag] = useState('');
//   const [selectedContentTypes, setSelectedContentTypes] = useState(['all']);
//   const [articles, setArticles] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('date');
//   const [filterCategory, setFilterCategory] = useState('all');

//   // Gestion des types de contenu
//   const handleContentTypeChange = (typeId) => {
//     if (typeId === 'all') {
//       setSelectedContentTypes(['all']);
//     } else {
//       setSelectedContentTypes(prev => {
//         const newTypes = prev.filter(t => t !== 'all');
//         if (newTypes.includes(typeId)) {
//           const filtered = newTypes.filter(t => t !== typeId);
//           return filtered.length === 0 ? ['all'] : filtered;
//         } else {
//           return [...newTypes, typeId];
//         }
//       });
//     }
//   };

//   // Simulation de recherche - CORRECTION ICI
//   const performSearch = async (hashtag) => {
//     if (!hashtag.trim()) return;
    
//     setIsSearching(true);
//     setCurrentHashtag(hashtag);
    
//     try {
//       // Simulation d'appel API
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Filtrer les articles qui contiennent le hashtag - SANS filtrage par type ici
//       let filteredArticles = mockHashtagArticles.filter(article =>
//         article.hashtags.some(h => h.toLowerCase().includes(hashtag.toLowerCase().replace('#', ''))) ||
//         article.title.toLowerCase().includes(hashtag.toLowerCase()) ||
//         article.description.toLowerCase().includes(hashtag.toLowerCase())
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
//     let searchValue = searchTerm;
//     // Ajouter # automatiquement si pas présent
//     if (searchValue && !searchValue.startsWith('#')) {
//       searchValue = '#' + searchValue;
//     }
//     performSearch(searchValue);
//   };

//   const handleHashtagClick = (hashtag) => {
//     setSearchTerm(hashtag);
//     performSearch(hashtag);
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
//         ? `Vous ne suivez plus les articles avec le hashtag "${currentHashtag}"` 
//         : `Vous suivez maintenant les articles avec le hashtag "${currentHashtag}"`;
      
//       console.log(message);
//     }
//   };

//   // Filtrage et tri des articles - CORRECTION ICI
//   const filteredAndSortedArticles = articles
//     .filter(article => {
//       // Filtrage par catégorie
//       let categoryMatch = true;
//       if (filterCategory === 'unread') categoryMatch = !article.isRead;
//       else if (filterCategory === 'favorites') categoryMatch = article.isFavorite;
//       else if (filterCategory === 'followed') categoryMatch = article.isFollowed;
//       else if (filterCategory === 'trending') categoryMatch = article.trending;
//       else if (filterCategory !== 'all') categoryMatch = article.category === filterCategory;

//       // Filtrage par type de contenu - CORRECTION ICI
//       let contentTypeMatch = true;
//       if (!selectedContentTypes.includes('all')) {
//         contentTypeMatch = selectedContentTypes.includes(article.contentType);
//       }

//       return categoryMatch && contentTypeMatch;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'title':
//           return a.title.localeCompare(b.title);
//         case 'source':
//           return a.source.localeCompare(b.source);
//         case 'engagement':
//           return b.engagement.views - a.engagement.views;
//         case 'likes':
//           return b.engagement.likes - a.engagement.likes;
//         case 'date':
//         default:
//           return new Date(b.publishedAt) - new Date(a.publishedAt);
//       }
//     });

//   // useEffect pour re-filtrer quand les types changent
//   useEffect(() => {
//     if (currentHashtag && articles.length > 0) {
//       // Le filtrage se fait automatiquement via filteredAndSortedArticles
//     }
//   }, [selectedContentTypes]);

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900">
//       {/* Header avec thème adaptatif */}
//       <div className="bg-white dark:bg-gray-800">
//         <div className="max-w-6xl mx-auto px-6 py-8">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
//                 <Hash className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
//               Recherche par hashtag
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
//               Explorez les tendances et découvrez du contenu pertinent grâce aux hashtags. 
//               Choisissez le type de contenu qui vous intéresse.
//             </p>
//           </div>

//           {/* Sélecteur de types de contenu */}
//           <div className="mb-8">
//             <div className="text-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 Types de contenu
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Sélectionnez les formats que vous souhaitez surveiller
//               </p>
//             </div>
//             <ContentTypeSelector 
//               selectedTypes={selectedContentTypes}
//               onTypeChange={handleContentTypeChange}
//             />
//           </div>

//           {/* Formulaire de recherche amélioré */}
//           <form onSubmit={handleSearch} className="mb-8">
//             <div className="max-w-2xl mx-auto relative">
//               <div className="relative">
//                 <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Entrez un hashtag (ex: TechNews, Innovation, ClimateChange...)"
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
//                   <Hash className="w-5 h-5" />
//                 )}
//                 {isSearching ? 'Recherche...' : 'Rechercher'}
//               </button>
//             </div>
//           </form>

//           {/* Hashtags tendances - Affiché seulement quand pas de recherche active */}
//           {!currentHashtag && (
//             <div>
//               <div className="text-center mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                   Hashtags tendances
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   Découvrez les sujets populaires du moment
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {trendingHashtags.map((item, index) => (
//                   <HashtagSuggestion
//                     key={index}
//                     hashtag={item.hashtag}
//                     count={item.count}
//                     trend={item.trend}
//                     growth={item.growth}
//                     category={item.category}
//                     color={item.color}
//                     sentiment={item.sentiment}
//                     posts24h={item.posts24h}
//                     engagement={item.engagement}
//                     onClick={handleHashtagClick}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Résultats - Affiché seulement quand recherche active */}
//       {currentHashtag && (
//         <div className="bg-gray-50 dark:bg-gray-900">
//           {/* Barre de filtres améliorée */}
//           <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
//             <div className="max-w-6xl mx-auto px-6 py-4">
//               <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
//                       <Hash className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                         {currentHashtag}
//                       </h2>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {filteredAndSortedArticles.length} résultat{filteredAndSortedArticles.length > 1 ? 's' : ''} • 
//                         Types: {selectedContentTypes.includes('all') ? 'Tous' : selectedContentTypes.map(t => contentTypes.find(ct => ct.id === t)?.name).join(', ')}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setCurrentHashtag('');
//                       setSearchTerm('');
//                       setArticles([]);
//                     }}
//                     className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium hover:underline"
//                   >
//                     Nouvelle recherche
//                   </button>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {/* Sélecteur compact de types de contenu */}
//                   <ContentTypeSelector 
//                     selectedTypes={selectedContentTypes}
//                     onTypeChange={handleContentTypeChange}
//                     isCompact={true}
//                   />

//                   <select
//                     value={filterCategory}
//                     onChange={(e) => setFilterCategory(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[120px]"
//                   >
//                     <option value="all">Tous</option>
//                     <option value="trending">Tendances</option>
//                     <option value="unread">Non lus</option>
//                     <option value="favorites">Favoris</option>
//                     <option value="followed">Suivis</option>
//                     <option value="Tech">Tech</option>
//                     <option value="Business">Business</option>
//                     <option value="Environment">Environment</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Design">Design</option>
//                     <option value="Marketing">Marketing</option>
//                     <option value="Music">Music</option>
//                   </select>

//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[140px]"
//                   >
//                     <option value="date">Plus récent</option>
//                     <option value="engagement">Plus vues</option>
//                     <option value="likes">Plus aimé</option>
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
//           <div className="p-6">
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
//                     Nous analysons les dernières publications avec {currentHashtag}
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
//                     <Hash className="w-12 h-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
//                     Aucun résultat trouvé
//                   </h3>
//                   <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
//                     Aucun contenu ne correspond au hashtag {currentHashtag} pour les types sélectionnés. 
//                     Essayez avec d'autres hashtags ou modifiez vos filtres.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setCurrentHashtag('');
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

// export default HashtagFluxPage;

// src/pages/SourcesPage/components/HashtagFlux/HashtagFluxPage.jsx
import React, { useState } from 'react';
import { Hash } from 'lucide-react';

// Components
import {
  ContentTypeSelector,
  SearchForm,
  FilterBar,
  HashtagSuggestion,
  ArticleCard,
  EmptyState
} from './components';

// Hooks
import { useHashtagSearch, useArticleActions } from './hooks';

// Data
import mockData from './hashtagMockData.json';

const trendingHashtags = mockData.trendingHashtags;

function HashtagFluxPage() {
  const [selectedContentTypes, setSelectedContentTypes] = useState(['all']);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('all');

  const {
    searchTerm,
    setSearchTerm,
    currentHashtag,
    articles,
    setArticles, // AJOUT DE setArticles ICI
    isSearching,
    filteredAndSortedArticles,
    performSearch,
    clearSearch
  } = useHashtagSearch({
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

  const handleHashtagClick = (hashtag) => {
    setSearchTerm(hashtag);
    performSearch(hashtag);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Header avec thème adaptatif */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Hash className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              Recherche par hashtag
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Explorez les tendances et découvrez du contenu pertinent grâce aux hashtags. 
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

          {/* Hashtags tendances - Affiché seulement quand pas de recherche active */}
          {!currentHashtag && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Hashtags tendances
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Découvrez les sujets populaires du moment
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingHashtags.map((item, index) => (
                  <HashtagSuggestion
                    key={index}
                    {...item}
                    onClick={handleHashtagClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Résultats - Affiché seulement quand recherche active */}
      {currentHashtag && (
        <div className="bg-gray-50 dark:bg-gray-900">
          {/* Barre de filtres */}
          <FilterBar
            currentHashtag={currentHashtag}
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
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {isSearching ? (
                <EmptyState
                  type="loading"
                  hashtag={currentHashtag}
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
                  hashtag={currentHashtag}
                  selectedContentTypes={selectedContentTypes}
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

export default HashtagFluxPage;