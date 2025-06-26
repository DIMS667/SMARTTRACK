// src/pages/RolePage/modal/TeamModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, Users, Plus, Trash2 } from 'lucide-react';
import { useTeams } from '@/context/TeamsContext';

function TeamModal() {
  const { 
    isModalOpen, 
    editingTeam, 
    closeModal, 
    createTeam, 
    updateTeam, 
    colorOptions,
    getAvailableUsers,
    addMemberToTeam,
    removeMemberFromTeam
  } = useTeams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'blue',
    members: [],
    assignedAxes: []
  });

  const [showAddMember, setShowAddMember] = useState(false);

  useEffect(() => {
    if (editingTeam) {
      setFormData({
        name: editingTeam.name || '',
        description: editingTeam.description || '',
        color: editingTeam.color || 'blue',
        members: editingTeam.members || [],
        assignedAxes: editingTeam.assignedAxes || []
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: 'blue',
        members: [],
        assignedAxes: []
      });
    }
    setShowAddMember(false);
  }, [editingTeam, isModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      if (editingTeam) {
        updateTeam(editingTeam.id, formData);
      } else {
        createTeam(formData);
      }
      closeModal();
    }
  };

  const handleAddMember = (user) => {
    const memberExists = formData.members.some(m => m.id === user.id);
    if (!memberExists) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, user]
      }));
    }
    setShowAddMember(false);
  };

  const handleRemoveMember = (memberId) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== memberId)
    }));
  };

  const availableUsers = getAvailableUsers(editingTeam?.id);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeModal}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingTeam ? 'Modifier l\'équipe' : 'Créer une nouvelle équipe'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de l'équipe *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez le nom de l'équipe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Description de l'équipe (optionnel)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Couleur
                  </label>
                  <div className="flex gap-2">
                    {colorOptions.map((colorOption) => (
                      <button
                        key={colorOption.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: colorOption.value })}
                        className={`w-8 h-8 rounded-full ${colorOption.bg} border-2 transition-all ${
                          formData.color === colorOption.value 
                            ? 'border-gray-900 dark:border-white scale-110' 
                            : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                        }`}
                        title={colorOption.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Gestion des membres */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Membres ({formData.members.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddMember(!showAddMember)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Ajouter
                  </button>
                </div>

                {/* Formulaire d'ajout de membre */}
                {showAddMember && (
                  <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Utilisateurs disponibles
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {availableUsers.length > 0 ? (
                        availableUsers.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => handleAddMember(user)}
                            className="w-full flex items-center gap-2 p-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                          >
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              - {user.role}
                            </span>
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
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {member.role}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.members.length === 0 && (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      Aucun membre ajouté
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {editingTeam ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamModal;