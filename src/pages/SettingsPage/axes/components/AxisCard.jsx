// // src/pages/SettingsPage/axes/components/AxisCard.jsx
// import React, { useState } from 'react';
// import { 
//   Target, Edit, Trash2, MoreVertical, Calendar, Users, Eye,
//   ChartBar, LineChart, BarChart3, PieChart, 
//   BookOpen, Briefcase, Building2, GraduationCap, 
//   Globe, Landmark, BarChart, FileBarChart, Scale, 
//   ShieldCheck, TriangleAlert, Leaf, Layers, 
//   DatabaseBackup
// } from 'lucide-react';
// import { useTeams } from '@/context/TeamsContext';
// import { getColorClass } from '../constants/pestelData';

// // Mapping des noms d'icônes aux composants Lucide
// const ICON_COMPONENTS = {
//   Target, ChartBar, LineChart, BarChart3, PieChart, 
//   BookOpen, Briefcase, Building2, GraduationCap, 
//   Globe, Landmark, BarChart, FileBarChart, Scale, 
//   ShieldCheck, TriangleAlert, Leaf, Layers, 
//   DatabaseBackup
// };

// /**
//  * Carte représentant un axe dans la liste des axes
//  * 
//  * @param {Object} props
//  * @param {Object} props.axis - Données de l'axe à afficher
//  * @param {Function} props.onEdit - Fonction appelée pour éditer l'axe
//  * @param {Function} props.onDelete - Fonction appelée pour supprimer l'axe
//  * @param {Function} props.onView - Fonction appelée pour voir les détails de l'axe
//  */
// const AxisCard = ({ axis, onEdit, onDelete, onView }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const { getTeamsByAxis } = useTeams();

//   // Obtenir les équipes assignées à cet axe
//   const assignedTeams = getTeamsByAxis(axis.id);

//   // Obtenir le composant d'icône en fonction du nom stocké
//   const getIconComponent = (iconName) => {
//     if (!iconName) return Target;
    
//     // Si c'est une chaîne, essayer de trouver le composant correspondant
//     if (typeof iconName === 'string') {
//       return ICON_COMPONENTS[iconName] || Target;
//     }
    
//     // Sinon retourner l'icône par défaut
//     return Target;
//   };

//   const IconComponent = getIconComponent(axis.icon);

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
//       <div className="flex items-start justify-between mb-4">
//         {/* Icône de l'axe */}
//         <div className={`w-12 h-12 ${getColorClass(axis.color)} rounded-lg flex items-center justify-center`}>
//           <IconComponent className="w-6 h-6 text-white" />
//         </div>
        
//         {/* Menu d'actions */}
//         <div className="relative">
//           <button
//             onClick={() => setShowMenu(!showMenu)}
//             className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
//           >
//             <MoreVertical className="w-4 h-4" />
//           </button>

//           {showMenu && (
//             <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
//               <button
//                 onClick={() => { onView(axis); setShowMenu(false); }}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//               >
//                 <Eye className="w-4 h-4" />
//                 Voir
//               </button>
//               <button
//                 onClick={() => { onEdit(axis); setShowMenu(false); }}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//               >
//                 <Edit className="w-4 h-4" />
//                 Modifier
//               </button>
//               <button
//                 onClick={() => { onDelete(axis.id); setShowMenu(false); }}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Supprimer
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Titre et description */}
//       <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
//         {axis.name}
//       </h3>
      
//       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
//         {axis.description || 'Aucune description fournie pour cet axe.'}
//       </p>

//       {/* Thèmes associés */}
//       {axis.themes && axis.themes.length > 0 && (
//         <div className="mb-4">
//           <div className="flex flex-wrap gap-1 mb-2">
//             {axis.themes.slice(0, 3).map((theme, idx) => (
//               <span 
//                 key={idx} 
//                 className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full"
//               >
//                 {theme}
//               </span>
//             ))}
//             {axis.themes.length > 3 && (
//               <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
//                 +{axis.themes.length - 3}
//               </span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Footer avec informations */}
//       <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
//         <div className="flex items-center gap-1">
//           <Users className="w-4 h-4" />
//           <span>{assignedTeams.length} équipe{assignedTeams.length > 1 ? 's' : ''}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <Calendar className="w-4 h-4" />
//           <span>Créé le {new Date().toLocaleDateString('fr-FR')}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AxisCard;

// src/pages/SettingsPage/axes/components/AxisCard.jsx
import React, { useState } from 'react';
import { 
  Target, Edit, Trash2, MoreVertical, Calendar, Users, Eye
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTeams } from '@/context/TeamsContext';
import { getColorClass } from '../constants/pestelData';

/**
 * Carte représentant un axe dans la liste des axes
 * 
 * @param {Object} props
 * @param {Object} props.axis - Données de l'axe à afficher
 * @param {Function} props.onEdit - Fonction appelée pour éditer l'axe
 * @param {Function} props.onDelete - Fonction appelée pour supprimer l'axe
 * @param {Function} props.onView - Fonction appelée pour voir les détails de l'axe
 */
const AxisCard = ({ axis, onEdit, onDelete, onView }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { getTeamsByAxis } = useTeams();

  // Obtenir les équipes assignées à cet axe
  const assignedTeams = getTeamsByAxis(axis.id);

  // Obtenir le composant d'icône en fonction du nom stocké
  const getIconComponent = (iconName) => {
    if (!iconName) return Target;
    
    // Si c'est une chaîne, essayer de trouver le composant correspondant
    if (typeof iconName === 'string' && LucideIcons[iconName]) {
      return LucideIcons[iconName];
    }
    
    // Sinon retourner l'icône par défaut
    return Target;
  };

  const IconComponent = getIconComponent(axis.icon);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        {/* Icône de l'axe */}
        <div className={`w-12 h-12 ${getColorClass(axis.color)} rounded-lg flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        
        {/* Menu d'actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
              <button
                onClick={() => { onView(axis); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Voir
              </button>
              <button
                onClick={() => { onEdit(axis); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </button>
              <button
                onClick={() => { onDelete(axis.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Titre et description */}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {axis.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {axis.description || 'Aucune description fournie pour cet axe.'}
      </p>

      {/* Thèmes associés */}
      {axis.themes && axis.themes.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {axis.themes.slice(0, 3).map((theme, idx) => (
              <span 
                key={idx} 
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full"
              >
                {theme}
              </span>
            ))}
            {axis.themes.length > 3 && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                +{axis.themes.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer avec informations */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{assignedTeams.length} équipe{assignedTeams.length > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Créé le {new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );
};

export default AxisCard;

