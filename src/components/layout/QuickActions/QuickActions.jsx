// // components/layout/QuickActions/QuickActions.jsx
// import React from 'react';
// import { 
//   Home, 
//   BookOpen, 
//   Plus, 
//   BarChart3, 
//   Settings, 
//   Archive, 
//   MessageSquare, 
//   Globe, 
//   Upload, 
//   TrendingUp,
//   RotateCcw,
//   MoreHorizontal,
//   Sparkles,
//   Star
// } from 'lucide-react';

// function QuickActions({ type = 'default', onAction, activeFilter = 'all' }) {
//   // Configuration pour différents types de QuickActions
//   const configurations = {
//     default: {
//       title: 'SMARTTRACK - Actions rapides',
//       sections: [
//         {
//           title: 'Actions rapides',
//           items: [
//             { name: 'Dashboard', action: () => onAction?.('navigate', 'dashboard'), icon: Home },
//             { name: 'Bibliothèque', action: () => onAction?.('navigate', 'library'), icon: BookOpen },
//             { name: 'Nouveau projet', action: () => onAction?.('action', 'new-project'), icon: Plus },
//             { name: 'Rapports', action: () => onAction?.('action', 'reports'), icon: BarChart3 },
//             { name: 'Paramètres', action: () => onAction?.('action', 'settings'), icon: Settings }
//           ]
//         }
//       ]
//     },
//     library: {
//       title: 'Bibliothèque',
//       sections: [
//         {
//           title: 'Bibliothèque',
//           items: [
//             { 
//               name: 'Nouveautés', 
//               action: () => onAction?.('filter', 'nouveautes'),
//               icon: Sparkles,
//               highlighted: false
//             },
//             { 
//               name: 'Favoris', 
//               action: () => onAction?.('filter', 'favorites'),
//               icon: Star,
//               highlighted: false
//             },
//             { 
//               name: 'Archive', 
//               action: () => onAction?.('filter', 'archive'),
//               icon: Archive 
//             },
//             { 
//               name: 'Annotations', 
//               action: () => onAction?.('filter', 'annotations'),
//               icon: MessageSquare 
//             },
//             { 
//               name: 'Pages web', 
//               action: () => onAction?.('filter', 'web-pages'),
//               icon: Globe 
//             },
//             { 
//               name: 'Chargements', 
//               action: () => onAction?.('filter', 'uploads'),
//               icon: Upload 
//             },
//             { 
//               name: 'Rapports de renseignement', 
//               action: () => onAction?.('filter', 'reports'),
//               icon: TrendingUp 
//             }
//           ]
//         },
//         {
//           title: 'Étiquettes',
//           showControls: true,
//           items: [
//             { name: 'React', action: () => onAction?.('tag', 'react'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
//             { name: 'JavaScript', action: () => onAction?.('tag', 'javascript'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
//             { name: 'Design', action: () => onAction?.('tag', 'design'), color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
//             { name: 'SMARTTRACK', action: () => onAction?.('tag', 'smarttrack'), color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
//             { name: 'Node.js', action: () => onAction?.('tag', 'node.js'), color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
//             { name: 'IA', action: () => onAction?.('tag', 'ia'), color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' }
//           ]
//         }
//       ]
//     }
//   };

//   const config = configurations[type] || configurations.default;

//   const ActionButton = ({ item, isTag = false }) => {
//     if (isTag) {
//       return (
//         <button
//           onClick={item.action}
//           className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${item.color} hover:opacity-80`}
//         >
//           {item.name}
//         </button>
//       );
//     }

//     const Icon = item.icon;

//     // Meilleure logique de surlignage basée sur activeFilter
//     const getFilterFromAction = (action) => {
//       const actionString = action.toString();
//       const match = actionString.match(/'([^']+)'/);
//       return match ? match[1] : null;
//     };

//     const isActive = getFilterFromAction(item.action) === activeFilter;

//     return (
//       <button 
//         onClick={item.action}
//         className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-md flex items-center ${
//           isActive
//             ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
//             : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
//         }`}
//       >
//         <Icon className="w-4 h-4 mr-3" />
//         {item.name}
//       </button>
//     );
//   };

//   const SectionControls = () => (
//     <div className="flex items-center space-x-1">
//       <button 
//         onClick={() => onAction?.('control', 'settings')}
//         className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
//         title="Paramètres des étiquettes"
//       >
//         <Settings className="w-3 h-3" />
//       </button>
//       <button 
//         onClick={() => onAction?.('control', 'reset')}
//         className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
//         title="Réinitialiser les filtres"
//       >
//         <RotateCcw className="w-3 h-3" />
//       </button>
//       <button 
//         onClick={() => onAction?.('control', 'more')}
//         className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
//         title="Plus d'options"
//       >
//         <MoreHorizontal className="w-3 h-3" />
//       </button>
//     </div>
//   );

//   return (
//     <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
//       {config.sections.map((section, sectionIndex) => (
//         <div 
//           key={sectionIndex} 
//           className={`p-4 ${sectionIndex > 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//               {section.title}
//             </h3>
//             {section.showControls && <SectionControls />}
//           </div>
          
//           <div className="space-y-2">
//             {section.items.map((item, itemIndex) => (
//               <ActionButton 
//                 key={itemIndex} 
//                 item={item} 
//                 isTag={section.title === 'Étiquettes'}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default QuickActions;

// components/layout/QuickActions/QuickActions.jsx
import React from 'react';
import { 
  Home, 
  BookOpen, 
  Plus, 
  BarChart3, 
  Settings, 
  Archive, 
  MessageSquare, 
  Globe, 
  Upload, 
  TrendingUp,
  RotateCcw,
  MoreHorizontal,
  Sparkles,
  Star,
  MessageCircle
} from 'lucide-react';

function QuickActions({ type = 'default', onAction, activeFilter = 'all' }) {
  // Configuration pour différents types de QuickActions
  const configurations = {
    default: {
      title: 'SMARTTRACK - Actions rapides',
      sections: [
        {
          title: 'Actions rapides',
          items: [
            { name: 'Dashboard', action: () => onAction?.('navigate', 'dashboard'), icon: Home },
            { name: 'Bibliothèque', action: () => onAction?.('navigate', 'library'), icon: BookOpen },
            { name: 'Nouveau projet', action: () => onAction?.('action', 'new-project'), icon: Plus },
            { name: 'Rapports', action: () => onAction?.('action', 'reports'), icon: BarChart3 },
            { name: 'Paramètres', action: () => onAction?.('action', 'settings'), icon: Settings }
          ]
        }
      ]
    },
    library: {
      title: 'Bibliothèque',
      sections: [
        {
          title: 'Bibliothèque',
          items: [
            { 
              name: 'Nouveautés', 
              action: () => onAction?.('filter', 'nouveautes'),
              icon: Sparkles,
              highlighted: false
            },
            { 
              name: 'Favoris', 
              action: () => onAction?.('filter', 'favorites'),
              icon: Star,
              highlighted: false
            },
            { 
              name: 'Commentaires', 
              action: () => onAction?.('filter', 'commentaires'),
              icon: MessageCircle,
              highlighted: false
            },
            { 
              name: 'Archive', 
              action: () => onAction?.('filter', 'archive'),
              icon: Archive 
            },
            { 
              name: 'Annotations', 
              action: () => onAction?.('filter', 'annotations'),
              icon: MessageSquare 
            },
            { 
              name: 'Pages web', 
              action: () => onAction?.('filter', 'web-pages'),
              icon: Globe 
            },
            { 
              name: 'Chargements', 
              action: () => onAction?.('filter', 'uploads'),
              icon: Upload 
            },
            { 
              name: 'Rapports de renseignement', 
              action: () => onAction?.('filter', 'reports'),
              icon: TrendingUp 
            }
          ]
        },
        {
          title: 'Étiquettes',
          showControls: true,
          items: [
            { name: 'React', action: () => onAction?.('tag', 'react'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
            { name: 'JavaScript', action: () => onAction?.('tag', 'javascript'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
            { name: 'Design', action: () => onAction?.('tag', 'design'), color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
            { name: 'SMARTTRACK', action: () => onAction?.('tag', 'smarttrack'), color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
            { name: 'Node.js', action: () => onAction?.('tag', 'node.js'), color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
            { name: 'IA', action: () => onAction?.('tag', 'ia'), color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' }
          ]
        }
      ]
    }
  };

  const config = configurations[type] || configurations.default;

  const ActionButton = ({ item, isTag = false }) => {
    if (isTag) {
      return (
        <button
          onClick={item.action}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${item.color} hover:opacity-80`}
        >
          {item.name}
        </button>
      );
    }

    const Icon = item.icon;

    // Meilleure logique de surlignage basée sur activeFilter
    const getFilterFromAction = (action) => {
      const actionString = action.toString();
      const match = actionString.match(/'([^']+)'/);
      return match ? match[1] : null;
    };

    const isActive = getFilterFromAction(item.action) === activeFilter;

    return (
      <button 
        onClick={item.action}
        className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-md flex items-center ${
          isActive
            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <Icon className="w-4 h-4 mr-3" />
        {item.name}
      </button>
    );
  };

  const SectionControls = () => (
    <div className="flex items-center space-x-1">
      <button 
        onClick={() => onAction?.('control', 'settings')}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
        title="Paramètres des étiquettes"
      >
        <Settings className="w-3 h-3" />
      </button>
      <button 
        onClick={() => onAction?.('control', 'reset')}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
        title="Réinitialiser les filtres"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
      <button 
        onClick={() => onAction?.('control', 'more')}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
        title="Plus d'options"
      >
        <MoreHorizontal className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {config.sections.map((section, sectionIndex) => (
        <div 
          key={sectionIndex} 
          className={`p-4 ${sectionIndex > 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {section.title}
            </h3>
            {section.showControls && <SectionControls />}
          </div>
          
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <ActionButton 
                key={itemIndex} 
                item={item} 
                isTag={section.title === 'Étiquettes'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuickActions;