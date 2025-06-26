// // src/pages/RolePage/RolePage.jsx
// import React, { useState } from 'react';
// import { 
//   Users, Plus, Search, Filter, Grid, List, 
//   Lock, Unlock, Calendar, MoreVertical, 
//   Edit, Trash2, UserPlus, Eye 
// } from 'lucide-react';
// import { useGroups } from '@/context/RoleContext';
// import GroupModal from './modal/RoleModal';

// const GroupCard = ({ group, onEdit, onDelete, onView, viewMode }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   const getColorClass = (color) => {
//     const colorMap = {
//       blue: 'bg-blue-500',
//       green: 'bg-green-500',
//       purple: 'bg-purple-500',
//       red: 'bg-red-500',
//       yellow: 'bg-yellow-500',
//       pink: 'bg-pink-500',
//       indigo: 'bg-indigo-500',
//       gray: 'bg-gray-500'
//     };
//     return colorMap[color] || 'bg-gray-500';
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('fr-FR', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   if (viewMode === 'list') {
//     return (
//       <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
//         <div className="flex items-center gap-4">
//           <div className={`w-12 h-12 ${getColorClass(group.color)} rounded-lg flex items-center justify-center flex-shrink-0`}>
//             <Users className="w-6 h-6 text-white" />
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-1">
//               <h3 className="font-semibold text-gray-900 dark:text-white truncate">
//                 {group.name}
//               </h3>
//               {group.isPrivate ? (
//                 <Lock className="w-4 h-4 text-gray-400" />
//               ) : (
//                 <Unlock className="w-4 h-4 text-gray-400" />
//               )}
//             </div>
//             <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
//               {group.description || 'Aucune description'}
//             </p>
//             <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
//               <span>{group.members.length} membre{group.members.length > 1 ? 's' : ''}</span>
//               <span>Créé le {formatDate(group.createdAt)}</span>
//               <span>Par {group.owner.name}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex -space-x-2">
//               {group.members.slice(0, 3).map((member, index) => (
//                 <img
//                   key={member.id}
//                   src={member.avatar}
//                   alt={member.name}
//                   className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
//                   title={member.name}
//                 />
//               ))}
//               {group.members.length > 3 && (
//                 <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
//                   <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
//                     +{group.members.length - 3}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setShowMenu(!showMenu)}
//                 className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <MoreVertical className="w-4 h-4" />
//               </button>

//               {showMenu && (
//                 <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
//                   <button
//                     onClick={() => { onView(group.id); setShowMenu(false); }}
//                     className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <Eye className="w-4 h-4" />
//                     Voir le groupe
//                   </button>
//                   <button
//                     onClick={() => { onEdit(group); setShowMenu(false); }}
//                     className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <Edit className="w-4 h-4" />
//                     Modifier
//                   </button>
//                   <button
//                     onClick={() => { onDelete(group.id); setShowMenu(false); }}
//                     className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Supprimer
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`w-12 h-12 ${getColorClass(group.color)} rounded-lg flex items-center justify-center`}>
//           <Users className="w-6 h-6 text-white" />
//         </div>
//         <div className="flex items-center gap-2">
//           {group.isPrivate ? (
//             <Lock className="w-4 h-4 text-gray-400" title="Groupe privé" />
//           ) : (
//             <Unlock className="w-4 h-4 text-gray-400" title="Groupe public" />
//           )}
//           <div className="relative">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
//             >
//               <MoreVertical className="w-4 h-4" />
//             </button>

//             {showMenu && (
//               <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
//                 <button
//                   onClick={() => { onView(group.id); setShowMenu(false); }}
//                   className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <Eye className="w-4 h-4" />
//                   Voir
//                 </button>
//                 <button
//                   onClick={() => { onEdit(group); setShowMenu(false); }}
//                   className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Modifier
//                 </button>
//                 <button
//                   onClick={() => { onDelete(group.id); setShowMenu(false); }}
//                   className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Supprimer
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
//         {group.name}
//       </h3>
      
//       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
//         {group.description || 'Aucune description fournie pour ce groupe.'}
//       </p>

//       <div className="flex items-center justify-between mb-4">
//         <div className="flex -space-x-2">
//           {group.members.slice(0, 4).map((member, index) => (
//             <img
//               key={member.id}
//               src={member.avatar}
//               alt={member.name}
//               className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
//               title={member.name}
//             />
//           ))}
//           {group.members.length > 4 && (
//             <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
//               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
//                 +{group.members.length - 4}
//               </span>
//             </div>
//           )}
//         </div>
//         <span className="text-sm text-gray-500 dark:text-gray-400">
//           {group.members.length} membre{group.members.length > 1 ? 's' : ''}
//         </span>
//       </div>

//       <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//         <div className="flex items-center gap-1">
//           <Calendar className="w-3 h-3" />
//           <span>Créé le {formatDate(group.createdAt)}</span>
//         </div>
//         <span>Par {group.owner.name}</span>
//       </div>

//       <button
//         onClick={() => onView(group.id)}
//         className="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
//       >
//         Voir le groupe
//       </button>
//     </div>
//   );
// };

// function GroupsPage({ onNavigate }) {
//   const { groups, openModal, deleteGroup } = useGroups();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all'); // 'all', 'public', 'private'
//   const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'
//   const [sortBy, setSortBy] = useState('name'); // 'name', 'date', 'members'

//   const handleEdit = (group) => {
//     openModal(group);
//   };

//   const handleDelete = (groupId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
//       deleteGroup(groupId);
//     }
//   };

//   const handleView = (groupId) => {
//     onNavigate(`group/${groupId}`);
//   };

//   // Filtrer et trier les groupes
//   const filteredGroups = groups
//     .filter(group => {
//       const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            group.description?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesFilter = filterType === 'all' || 
//                            (filterType === 'public' && !group.isPrivate) ||
//                            (filterType === 'private' && group.isPrivate);
//       return matchesSearch && matchesFilter;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'date':
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         case 'members':
//           return b.members.length - a.members.length;
//         case 'name':
//         default:
//           return a.name.localeCompare(b.name);
//       }
//     });

//   return (
//     <div className="flex-1 overflow-auto">
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               Groupes d'utilisateurs
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">
//               Gérez vos équipes et organisez votre travail collaboratif
//             </p>
//           </div>
//           <button
//             onClick={() => openModal()}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             Nouveau groupe
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{groups.length}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Total groupes</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                 <Unlock className="w-5 h-5 text-green-600 dark:text-green-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {groups.filter(g => !g.isPrivate).length}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Groupes publics</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
//                 <Lock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {groups.filter(g => g.isPrivate).length}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Groupes privés</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                 <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {groups.reduce((total, group) => total + group.members.length, 0)}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Total membres</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filtres et recherche */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Rechercher un groupe..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex gap-2">
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">Tous les groupes</option>
//               <option value="public">Groupes publics</option>
//               <option value="private">Groupes privés</option>
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="name">Trier par nom</option>
//               <option value="date">Trier par date</option>
//               <option value="members">Trier par membres</option>
//             </select>

//             <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors rounded-l-lg`}
//                 title="Vue grille"
//               >
//                 <Grid className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors rounded-r-lg`}
//                 title="Vue liste"
//               >
//                 <List className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Résultats */}
//         {filteredGroups.length > 0 ? (
//           <div className={viewMode === 'grid' 
//             ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
//             : 'space-y-4'
//           }>
//             {filteredGroups.map((group) => (
//               <GroupCard
//                 key={group.id}
//                 group={group}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//                 onView={handleView}
//                 viewMode={viewMode}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//               {searchTerm || filterType !== 'all' ? 'Aucun groupe trouvé' : 'Aucun groupe créé'}
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
//               {searchTerm || filterType !== 'all' 
//                 ? 'Essayez de modifier vos critères de recherche pour voir plus de résultats.'
//                 : 'Commencez par créer votre premier groupe pour organiser votre équipe et améliorer la collaboration.'
//               }
//             </p>
//             {(!searchTerm && filterType === 'all') && (
//               <button
//                 onClick={() => openModal()}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Créer votre premier groupe
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       <GroupModal />
//     </div>
//   );
// }

// export default GroupsPage;


// src/pages/RolePage/RolePage.jsx
import React, { useState } from 'react';
import { 
  Users, Plus, Search, Filter, Grid, List, 
  Lock, Unlock, Calendar, MoreVertical, 
  Edit, Trash2, UserPlus, Eye 
} from 'lucide-react';
import { useRoles } from '@/context/RoleContext';
import RoleModal from './modal/RoleModal';

const RoleCard = ({ role, onEdit, onDelete, onView, viewMode }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500',
      gray: 'bg-gray-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${getColorClass(role.color)} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Users className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {role.name}
              </h3>
              {role.isPrivate ? (
                <Lock className="w-4 h-4 text-gray-400" />
              ) : (
                <Unlock className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
              {role.description || 'Aucune description'}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>{role.members.length} membre{role.members.length > 1 ? 's' : ''}</span>
              <span>Créé le {formatDate(role.createdAt)}</span>
              <span>Par {role.owner.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {role.members.slice(0, 3).map((member, index) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                  title={member.name}
                />
              ))}
              {role.members.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    +{role.members.length - 3}
                  </span>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
                  <button
                    onClick={() => { onView(role.id); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Voir le rôle
                  </button>
                  <button
                    onClick={() => { onEdit(role); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => { onDelete(role.id); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${getColorClass(role.color)} rounded-lg flex items-center justify-center`}>
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          {role.isPrivate ? (
            <Lock className="w-4 h-4 text-gray-400" title="Rôle privé" />
          ) : (
            <Unlock className="w-4 h-4 text-gray-400" title="Rôle public" />
          )}
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
                  onClick={() => { onView(role.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Voir
                </button>
                <button
                  onClick={() => { onEdit(role); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => { onDelete(role.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {role.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {role.description || 'Aucune description fournie pour ce rôle.'}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {role.members.slice(0, 4).map((member, index) => (
            <img
              key={member.id}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
              title={member.name}
            />
          ))}
          {role.members.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                +{role.members.length - 4}
              </span>
            </div>
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {role.members.length} membre{role.members.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Créé le {formatDate(role.createdAt)}</span>
        </div>
        <span>Par {role.owner.name}</span>
      </div>

      <button
        onClick={() => onView(role.id)}
        className="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
      >
        Voir le rôle
      </button>
    </div>
  );
};

function RolesPage({ onNavigate }) {
  const { roles, openModal, deleteRole } = useRoles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'public', 'private'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'date', 'members'

  const handleEdit = (role) => {
    openModal(role);
  };

  const handleDelete = (roleId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      deleteRole(roleId);
    }
  };

  const handleView = (roleId) => {
    onNavigate(`role/${roleId}`);
  };

  // Filtrer et trier les rôles
  const filteredRoles = roles
    .filter(role => {
      const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           role.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || 
                           (filterType === 'public' && !role.isPrivate) ||
                           (filterType === 'private' && role.isPrivate);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'members':
          return b.members.length - a.members.length;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Rôles d'utilisateurs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gérez vos rôles et organisez votre travail collaboratif
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouveau rôle
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{roles.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total rôles</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Unlock className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {roles.filter(r => !r.isPrivate).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rôles publics</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {roles.filter(r => r.isPrivate).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rôles privés</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {roles.reduce((total, role) => total + role.members.length, 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total membres</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un rôle..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les rôles</option>
              <option value="public">Rôles publics</option>
              <option value="private">Rôles privés</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Trier par nom</option>
              <option value="date">Trier par date</option>
              <option value="members">Trier par membres</option>
            </select>

            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors rounded-l-lg`}
                title="Vue grille"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors rounded-r-lg`}
                title="Vue liste"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Résultats */}
        {filteredRoles.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredRoles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || filterType !== 'all' ? 'Aucun rôle trouvé' : 'Aucun rôle créé'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchTerm || filterType !== 'all' 
                ? 'Essayez de modifier vos critères de recherche pour voir plus de résultats.'
                : 'Commencez par créer votre premier rôle pour organiser votre équipe et améliorer la collaboration.'
              }
            </p>
            {(!searchTerm && filterType === 'all') && (
              <button
                onClick={() => openModal()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Créer votre premier rôle
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <RoleModal />
    </div>
  );
}

export default RolesPage;