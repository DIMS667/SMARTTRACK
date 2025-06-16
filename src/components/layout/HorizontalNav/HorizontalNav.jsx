// // HorizontalNav.jsx - Version adaptée pour SMARTTRACK
// import React, { useState } from 'react';
// import { Home, Users, FolderOpen, Calendar, FileText, BarChart3, Target, Clock } from 'lucide-react';
// import { useCustomizer } from '@/context/CustomizerContext';

// // Navigation horizontale pour SMARTTRACK
// const navigation = [
//   { name: 'Dashboard', href: 'dashboard', icon: Home, available: true },
//   { name: 'Projets', href: 'projects', icon: FolderOpen, available: false },
//   { name: 'Tâches', href: 'tasks', icon: Target, available: false },
//   { name: 'Équipe', href: 'team', icon: Users, available: false },
//   { name: 'Planning', href: 'planning', icon: Calendar, available: false },
//   { name: 'Temps', href: 'timetracking', icon: Clock, available: false },
//   { name: 'Rapports', href: 'reports', icon: BarChart3, available: false }
// ];

// function HorizontalNav({ onNavigate }) {
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const { navbarTheme, isDark } = useCustomizer();

//   const handleItemClick = (href, available) => {
//     if (available) {
//       setActiveItem(href);
//       if (onNavigate) {
//         onNavigate(href);
//       }
//     } else {
//       console.log(`Page ${href} en cours de développement pour SMARTTRACK`);
//       // Optionnel : afficher une notification
//     }
//   };

//   return (
//     <nav className={`border-b px-4 transition-colors duration-200 ${
//       isDark 
//         ? `${navbarTheme.sidebar} border-gray-700` 
//         : `${navbarTheme.primaryLight} border-gray-200`
//     }`}>
//       <div className="flex space-x-8 overflow-x-auto">
//         {navigation.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeItem === item.href;
//           const isAvailable = item.available;
          
//           return (
//             <button
//               key={item.name}
//               onClick={() => handleItemClick(item.href, isAvailable)}
//               disabled={!isAvailable}
//               className={`
//                 flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap relative
//                 ${isActive && isAvailable
//                   ? `${navbarTheme.primaryText.replace('text', 'border')} ${navbarTheme.primaryText}` 
//                   : `border-transparent ${
//                       isAvailable 
//                         ? isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-700'
//                         : isDark ? 'text-white/30 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
//                     } ${isAvailable ? 'hover:border-gray-300' : ''}`
//                 }
//               `}
//             >
//               <Icon className="w-4 h-4 mr-2" />
//               {item.name}
//               {!isAvailable && (
//                 <span className="ml-2 text-xs bg-yellow-500 text-yellow-900 px-1 rounded">
//                   Bientôt
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

// export default HorizontalNav;

// HorizontalNav.jsx - Version adaptée pour SMARTTRACK
import React, { useState } from 'react';
import { Home, Users, FolderOpen, Calendar, FileText, BarChart3, Target, Clock, Bookmark } from 'lucide-react';
import { useCustomizer } from '@/context/CustomizerContext';

// Navigation horizontale pour SMARTTRACK
const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: Home, available: true },
  { name: 'Saved', href: 'saved', icon: Bookmark, available: true },
  { name: 'Projets', href: 'projects', icon: FolderOpen, available: false },
  { name: 'Tâches', href: 'tasks', icon: Target, available: false },
  { name: 'Équipe', href: 'team', icon: Users, available: false },
  { name: 'Planning', href: 'planning', icon: Calendar, available: false },
  { name: 'Temps', href: 'timetracking', icon: Clock, available: false },
  { name: 'Rapports', href: 'reports', icon: BarChart3, available: false }
];

function HorizontalNav({ onNavigate }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { navbarTheme, isDark } = useCustomizer();

  const handleItemClick = (href, available) => {
    if (available) {
      setActiveItem(href);
      if (onNavigate) {
        onNavigate(href);
      }
    } else {
      console.log(`Page ${href} en cours de développement pour SMARTTRACK`);
      // Optionnel : afficher une notification
    }
  };

  return (
    <nav className={`border-b px-4 transition-colors duration-200 ${
      isDark 
        ? `${navbarTheme.sidebar} border-gray-700` 
        : `${navbarTheme.primaryLight} border-gray-200`
    }`}>
      <div className="flex space-x-8 overflow-x-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.href;
          const isAvailable = item.available;
          
          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item.href, isAvailable)}
              disabled={!isAvailable}
              className={`
                flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap relative
                ${isActive && isAvailable
                  ? `${navbarTheme.primaryText.replace('text', 'border')} ${navbarTheme.primaryText}` 
                  : `border-transparent ${
                      isAvailable 
                        ? isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                        : isDark ? 'text-white/30 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                    } ${isAvailable ? 'hover:border-gray-300' : ''}`
                }
              `}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.name}
              {!isAvailable && (
                <span className="ml-2 text-xs bg-yellow-500 text-yellow-900 px-1 rounded">
                  Bientôt
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default HorizontalNav;