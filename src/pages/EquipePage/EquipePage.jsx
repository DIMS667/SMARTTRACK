// src/pages/EquipePage/EquipePage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Grid, List, 
  Calendar, MoreVertical, 
  Edit, Trash2, Target, X, CheckCircle, Pin, PinOff
} from 'lucide-react';
import { useTeams } from '@/context/TeamsContext';

const TeamCard = ({ team, onEdit, onDelete, onManageAxes }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { getAxisById, toggleTeamPin } = useTeams();

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

  const assignedAxes = team.assignedAxes.map(axisId => getAxisById(axisId)).filter(Boolean);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${getColorClass(team.color)} rounded-lg flex items-center justify-center`}>
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          {team.isPinned && (
            <Pin className="w-4 h-4 text-blue-500" title="Épinglé dans QuickActions" />
          )}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
                <button
                  onClick={() => { toggleTeamPin(team.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {team.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  {team.isPinned ? 'Désépingler' : 'Épingler'}
                </button>
                <button
                  onClick={() => { onManageAxes(team); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Target className="w-4 h-4" />
                  Gérer les axes
                </button>
                <button
                  onClick={() => { onEdit(team); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => { onDelete(team.id); setShowMenu(false); }}
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
        {team.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {team.description || 'Aucune description fournie pour cette équipe.'}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Membres:</span>
          <span className="font-medium text-gray-900 dark:text-white">{team.members.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Axes assignés:</span>
          <span className="font-medium text-gray-900 dark:text-white">{assignedAxes.length}</span>
        </div>
      </div>

      {assignedAxes.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {assignedAxes.slice(0, 2).map((axis, index) => (
              <span key={index} className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded">
                {axis.name}
              </span>
            ))}
            {assignedAxes.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                +{assignedAxes.length - 2}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Créée le {formatDate(team.createdAt)}</span>
        </div>
        <span>Par {team.owner.name}</span>
      </div>

      <button
        onClick={() => onManageAxes(team)}
        className="w-full px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm font-medium"
      >
        Gérer les axes
      </button>
    </div>
  );
};

const TeamAxesModal = ({ team, isOpen, onClose }) => {
  const { getAvailableAxes, assignTeamToAxis, unassignTeamFromAxis } = useTeams();
  const [localAssignedAxes, setLocalAssignedAxes] = useState([]);

  // Initialiser l'état local avec les axes assignés de l'équipe
  useEffect(() => {
    if (team) {
      setLocalAssignedAxes([...team.assignedAxes]);
    }
  }, [team]);

  const availableAxes = getAvailableAxes();

  const handleToggleAssignment = (axisId) => {
    if (localAssignedAxes.includes(axisId)) {
      // Désassigner
      setLocalAssignedAxes(prev => prev.filter(id => id !== axisId));
      unassignTeamFromAxis(team.id, axisId);
    } else {
      // Assigner
      setLocalAssignedAxes(prev => [...prev, axisId]);
      assignTeamToAxis(team.id, axisId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Gérer les axes de l'équipe "{team.name}"
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sélectionnez les axes auxquels assigner cette équipe
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {availableAxes.map((axis) => {
                const isAssigned = localAssignedAxes.includes(axis.id);
                return (
                  <div
                    key={axis.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      isAssigned
                        ? 'border-purple-200 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleToggleAssignment(axis.id)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      axis.color === 'blue' ? 'bg-blue-500' :
                      axis.color === 'green' ? 'bg-green-500' :
                      axis.color === 'purple' ? 'bg-purple-500' :
                      axis.color === 'red' ? 'bg-red-500' :
                      axis.color === 'yellow' ? 'bg-yellow-500' :
                      axis.color === 'pink' ? 'bg-pink-500' :
                      'bg-gray-500'
                    }`}>
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {axis.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {axis.description || 'Aucune description'}
                      </p>
                    </div>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isAssigned
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {isAssigned && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {availableAxes.length === 0 && (
              <div className="text-center py-8">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Aucun axe disponible
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun axe n'a été créé. Créez d'abord des axes dans les paramètres pour pouvoir les assigner aux équipes.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {localAssignedAxes.length} axe{localAssignedAxes.length > 1 ? 's' : ''} assigné{localAssignedAxes.length > 1 ? 's' : ''}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Terminé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function EquipePage({ onNavigate }) {
  const { teams, openModal, deleteTeam } = useTeams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showAxesModal, setShowAxesModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleEdit = (team) => {
    openModal(team);
  };

  const handleDelete = (teamId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
      deleteTeam(teamId);
    }
  };

  const handleManageAxes = (team) => {
    setSelectedTeam(team);
    setShowAxesModal(true);
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Rechercher une équipe..."
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
            Nouvelle équipe
          </button>
        </div>
      </div>

      {filteredTeams.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onManageAxes={handleManageAxes}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'Aucune équipe trouvée' : 'Aucune équipe créée'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {searchTerm 
              ? 'Essayez de modifier vos critères de recherche pour voir plus de résultats.'
              : 'Commencez par créer votre première équipe pour organiser vos collaborateurs.'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => openModal()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer votre première équipe
            </button>
          )}
        </div>
      )}

      {showAxesModal && selectedTeam && (
        <TeamAxesModal 
          team={selectedTeam}
          isOpen={showAxesModal}
          onClose={() => {
            setShowAxesModal(false);
            setSelectedTeam(null);
          }}
        />
      )}
    </div>
  );
}

export default EquipePage;