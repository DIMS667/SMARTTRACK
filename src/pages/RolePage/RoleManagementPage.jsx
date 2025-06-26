// src/pages/RolePage/RoleManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Grid, List, 
  Lock, Unlock, Calendar, MoreVertical, 
  Edit, Trash2, Eye, Pin, PinOff
} from 'lucide-react';
import { useRoles } from '@/context/RoleContext';

const RoleCard = ({ role, onEdit, onDelete, onView }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { getTaskById, toggleRolePin } = useRoles();

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.menu-container')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

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

  // Obtenir les tâches assignées à ce rôle
  const assignedTasks = role.assignedTasks.map(taskId => getTaskById(taskId)).filter(Boolean);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${getColorClass(role.color)} rounded-lg flex items-center justify-center`}>
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          {role.isPinned && (
            <Pin className="w-4 h-4 text-blue-500" title="Épinglé dans QuickActions" />
          )}
          {role.isPrivate ? (
            <Lock className="w-4 h-4 text-gray-400" title="Rôle privé" />
          ) : (
            <Unlock className="w-4 h-4 text-gray-400" title="Rôle public" />
          )}
          <div className="relative menu-container">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
                <button
                  onClick={() => { toggleRolePin(role.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {role.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  {role.isPinned ? 'Désépingler' : 'Épingler'}
                </button>
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

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Membres:</span>
          <span className="font-medium text-gray-900 dark:text-white">{role.members.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Tâches assignées:</span>
          <span className="font-medium text-gray-900 dark:text-white">{assignedTasks.length}</span>
        </div>
      </div>

      {/* Affichage des tâches assignées */}
      {assignedTasks.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {assignedTasks.slice(0, 2).map((task, index) => (
              <span key={index} className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                {task.name}
              </span>
            ))}
            {assignedTasks.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                +{assignedTasks.length - 2}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Créé le {formatDate(role.createdAt)}</span>
        </div>
        <span>Par {role.owner.name}</span>
      </div>

      <button
        onClick={() => onView(role.id)}
        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
      >
        Voir les détails
      </button>
    </div>
  );
};

function RoleManagementPage({ onNavigate }) {
  const { roles, openModal, deleteRole } = useRoles();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

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

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
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

          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouveau rôle
          </button>
        </div>
      </div>

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
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'Aucun rôle trouvé' : 'Aucun rôle créé'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {searchTerm 
              ? 'Essayez de modifier vos critères de recherche pour voir plus de résultats.'
              : 'Commencez par créer votre premier rôle pour organiser vos utilisateurs.'
            }
          </p>
          {!searchTerm && (
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
  );
}

export default RoleManagementPage;