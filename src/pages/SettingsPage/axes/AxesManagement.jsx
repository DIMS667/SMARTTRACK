// src/pages/SettingsPage/axes/AxesManagement.jsx
import React, { useState } from 'react';
import { Target, Plus, Search, Tag, Users } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import useAxes from './hooks/useAxes';
import AxisCard from './components/AxisCard';
import AxisModal from './components/AxisModal';
import AxisDetailModal from './components/AxisDetailModal';

// Fonction utilitaire pour obtenir l'icône par défaut pour un nom
const getIconComponent = (iconName) => {
  if (!iconName) return Target;
  
  // Si c'est une chaîne, essayer de trouver le composant correspondant
  if (typeof iconName === 'string' && LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  
  // Sinon retourner l'icône par défaut
  return Target;
};

/**
 * Composant principal pour la gestion des axes
 */
function AxesManagement() {
  // Utiliser notre hook personnalisé pour gérer les axes
  const { axes, allThemes, createAxis, updateAxis, deleteAxis, searchAxes, updateThemesList } = useAxes();
  
  // État pour la recherche et les modales
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingAxis, setEditingAxis] = useState(null);
  const [selectedAxis, setSelectedAxis] = useState(null);

  // Handlers pour les actions
  const handleCreate = () => {
    setEditingAxis(null);
    setShowModal(true);
  };

  const handleEdit = (axis) => {
    setEditingAxis(axis);
    setShowModal(true);
  };

  const handleView = (axis) => {
    setSelectedAxis(axis);
    setShowDetailModal(true);
  };

  const handleDelete = (axisId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet axe ?')) {
      deleteAxis(axisId);
    }
  };

  const handleSave = (axisData) => {
    if (editingAxis) {
      // Modifier un axe existant
      updateAxis(editingAxis.id, axisData);
    } else {
      // Créer un nouvel axe
      createAxis(axisData);
    }
    
    // Mettre à jour explicitement la liste des thèmes
    if (axisData.themes && axisData.themes.length > 0) {
      updateThemesList(axisData.themes);
    }
    
    setShowModal(false);
  };

  // Filtrer les axes selon le terme de recherche
  const filteredAxes = searchAxes(searchTerm);

  // Calculer les statistiques
  const totalTeams = axes.reduce((acc, axis) => acc + (axis.teams?.length || 0), 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des axes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Créez et gérez les axes stratégiques de votre organisation
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvel axe
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un axe ou un thème..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{axes.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Axes créés</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Tag className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{allThemes.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Thèmes disponibles</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTeams}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Équipes assignées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredAxes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAxes.map((axis) => (
            <AxisCard
              key={axis.id}
              axis={axis}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'Aucun axe trouvé' : 'Aucun axe créé'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {searchTerm 
              ? 'Essayez de modifier vos critères de recherche pour voir plus de résultats.'
              : 'Commencez par créer votre premier axe stratégique pour organiser vos équipes.'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={handleCreate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer votre premier axe
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <AxisModal
        axis={editingAxis}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        allThemes={allThemes}
      />
      
      <AxisDetailModal 
        axis={selectedAxis}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
}

export default AxesManagement;