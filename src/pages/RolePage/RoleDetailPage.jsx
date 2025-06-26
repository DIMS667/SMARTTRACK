
// // src/pages/RolePage/RoleDetailPage.jsx
// import React, { useState } from 'react';
// import { 
//   ArrowLeft, Users, Settings, Plus, Search, 
//   Mail, Phone, MapPin, Calendar, Edit, 
//   Trash2, Crown, Shield, User, MoreVertical,
//   Lock, Unlock, MessageSquare, FileText, Clock,
//   Target, CheckCircle2, AlertCircle, Timer
// } from 'lucide-react';
// import { useGroups } from '@/context/RoleContext';

// const MemberCard = ({ member, isOwner, canManage, onRemove, onChangeRole }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
//       <div className="flex items-center gap-4">
//         <div className="relative">
//           <img
//             src={member.avatar}
//             alt={member.name}
//             className="w-12 h-12 rounded-full"
//           />
//           {isOwner && (
//             <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
//               <Crown className="w-3 h-3 text-white" />
//             </div>
//           )}
//         </div>
        
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2">
//             <h3 className="font-medium text-gray-900 dark:text-white truncate">
//               {member.name}
//             </h3>
//             {isOwner && (
//               <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded">
//                 Propriétaire
//               </span>
//             )}
//           </div>
//           <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
//           <p className="text-xs text-gray-500 dark:text-gray-500">{member.email}</p>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="flex gap-1">
//             <button
//               className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//               title="Envoyer un message"
//             >
//               <MessageSquare className="w-4 h-4" />
//             </button>
//             <button
//               className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
//               title="Envoyer un email"
//             >
//               <Mail className="w-4 h-4" />
//             </button>
//           </div>

//           {canManage && !isOwner && (
//             <div className="relative">
//               <button
//                 onClick={() => setShowMenu(!showMenu)}
//                 className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <MoreVertical className="w-4 h-4" />
//               </button>

//               {showMenu && (
//                 <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
//                   <button
//                     onClick={() => { onChangeRole(member.id); setShowMenu(false); }}
//                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <Shield className="w-4 h-4" />
//                     Changer rôle
//                   </button>
//                   <button
//                     onClick={() => { onRemove(member.id); setShowMenu(false); }}
//                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Retirer
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const TaskCard = ({ task, onUnassign, canManage }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   const getPriorityColor = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case 'high':
//         return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//       case 'low':
//         return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'completed':
//       case 'active':
//         return <CheckCircle2 className="w-4 h-4 text-green-500" />;
//       case 'in progress':
//         return <Timer className="w-4 h-4 text-blue-500" />;
//       case 'planning':
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'not started':
//         return <AlertCircle className="w-4 h-4 text-gray-400" />;
//       default:
//         return <Target className="w-4 h-4 text-gray-400" />;
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all group">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//             <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//           </div>
//           <div className="flex-1">
//             <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
//               {task.name}
//             </h4>
//             <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
//               {task.description || 'Aucune description disponible'}
//             </p>
//           </div>
//         </div>

//         {canManage && (
//           <div className="relative">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
//             >
//               <MoreVertical className="w-4 h-4" />
//             </button>

//             {showMenu && (
//               <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
//                 <button
//                   onClick={() => { onUnassign(task.id); setShowMenu(false); }}
//                   className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Désassigner du groupe
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           {getStatusIcon(task.status)}
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             {task.status || 'Non défini'}
//           </span>
//         </div>
        
//         <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
//           {task.priority || 'Normal'}
//         </span>
//       </div>
//     </div>
//   );
// };

// const ActivityItem = ({ activity }) => {
//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'member_added': return <Plus className="w-4 h-4 text-green-500" />;
//       case 'member_removed': return <Trash2 className="w-4 h-4 text-red-500" />;
//       case 'group_created': return <Users className="w-4 h-4 text-blue-500" />;
//       case 'group_updated': return <Edit className="w-4 h-4 text-yellow-500" />;
//       case 'task_assigned': return <Target className="w-4 h-4 text-green-500" />;
//       case 'task_unassigned': return <Target className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return "À l'instant";
//     if (diffInHours < 24) return `Il y a ${diffInHours}h`;
//     return `Il y a ${Math.floor(diffInHours / 24)}j`;
//   };

//   return (
//     <div className="flex gap-3 py-3">
//       <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
//         {getActivityIcon(activity.type)}
//       </div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
//         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//           {formatTime(activity.timestamp)}
//         </p>
//       </div>
//     </div>
//   );
// };

// function GroupDetailPage({ groupId, onNavigate }) {
//   const { 
//     getGroupById, 
//     openModal, 
//     removeMemberFromGroup, 
//     deleteGroup,
//     getAvailableTasks,
//     getTaskById,
//     unassignTaskFromGroup,
//     assignTaskToGroup
//   } = useGroups();
  
//   const [activeTab, setActiveTab] = useState('members'); // 'members', 'tasks', 'activity', 'settings'
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showTaskSelector, setShowTaskSelector] = useState(false);

//   const group = getGroupById(groupId);
//   const availableTasks = getAvailableTasks();

//   // Données simulées pour l'activité (enrichies avec les tâches)
//   const activities = [
//     {
//       id: 1,
//       type: 'task_assigned',
//       description: 'Tâche "Refonte UI/UX" assignée au groupe',
//       timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // Il y a 1h
//     },
//     {
//       id: 2,
//       type: 'member_added',
//       description: 'Alice Martin a ajouté Bob Dupont au groupe',
//       timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
//     },
//     {
//       id: 3,
//       type: 'group_updated',
//       description: 'La description du groupe a été mise à jour',
//       timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Il y a 1j
//     },
//     {
//       id: 4,
//       type: 'group_created',
//       description: 'Le groupe a été créé par Alice Martin',
//       timestamp: group?.createdAt || new Date(),
//     }
//   ];

//   if (!group) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Users className="w-12 h-12 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//             Groupe introuvable
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-6">
//             Le groupe que vous recherchez n'existe pas ou a été supprimé.
//           </p>
//           <button
//             onClick={() => onNavigate('groups')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Retour aux groupes
//           </button>
//         </div>
//       </div>
//     );
//   }

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
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   const handleRemoveMember = (memberId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir retirer ce membre du groupe ?')) {
//       removeMemberFromGroup(group.id, memberId);
//     }
//   };

//   const handleChangeRole = (memberId) => {
//     // Simulation du changement de rôle
//     console.log('Changer le rôle du membre:', memberId);
//   };

//   const handleDeleteGroup = () => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce groupe ? Cette action est irréversible.')) {
//       deleteGroup(group.id);
//       onNavigate('groups');
//     }
//   };

//   const handleUnassignTask = (taskId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir désassigner cette tâche du groupe ?')) {
//       unassignTaskFromGroup(group.id, taskId);
//     }
//   };

//   const handleAssignTask = (taskId) => {
//     assignTaskToGroup(group.id, taskId);
//     setShowTaskSelector(false);
//   };

//   const filteredMembers = group.members.filter(member =>
//     member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     member.role.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Obtenir les tâches assignées à ce groupe
//   const assignedTasks = group.assignedTasks.map(taskId => getTaskById(taskId)).filter(Boolean);
  
//   // Obtenir les tâches disponibles (non assignées à ce groupe)
//   const unassignedTasks = availableTasks.filter(task => !group.assignedTasks.includes(task.id));

//   const canManage = true; // Dans une vraie app, cela dépendrait des permissions de l'utilisateur

//   return (
//     <div className="flex-1 overflow-auto">
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={() => onNavigate('groups')}
//             className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
          
//           <div className={`w-16 h-16 ${getColorClass(group.color)} rounded-xl flex items-center justify-center`}>
//             <Users className="w-8 h-8 text-white" />
//           </div>
          
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-2">
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {group.name}
//               </h1>
//               {group.isPrivate ? (
//                 <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-lg text-sm">
//                   <Lock className="w-3 h-3" />
//                   <span>Privé</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg text-sm">
//                   <Unlock className="w-3 h-3" />
//                   <span>Public</span>
//                 </div>
//               )}
//             </div>
//             <p className="text-gray-600 dark:text-gray-400">
//               {group.description || 'Aucune description fournie'}
//             </p>
//             <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
//               <span>{group.members.length} membre{group.members.length > 1 ? 's' : ''}</span>
//               <span>•</span>
//               <span>{assignedTasks.length} tâche{assignedTasks.length > 1 ? 's' : ''}</span>
//               <span>•</span>
//               <span>Créé le {formatDate(group.createdAt)}</span>
//               <span>•</span>
//               <span>Par {group.owner.name}</span>
//             </div>
//           </div>
          
//           {canManage && (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => openModal(group)}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <Edit className="w-4 h-4" />
//                 Modifier
//               </button>
//               <button
//                 onClick={handleDeleteGroup}
//                 className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Supprimer
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{group.members.length}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Membres actifs</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                 <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{assignedTasks.length}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Tâches assignées</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                 <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Messages échangés</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
//                 <FileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Documents partagés</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
//           <button
//             onClick={() => setActiveTab('members')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'members'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Membres ({group.members.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('tasks')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'tasks'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Tâches ({assignedTasks.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('activity')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'activity'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Activité
//           </button>
//           <button
//             onClick={() => setActiveTab('settings')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'settings'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Paramètres
//           </button>
//         </div>

//         {/* Content based on active tab */}
//         {activeTab === 'members' && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Rechercher un membre..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               {canManage && (
//                 <button
//                   onClick={() => openModal(group)}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Ajouter un membre
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {filteredMembers.map((member) => (
//                 <MemberCard
//                   key={member.id}
//                   member={member}
//                   isOwner={group.owner.id === member.id}
//                   canManage={canManage}
//                   onRemove={handleRemoveMember}
//                   onChangeRole={handleChangeRole}
//                 />
//               ))}
//             </div>

//             {filteredMembers.length === 0 && (
//               <div className="text-center py-12">
//                 <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 dark:text-gray-400">
//                   Aucun membre trouvé avec ces critères
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'tasks' && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                   Tâches assignées au groupe
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Gérez les tâches attribuées à ce groupe
//                 </p>
//               </div>
//               {canManage && (
//                 <button
//                   onClick={() => setShowTaskSelector(true)}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Assigner une tâche
//                 </button>
//               )}
//             </div>

//             {assignedTasks.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 {assignedTasks.map((task) => (
//                   <TaskCard
//                     key={task.id}
//                     task={task}
//                     onUnassign={handleUnassignTask}
//                     canManage={canManage}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                   Aucune tâche assignée
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400 mb-6">
//                   Ce groupe n'a pas encore de tâches assignées. Commencez par assigner une tâche.
//                 </p>
//                 {canManage && (
//                   <button
//                     onClick={() => setShowTaskSelector(true)}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Assigner une tâche
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'activity' && (
//           <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//             <h3 className="font-medium text-gray-900 dark:text-white mb-4">Activité récente</h3>
//             <div className="space-y-4">
//               {activities.map((activity) => (
//                 <ActivityItem key={activity.id} activity={activity} />
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'settings' && (
//           <div className="space-y-6">
//             <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//               <h3 className="font-medium text-gray-900 dark:text-white mb-4">Informations générales</h3>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Nom du groupe
//                     </label>
//                     <p className="text-gray-900 dark:text-white">{group.name}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Visibilité
//                     </label>
//                     <p className="text-gray-900 dark:text-white">
//                       {group.isPrivate ? 'Privé' : 'Public'}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Description
//                   </label>
//                   <p className="text-gray-900 dark:text-white">
//                     {group.description || 'Aucune description'}
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Créé par
//                     </label>
//                     <p className="text-gray-900 dark:text-white">{group.owner.name}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Date de création
//                     </label>
//                     <p className="text-gray-900 dark:text-white">{formatDate(group.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {canManage && (
//               <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
//                 <h3 className="font-medium text-red-900 dark:text-red-300 mb-2">Zone de danger</h3>
//                 <p className="text-red-700 dark:text-red-400 text-sm mb-4">
//                   Une fois supprimé, ce groupe et toutes ses données seront définitivement perdues.
//                 </p>
//                 <button
//                   onClick={handleDeleteGroup}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   Supprimer ce groupe
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modal de sélection de tâches */}
//       {showTaskSelector && (
//         <div className="fixed inset-0 z-[80] overflow-y-auto">
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
//             onClick={() => setShowTaskSelector(false)}
//           />
          
//           <div className="flex min-h-full items-center justify-center p-4">
//             <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
//               {/* Header */}
//               <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Assigner des tâches
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Sélectionnez les tâches à assigner au groupe "{group.name}"
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setShowTaskSelector(false)}
//                   className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 {unassignedTasks.length > 0 ? (
//                   <div className="space-y-4">
//                     {unassignedTasks.map((task) => {
//                       const getPriorityColor = (priority) => {
//                         switch (priority?.toLowerCase()) {
//                           case 'high':
//                             return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
//                           case 'medium':
//                             return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//                           case 'low':
//                             return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//                           default:
//                             return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//                         }
//                       };

//                       return (
//                         <div
//                           key={task.id}
//                           className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
//                           onClick={() => handleAssignTask(task.id)}
//                         >
//                           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                             <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                           </div>
                          
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h4 className="font-medium text-gray-900 dark:text-white">
//                                 {task.name}
//                               </h4>
//                               <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
//                                 {task.priority || 'Normal'}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">
//                               {task.description || 'Aucune description'}
//                             </p>
//                             <div className="flex items-center gap-2 mt-2">
//                               <span className="text-xs text-gray-500 dark:text-gray-400">
//                                 Status: {task.status || 'Non défini'}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="flex items-center">
//                             <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                       Aucune tâche disponible
//                     </h4>
//                     <p className="text-gray-500 dark:text-gray-400">
//                       Toutes les tâches sont déjà assignées à ce groupe ou il n'y a pas de tâches créées.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Footer */}
//               <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   {unassignedTasks.length} tâche{unassignedTasks.length > 1 ? 's' : ''} disponible{unassignedTasks.length > 1 ? 's' : ''}
//                 </div>
//                 <button
//                   onClick={() => setShowTaskSelector(false)}
//                   className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                 >
//                   Fermer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GroupDetailPage;


// // src/pages/RolePage/RoleDetailPage.jsx
// import React, { useState } from 'react';
// import { 
//   ArrowLeft, Users, Settings, Plus, Search, 
//   Mail, Phone, MapPin, Calendar, Edit, 
//   Trash2, Crown, Shield, User, MoreVertical,
//   Lock, Unlock, MessageSquare, FileText, Clock,
//   Target, CheckCircle2, AlertCircle, Timer
// } from 'lucide-react';
// import { useRoles } from '@/context/RoleContext';

// const MemberCard = ({ member, isOwner, canManage, onRemove, onChangeRole }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
//       <div className="flex items-center gap-4">
//         <div className="relative">
//           <img
//             src={member.avatar}
//             alt={member.name}
//             className="w-12 h-12 rounded-full"
//           />
//           {isOwner && (
//             <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
//               <Crown className="w-3 h-3 text-white" />
//             </div>
//           )}
//         </div>
        
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2">
//             <h3 className="font-medium text-gray-900 dark:text-white truncate">
//               {member.name}
//             </h3>
//             {isOwner && (
//               <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded">
//                 Propriétaire
//               </span>
//             )}
//           </div>
//           <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
//           <p className="text-xs text-gray-500 dark:text-gray-500">{member.email}</p>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="flex gap-1">
//             <button
//               className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//               title="Envoyer un message"
//             >
//               <MessageSquare className="w-4 h-4" />
//             </button>
//             <button
//               className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
//               title="Envoyer un email"
//             >
//               <Mail className="w-4 h-4" />
//             </button>
//           </div>

//           {canManage && !isOwner && (
//             <div className="relative">
//               <button
//                 onClick={() => setShowMenu(!showMenu)}
//                 className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <MoreVertical className="w-4 h-4" />
//               </button>

//               {showMenu && (
//                 <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
//                   <button
//                     onClick={() => { onChangeRole(member.id); setShowMenu(false); }}
//                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <Shield className="w-4 h-4" />
//                     Changer rôle
//                   </button>
//                   <button
//                     onClick={() => { onRemove(member.id); setShowMenu(false); }}
//                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Retirer
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const TaskCard = ({ task, onUnassign, canManage }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   const getPriorityColor = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case 'high':
//         return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//       case 'low':
//         return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'completed':
//       case 'active':
//         return <CheckCircle2 className="w-4 h-4 text-green-500" />;
//       case 'in progress':
//         return <Timer className="w-4 h-4 text-blue-500" />;
//       case 'planning':
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'not started':
//         return <AlertCircle className="w-4 h-4 text-gray-400" />;
//       default:
//         return <Target className="w-4 h-4 text-gray-400" />;
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all group">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//             <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//           </div>
//           <div className="flex-1">
//             <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
//               {task.name}
//             </h4>
//             <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
//               {task.description || 'Aucune description disponible'}
//             </p>
//           </div>
//         </div>

//         {canManage && (
//           <div className="relative">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
//             >
//               <MoreVertical className="w-4 h-4" />
//             </button>

//             {showMenu && (
//               <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
//                 <button
//                   onClick={() => { onUnassign(task.id); setShowMenu(false); }}
//                   className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Désassigner du rôle
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           {getStatusIcon(task.status)}
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             {task.status || 'Non défini'}
//           </span>
//         </div>
        
//         <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
//           {task.priority || 'Normal'}
//         </span>
//       </div>
//     </div>
//   );
// };

// const ActivityItem = ({ activity }) => {
//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'member_added': return <Plus className="w-4 h-4 text-green-500" />;
//       case 'member_removed': return <Trash2 className="w-4 h-4 text-red-500" />;
//       case 'role_created': return <Users className="w-4 h-4 text-blue-500" />;
//       case 'role_updated': return <Edit className="w-4 h-4 text-yellow-500" />;
//       case 'task_assigned': return <Target className="w-4 h-4 text-green-500" />;
//       case 'task_unassigned': return <Target className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return "À l'instant";
//     if (diffInHours < 24) return `Il y a ${diffInHours}h`;
//     return `Il y a ${Math.floor(diffInHours / 24)}j`;
//   };

//   return (
//     <div className="flex gap-3 py-3">
//       <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
//         {getActivityIcon(activity.type)}
//       </div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
//         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//           {formatTime(activity.timestamp)}
//         </p>
//       </div>
//     </div>
//   );
// };

// function RoleDetailPage({ roleId, onNavigate }) {
//   const { 
//     getRoleById, 
//     openModal, 
//     removeMemberFromRole, 
//     deleteRole,
//     getAvailableTasks,
//     getTaskById,
//     unassignTaskFromRole,
//     assignTaskToRole
//   } = useRoles();
  
//   const [activeTab, setActiveTab] = useState('members'); // 'members', 'tasks', 'activity', 'settings'
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showTaskSelector, setShowTaskSelector] = useState(false);

//   const role = getRoleById(roleId);
//   const availableTasks = getAvailableTasks();

//   // Données simulées pour l'activité (enrichies avec les tâches)
//   const activities = [
//     {
//       id: 1,
//       type: 'task_assigned',
//       description: 'Tâche "Refonte UI/UX" assignée au rôle',
//       timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // Il y a 1h
//     },
//     {
//       id: 2,
//       type: 'member_added',
//       description: 'Alice Martin a ajouté Bob Dupont au rôle',
//       timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
//     },
//     {
//       id: 3,
//       type: 'role_updated',
//       description: 'La description du rôle a été mise à jour',
//       timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Il y a 1j
//     },
//     {
//       id: 4,
//       type: 'role_created',
//       description: 'Le rôle a été créé par Alice Martin',
//       timestamp: role?.createdAt || new Date(),
//     }
//   ];

//   if (!role) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Users className="w-12 h-12 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//             Rôle introuvable
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-6">
//             Le rôle que vous recherchez n'existe pas ou a été supprimé.
//           </p>
//           <button
//             onClick={() => onNavigate('roles')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Retour aux rôles
//           </button>
//         </div>
//       </div>
//     );
//   }

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
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   const handleRemoveMember = (memberId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir retirer ce membre du rôle ?')) {
//       removeMemberFromRole(role.id, memberId);
//     }
//   };

//   const handleChangeRole = (memberId) => {
//     // Simulation du changement de rôle
//     console.log('Changer le rôle du membre:', memberId);
//   };

//   const handleDeleteRole = () => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ? Cette action est irréversible.')) {
//       deleteRole(role.id);
//       onNavigate('roles');
//     }
//   };

//   const handleUnassignTask = (taskId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir désassigner cette tâche du rôle ?')) {
//       unassignTaskFromRole(role.id, taskId);
//     }
//   };

//   const handleAssignTask = (taskId) => {
//     assignTaskToRole(role.id, taskId);
//     setShowTaskSelector(false);
//   };

//   const filteredMembers = role.members.filter(member =>
//     member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     member.role.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Obtenir les tâches assignées à ce rôle
//   const assignedTasks = role.assignedTasks.map(taskId => getTaskById(taskId)).filter(Boolean);
  
//   // Obtenir les tâches disponibles (non assignées à ce rôle)
//   const unassignedTasks = availableTasks.filter(task => !role.assignedTasks.includes(task.id));

//   const canManage = true; // Dans une vraie app, cela dépendrait des permissions de l'utilisateur

//   return (
//     <div className="flex-1 overflow-auto">
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={() => onNavigate('roles')}
//             className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
          
//           <div className={`w-16 h-16 ${getColorClass(role.color)} rounded-xl flex items-center justify-center`}>
//             <Users className="w-8 h-8 text-white" />
//           </div>
          
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-2">
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {role.name}
//               </h1>
//               {role.isPrivate ? (
//                 <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-lg text-sm">
//                   <Lock className="w-3 h-3" />
//                   <span>Privé</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg text-sm">
//                   <Unlock className="w-3 h-3" />
//                   <span>Public</span>
//                 </div>
//               )}
//             </div>
//             <p className="text-gray-600 dark:text-gray-400">
//               {role.description || 'Aucune description fournie'}
//             </p>
//             <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
//               <span>{role.members.length} membre{role.members.length > 1 ? 's' : ''}</span>
//               <span>•</span>
//               <span>{assignedTasks.length} tâche{assignedTasks.length > 1 ? 's' : ''}</span>
//               <span>•</span>
//               <span>Créé le {formatDate(role.createdAt)}</span>
//               <span>•</span>
//               <span>Par {role.owner.name}</span>
//             </div>
//           </div>
          
//           {canManage && (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => openModal(role)}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <Edit className="w-4 h-4" />
//                 Modifier
//               </button>
//               <button
//                 onClick={handleDeleteRole}
//                 className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Supprimer
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{role.members.length}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Membres actifs</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                 <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{assignedTasks.length}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Tâches assignées</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                 <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Messages échangés</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
//                 <FileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Documents partagés</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
//           <button
//             onClick={() => setActiveTab('members')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'members'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Membres ({role.members.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('tasks')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'tasks'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Tâches ({assignedTasks.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('activity')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'activity'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Activité
//           </button>
//           <button
//             onClick={() => setActiveTab('settings')}
//             className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'settings'
//                 ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                 : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
//             }`}
//           >
//             Paramètres
//           </button>
//         </div>

//         {/* Content based on active tab */}
//         {activeTab === 'members' && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Rechercher un membre..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               {canManage && (
//                 <button
//                   onClick={() => openModal(role)}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Ajouter un membre
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {filteredMembers.map((member) => (
//                 <MemberCard
//                   key={member.id}
//                   member={member}
//                   isOwner={role.owner.id === member.id}
//                   canManage={canManage}
//                   onRemove={handleRemoveMember}
//                   onChangeRole={handleChangeRole}
//                 />
//               ))}
//             </div>

//             {filteredMembers.length === 0 && (
//               <div className="text-center py-12">
//                 <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 dark:text-gray-400">
//                   Aucun membre trouvé avec ces critères
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'tasks' && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                   Tâches assignées au rôle
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Gérez les tâches attribuées à ce rôle
//                 </p>
//               </div>
//               {canManage && (
//                 <button
//                   onClick={() => setShowTaskSelector(true)}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Assigner une tâche
//                 </button>
//               )}
//             </div>

//             {assignedTasks.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 {assignedTasks.map((task) => (
//                   <TaskCard
//                     key={task.id}
//                     task={task}
//                     onUnassign={handleUnassignTask}
//                     canManage={canManage}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                   Aucune tâche assignée
//                 </h3>
//                 <p className="text-gray-500 dark:text-gray-400 mb-6">
//                   Ce rôle n'a pas encore de tâches assignées. Commencez par assigner une tâche.
//                 </p>
//                 {canManage && (
//                   <button
//                     onClick={() => setShowTaskSelector(true)}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Assigner une tâche
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'activity' && (
//           <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//             <h3 className="font-medium text-gray-900 dark:text-white mb-4">Activité récente</h3>
//             <div className="space-y-4">
//               {activities.map((activity) => (
//                 <ActivityItem key={activity.id} activity={activity} />
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'settings' && (
//           <div className="space-y-6">
//             <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
//               <h3 className="font-medium text-gray-900 dark:text-white mb-4">Informations générales</h3>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Nom du rôle
//                     </label>
//                     <p className="text-gray-900 dark:text-white">{role.name}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Visibilité
//                     </label>
//                     <p className="text-gray-900 dark:text-white">
//                       {role.isPrivate ? 'Privé' : 'Public'}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Description
//                   </label>
//                   <p className="text-gray-900 dark:text-white">
//                     {role.description || 'Aucune description'}
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Créé par
//                     </label>
//                     <p className="text-gray-900 dark:text-white">{role.owner.name}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Date de création
//                     </label>
//                     <p className="text-gray-900 dark:text-white">{formatDate(role.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {canManage && (
//               <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
//                 <h3 className="font-medium text-red-900 dark:text-red-300 mb-2">Zone de danger</h3>
//                 <p className="text-red-700 dark:text-red-400 text-sm mb-4">
//                   Une fois supprimé, ce rôle et toutes ses données seront définitivement perdues.
//                 </p>
//                 <button
//                   onClick={handleDeleteRole}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   Supprimer ce rôle
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modal de sélection de tâches */}
//       {showTaskSelector && (
//         <div className="fixed inset-0 z-[80] overflow-y-auto">
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
//             onClick={() => setShowTaskSelector(false)}
//           />
          
//           <div className="flex min-h-full items-center justify-center p-4">
//             <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
//               {/* Header */}
//               <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Assigner des tâches
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Sélectionnez les tâches à assigner au rôle "{role.name}"
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setShowTaskSelector(false)}
//                   className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 {unassignedTasks.length > 0 ? (
//                   <div className="space-y-4">
//                     {unassignedTasks.map((task) => {
//                       const getPriorityColor = (priority) => {
//                         switch (priority?.toLowerCase()) {
//                           case 'high':
//                             return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
//                           case 'medium':
//                             return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//                           case 'low':
//                             return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//                           default:
//                             return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//                         }
//                       };

//                       return (
//                         <div
//                           key={task.id}
//                           className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
//                           onClick={() => handleAssignTask(task.id)}
//                         >
//                           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                             <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                           </div>
                          
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h4 className="font-medium text-gray-900 dark:text-white">
//                                 {task.name}
//                               </h4>
//                               <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
//                                 {task.priority || 'Normal'}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">
//                               {task.description || 'Aucune description'}
//                             </p>
//                             <div className="flex items-center gap-2 mt-2">
//                               <span className="text-xs text-gray-500 dark:text-gray-400">
//                                 Status: {task.status || 'Non défini'}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="flex items-center">
//                             <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                       Aucune tâche disponible
//                     </h4>
//                     <p className="text-gray-500 dark:text-gray-400">
//                       Toutes les tâches sont déjà assignées à ce rôle ou il n'y a pas de tâches créées.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Footer */}
//               <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   {unassignedTasks.length} tâche{unassignedTasks.length > 1 ? 's' : ''} disponible{unassignedTasks.length > 1 ? 's' : ''}
//                 </div>
//                 <button
//                   onClick={() => setShowTaskSelector(false)}
//                   className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                 >
//                   Fermer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RoleDetailPage;



// src/pages/RolePage/RoleDetailPage.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, Users, Calendar, Lock, Unlock, Edit, Trash2, 
  Plus, UserPlus, Target, CheckSquare, Mail, Badge
} from 'lucide-react';
import { useRoles } from '@/context/RoleContext';

function RoleDetailPage({ roleId, onNavigate }) {
  const { getRoleById, deleteRole, openModal, addMemberToRole, removeMemberFromRole, getAvailableUsers, getTaskById } = useRoles();
  const [showAddMember, setShowAddMember] = useState(false);
  
  const role = getRoleById(parseInt(roleId));

  if (!role) {
    return (
      <div className="flex-1 overflow-auto p-6">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Rôle introuvable
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Le rôle demandé n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => onNavigate('roles-equipe')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour aux rôles
          </button>
        </div>
      </div>
    );
  }

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

  const handleEdit = () => {
    openModal(role);
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le rôle "${role.name}" ?`)) {
      deleteRole(role.id);
      onNavigate('roles-equipe');
    }
  };

  const handleAddMember = (user) => {
    addMemberToRole(role.id, user);
    setShowAddMember(false);
  };

  const handleRemoveMember = (memberId) => {
    if (window.confirm('Êtes-vous sûr de vouloir retirer ce membre du rôle ?')) {
      removeMemberFromRole(role.id, memberId);
    }
  };

  const assignedTasks = role.assignedTasks.map(taskId => getTaskById(taskId)).filter(Boolean);
  const availableUsers = getAvailableUsers(role.id);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('roles-equipe')}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {role.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Détails du rôle et gestion des membres
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte d'information */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 ${getColorClass(role.color)} rounded-lg flex items-center justify-center`}>
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {role.name}
                    </h2>
                    {role.isPrivate ? (
                      <Lock className="w-5 h-5 text-gray-400" title="Rôle privé" />
                    ) : (
                      <Unlock className="w-5 h-5 text-gray-400" title="Rôle public" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {role.description || 'Aucune description fournie pour ce rôle.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Créé le {new Date(role.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Par {role.owner.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Tâches assignées */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Tâches assignées ({assignedTasks.length})
                </h3>
              </div>

              {assignedTasks.length > 0 ? (
                <div className="space-y-3">
                  {assignedTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {task.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {task.description}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Aucune tâche assignée à ce rôle
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Membres */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Membres ({role.members.length})
                </h3>
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>

              {/* Formulaire d'ajout de membre */}
              {showAddMember && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Ajouter un membre
                  </h4>
                  <div className="space-y-2">
                    {availableUsers.length > 0 ? (
                      availableUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleAddMember(user)}
                          className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {user.role}
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Aucun utilisateur disponible
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Liste des membres */}
              <div className="space-y-3">
                {role.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {member.role}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-all"
                      title="Retirer du rôle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {role.members.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Aucun membre dans ce rôle
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleDetailPage;