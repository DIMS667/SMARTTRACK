// import React from 'react';
// import SearchBar from './SearchBar';
// import { useTheme } from '@/context/ThemeContext';

// const FiltersSection = ({
//   searchQuery,
//   onSearchChange,
//   categories,
//   selectedCategory,
//   onCategoryChange,
//   articles,
//   sortBy,
//   onSortChange,
//   onMarkAllAsRead,
//   unreadCount
// }) => {
//   const themeContext = useTheme();
//   const { theme } = themeContext || { 
//     theme: { 
//       primary: 'bg-purple-600'
//     }
//   };

//   return (
//     <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//       {/* Barre de recherche des articles */}
//       <div className="mb-6">
//         <SearchBar 
//           searchQuery={searchQuery}
//           onSearchChange={onSearchChange}
//           placeholder="Rechercher dans les articles..."
//         />
//       </div>

//       <div className="flex flex-wrap items-center justify-between gap-4">
//         {/* Filtres par catégorie */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Catégories:</span>
//           <div className="flex flex-wrap gap-2">
//             {categories.map(category => (
//               <button
//                 key={category}
//                 onClick={() => onCategoryChange(category)}
//                 className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                   selectedCategory === category
//                     ? `${theme.primary} text-white`
//                     : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                 }`}
//               >
//                 {category}
//                 {category !== "All" && (
//                   <span className="ml-1 text-xs">
//                     ({articles.filter(a => a.category === category).length})
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Contrôles de tri et actions */}
//         <div className="flex items-center gap-4">
//           <select
//             value={sortBy}
//             onChange={(e) => onSortChange(e.target.value)}
//             className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
//           >
//             <option value="newest">Plus récents</option>
//             <option value="oldest">Plus anciens</option>
//             <option value="unread">Non lus</option>
//           </select>

//           <button
//             onClick={onMarkAllAsRead}
//             className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
//           >
//             Tout marquer comme lu ({unreadCount})
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FiltersSection;

import React from 'react';

const FiltersSection = ({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  articles,
  sortBy,
  onSortChange,
  onMarkAllAsRead,
  unreadCount
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Plus récents', icon: '↓' },
    { value: 'oldest', label: 'Plus anciens', icon: '↑' },
    { value: 'title', label: 'Titre A-Z', icon: 'Az' },
    { value: 'source', label: 'Source', icon: '📰' },
    { value: 'unread', label: 'Non lus d\'abord', icon: '●' }
  ];

  const currentSort = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];

  return (
    <div className="mb-6 space-y-4">
      {/* Barre de recherche et tri */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Recherche */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher dans les articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Sélecteur de tri */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Bouton marquer tout comme lu */}
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tout marquer comme lu ({unreadCount})
          </button>
        )}
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const categoryCount = category === 'All' 
            ? articles.length 
            : articles.filter(article => article.category === category).length;

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isSelected
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-transparent'
              }`}
            >
              <span>{category === 'All' ? 'Toutes' : category}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                isSelected 
                  ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
              }`}>
                {categoryCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Indicateur de filtres actifs */}
                {(searchQuery || selectedCategory !== 'All') && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span>Filtres actifs:</span>
          
          {searchQuery && (
            <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md">
              Recherche: "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-blue-900 dark:hover:text-blue-100"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          
          {selectedCategory !== 'All' && (
            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md">
              Catégorie: {selectedCategory}
              <button
                onClick={() => onCategoryChange('All')}
                className="hover:text-green-900 dark:hover:text-green-100"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('All');
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
          >
            Effacer tous les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersSection;