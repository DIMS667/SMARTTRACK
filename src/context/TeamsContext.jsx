// src/context/TeamsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const TeamsContext = createContext();

// Données simulées pour les équipes
const initialTeams = [
  {
    id: 1,
    name: "Dev Team Alpha",
    description: "Équipe de développement frontend",
    color: "blue",
    isPinned: true,
    members: [
      { id: 1, name: "Alice Martin", email: "alice@smarttrack.com", role: "Lead Developer", avatar: "https://ui-avatars.com/api/?name=Alice+Martin&background=3b82f6" },
      { id: 2, name: "Bob Dupont", email: "bob@smarttrack.com", role: "Developer", avatar: "https://ui-avatars.com/api/?name=Bob+Dupont&background=10b981" },
      { id: 3, name: "Claire Petit", email: "claire@smarttrack.com", role: "UI Designer", avatar: "https://ui-avatars.com/api/?name=Claire+Petit&background=f59e0b" }
    ],
    assignedAxes: [1, 2], // IDs des axes auxquels cette équipe est assignée
    createdAt: new Date('2024-01-15'),
    owner: { id: 1, name: "Alice Martin" }
  },
  {
    id: 2,
    name: "Marketing Squad",
    description: "Équipe marketing et communication",
    color: "purple",
    isPinned: false,
    members: [
      { id: 8, name: "Henri Blanc", email: "henri@smarttrack.com", role: "Marketing Manager", avatar: "https://ui-avatars.com/api/?name=Henri+Blanc&background=14b8a6" },
      { id: 9, name: "Isabelle Noir", email: "isabelle@smarttrack.com", role: "Content Creator", avatar: "https://ui-avatars.com/api/?name=Isabelle+Noir&background=f97316" }
    ],
    assignedAxes: [3], // Assignée à l'axe Marketing
    createdAt: new Date('2024-01-20'),
    owner: { id: 8, name: "Henri Blanc" }
  }
];

// Pool d'utilisateurs disponibles (étendu)
const availableUsers = [
  { id: 1, name: "Alice Martin", email: "alice@smarttrack.com", role: "Lead Developer", avatar: "https://ui-avatars.com/api/?name=Alice+Martin&background=3b82f6" },
  { id: 2, name: "Bob Dupont", email: "bob@smarttrack.com", role: "Developer", avatar: "https://ui-avatars.com/api/?name=Bob+Dupont&background=10b981" },
  { id: 3, name: "Claire Petit", email: "claire@smarttrack.com", role: "UI Designer", avatar: "https://ui-avatars.com/api/?name=Claire+Petit&background=f59e0b" },
  { id: 4, name: "David Bernard", email: "david@smarttrack.com", role: "Senior Backend", avatar: "https://ui-avatars.com/api/?name=David+Bernard&background=ef4444" },
  { id: 5, name: "Emma Rousseau", email: "emma@smarttrack.com", role: "DevOps", avatar: "https://ui-avatars.com/api/?name=Emma+Rousseau&background=8b5cf6" },
  { id: 6, name: "Frank Moreau", email: "frank@smarttrack.com", role: "CEO", avatar: "https://ui-avatars.com/api/?name=Frank+Moreau&background=6366f1" },
  { id: 7, name: "Grace Leroy", email: "grace@smarttrack.com", role: "CTO", avatar: "https://ui-avatars.com/api/?name=Grace+Leroy&background=ec4899" },
  { id: 8, name: "Henri Blanc", email: "henri@smarttrack.com", role: "Marketing Manager", avatar: "https://ui-avatars.com/api/?name=Henri+Blanc&background=14b8a6" },
  { id: 9, name: "Isabelle Noir", email: "isabelle@smarttrack.com", role: "Content Creator", avatar: "https://ui-avatars.com/api/?name=Isabelle+Noir&background=f97316" },
  { id: 10, name: "Julien Rouge", email: "julien@smarttrack.com", role: "QA Engineer", avatar: "https://ui-avatars.com/api/?name=Julien+Rouge&background=84cc16" },
  { id: 11, name: "Karine Vert", email: "karine@smarttrack.com", role: "Business Analyst", avatar: "https://ui-avatars.com/api/?name=Karine+Vert&background=06b6d4" },
  { id: 12, name: "Louis Jaune", email: "louis@smarttrack.com", role: "Product Owner", avatar: "https://ui-avatars.com/api/?name=Louis+Jaune&background=8b5cf6" }
];

// Axes simulés (en attendant la création dans paramètres)
const mockAxes = [
  { id: 1, name: "Développement", description: "Axe technique et développement", color: "blue" },
  { id: 2, name: "Innovation", description: "Recherche et innovation", color: "purple" },
  { id: 3, name: "Marketing", description: "Marketing et communication", color: "green" },
  { id: 4, name: "Finance", description: "Gestion financière", color: "yellow" },
  { id: 5, name: "Ressources Humaines", description: "Gestion du personnel", color: "pink" }
];

const colorOptions = [
  { value: 'blue', label: 'Bleu', bg: 'bg-blue-500' },
  { value: 'green', label: 'Vert', bg: 'bg-green-500' },
  { value: 'purple', label: 'Violet', bg: 'bg-purple-500' },
  { value: 'red', label: 'Rouge', bg: 'bg-red-500' },
  { value: 'yellow', label: 'Jaune', bg: 'bg-yellow-500' },
  { value: 'pink', label: 'Rose', bg: 'bg-pink-500' },
  { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-500' },
  { value: 'gray', label: 'Gris', bg: 'bg-gray-500' }
];

export function TeamsProvider({ children }) {
  const [teams, setTeams] = useState(initialTeams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  // Charger les équipes depuis le localStorage au démarrage
  useEffect(() => {
    const savedTeams = localStorage.getItem('smarttrack-teams');
    if (savedTeams) {
      try {
        const parsed = JSON.parse(savedTeams);
        setTeams(parsed.map(team => ({
          ...team,
          createdAt: new Date(team.createdAt)
        })));
      } catch (error) {
        console.error('Erreur lors du chargement des équipes:', error);
      }
    }
  }, []);

  // Sauvegarder les équipes dans le localStorage
  useEffect(() => {
    localStorage.setItem('smarttrack-teams', JSON.stringify(teams));
  }, [teams]);

  // Créer une nouvelle équipe
  const createTeam = (teamData) => {
    const newTeam = {
      id: Date.now(),
      ...teamData,
      members: teamData.members || [],
      assignedAxes: teamData.assignedAxes || [],
      isPinned: false,
      createdAt: new Date(),
      owner: { id: 1, name: "Vous" }
    };

    setTeams(prev => [...prev, newTeam]);
    setIsModalOpen(false);
    setEditingTeam(null);
    return newTeam;
  };

  // Modifier une équipe existante
  const updateTeam = (teamId, updates) => {
    setTeams(prev => 
      prev.map(team => 
        team.id === teamId 
          ? { 
              ...team, 
              ...updates,
              // Garder assignedAxes si pas dans updates, sinon utiliser updates.assignedAxes
              assignedAxes: updates.assignedAxes !== undefined ? updates.assignedAxes : team.assignedAxes
            }
          : team
      )
    );
    setIsModalOpen(false);
    setEditingTeam(null);
  };

  // Supprimer une équipe
  const deleteTeam = (teamId) => {
    setTeams(prev => prev.filter(team => team.id !== teamId));
  };

  // Épingler/Désépingler une équipe
  const toggleTeamPin = (teamId) => {
    setTeams(prev => 
      prev.map(team => 
        team.id === teamId 
          ? { ...team, isPinned: !team.isPinned }
          : team
      )
    );
  };

  // Ajouter un membre à une équipe
  const addMemberToTeam = (teamId, member) => {
    setTeams(prev => 
      prev.map(team => {
        if (team.id === teamId) {
          const memberExists = team.members.some(m => m.id === member.id);
          if (!memberExists) {
            return {
              ...team,
              members: [...team.members, member]
            };
          }
        }
        return team;
      })
    );
  };

  // Retirer un membre d'une équipe
  const removeMemberFromTeam = (teamId, memberId) => {
    setTeams(prev => 
      prev.map(team => 
        team.id === teamId 
          ? {
              ...team,
              members: team.members.filter(m => m.id !== memberId)
            }
          : team
      )
    );
  };

  // Assigner une équipe à un axe
  const assignTeamToAxis = (teamId, axisId) => {
    setTeams(prev => 
      prev.map(team => {
        if (team.id === teamId) {
          const axisExists = team.assignedAxes.includes(axisId);
          if (!axisExists) {
            return {
              ...team,
              assignedAxes: [...team.assignedAxes, axisId]
            };
          }
        }
        return team;
      })
    );
  };

  // Désassigner une équipe d'un axe
  const unassignTeamFromAxis = (teamId, axisId) => {
    setTeams(prev => 
      prev.map(team => 
        team.id === teamId 
          ? {
              ...team,
              assignedAxes: team.assignedAxes.filter(aId => aId !== axisId)
            }
          : team
      )
    );
  };

  // Obtenir une équipe par ID
  const getTeamById = (teamId) => {
    return teams.find(team => team.id === parseInt(teamId));
  };

  // Obtenir les équipes assignées à un axe
  const getTeamsByAxis = (axisId) => {
    return teams.filter(team => team.assignedAxes.includes(axisId));
  };

  // Obtenir les utilisateurs disponibles (non membres d'une équipe spécifique)
  const getAvailableUsers = (teamId = null) => {
    if (!teamId) return availableUsers;
    
    const team = getTeamById(teamId);
    if (!team) return availableUsers;
    
    const memberIds = team.members.map(m => m.id);
    return availableUsers.filter(user => !memberIds.includes(user.id));
  };

  // Obtenir les axes disponibles (simulés pour le moment)
  const getAvailableAxes = () => {
    return mockAxes;
  };

  // Obtenir un axe par ID
  const getAxisById = (axisId) => {
    return mockAxes.find(axis => axis.id === axisId);
  };

  // Ouvrir la modal de création/édition
  const openModal = (team = null) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  // Fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
  };

  const value = {
    teams,
    isModalOpen,
    editingTeam,
    colorOptions,
    availableUsers,
    createTeam,
    updateTeam,
    deleteTeam,
    toggleTeamPin,
    addMemberToTeam,
    removeMemberFromTeam,
    assignTeamToAxis,
    unassignTeamFromAxis,
    getTeamById,
    getTeamsByAxis,
    getAvailableUsers,
    getAvailableAxes,
    getAxisById,
    openModal,
    closeModal
  };

  return (
    <TeamsContext.Provider value={value}>
      {children}
    </TeamsContext.Provider>
  );
}

export function useTeams() {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamsProvider');
  }
  return context;
}

export default TeamsProvider;