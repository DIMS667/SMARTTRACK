// src/context/RoleContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const RolesContext = createContext();

// Données simulées pour les rôles
const initialRoles = [
  {
    id: 1,
    name: "Équipe Frontend",
    description: "Développeurs frontend React/Vue",
    color: "blue",
    isPinned: false,
    members: [
      { id: 1, name: "Alice Martin", email: "alice@smarttrack.com", role: "Lead Developer", avatar: "https://ui-avatars.com/api/?name=Alice+Martin&background=3b82f6" },
      { id: 2, name: "Bob Dupont", email: "bob@smarttrack.com", role: "Developer", avatar: "https://ui-avatars.com/api/?name=Bob+Dupont&background=10b981" },
      { id: 3, name: "Claire Petit", email: "claire@smarttrack.com", role: "UI Designer", avatar: "https://ui-avatars.com/api/?name=Claire+Petit&background=f59e0b" }
    ],
    assignedTasks: [1, 2], // IDs des tâches assignées à ce rôle
    createdAt: new Date('2024-01-15'),
    isPrivate: false,
    owner: { id: 1, name: "Alice Martin" }
  },
  {
    id: 2,
    name: "Équipe Backend",
    description: "Développeurs backend Node.js/Python",
    color: "green",
    isPinned: false,
    members: [
      { id: 4, name: "David Bernard", email: "david@smarttrack.com", role: "Senior Backend", avatar: "https://ui-avatars.com/api/?name=David+Bernard&background=ef4444" },
      { id: 5, name: "Emma Rousseau", email: "emma@smarttrack.com", role: "DevOps", avatar: "https://ui-avatars.com/api/?name=Emma+Rousseau&background=8b5cf6" }
    ],
    assignedTasks: [3], // Assigné à la tâche API Development
    createdAt: new Date('2024-01-20'),
    isPrivate: false,
    owner: { id: 4, name: "David Bernard" }
  },
  {
    id: 3,
    name: "Direction",
    description: "Équipe de direction et management",
    color: "purple",
    isPinned: true,
    members: [
      { id: 6, name: "Frank Moreau", email: "frank@smarttrack.com", role: "CEO", avatar: "https://ui-avatars.com/api/?name=Frank+Moreau&background=6366f1" },
      { id: 7, name: "Grace Leroy", email: "grace@smarttrack.com", role: "CTO", avatar: "https://ui-avatars.com/api/?name=Grace+Leroy&background=ec4899" }
    ],
    assignedTasks: [4], // Assigné à la tâche Strategic Planning
    createdAt: new Date('2024-01-10'),
    isPrivate: true,
    owner: { id: 6, name: "Frank Moreau" }
  }
];

// Pool d'utilisateurs disponibles pour simulation
const availableUsers = [
  { id: 8, name: "Henri Blanc", email: "henri@smarttrack.com", role: "Consultant", avatar: "https://ui-avatars.com/api/?name=Henri+Blanc&background=14b8a6" },
  { id: 9, name: "Isabelle Noir", email: "isabelle@smarttrack.com", role: "Project Manager", avatar: "https://ui-avatars.com/api/?name=Isabelle+Noir&background=f97316" },
  { id: 10, name: "Julien Rouge", email: "julien@smarttrack.com", role: "QA Engineer", avatar: "https://ui-avatars.com/api/?name=Julien+Rouge&background=84cc16" },
  { id: 11, name: "Karine Vert", email: "karine@smarttrack.com", role: "Business Analyst", avatar: "https://ui-avatars.com/api/?name=Karine+Vert&background=06b6d4" },
  { id: 12, name: "Louis Jaune", email: "louis@smarttrack.com", role: "Product Owner", avatar: "https://ui-avatars.com/api/?name=Louis+Jaune&background=8b5cf6" }
];

// Tâches simulées (en attendant la création dans paramètres)
const mockTasks = [
  { id: 1, name: "Refonte UI/UX", description: "Redesign de l'interface utilisateur", priority: "High", status: "In Progress" },
  { id: 2, name: "Optimisation Performance", description: "Amélioration des performances frontend", priority: "Medium", status: "Planning" },
  { id: 3, name: "API Development", description: "Développement des APIs REST", priority: "High", status: "In Progress" },
  { id: 4, name: "Strategic Planning", description: "Planification stratégique Q2", priority: "High", status: "Active" },
  { id: 5, name: "Database Migration", description: "Migration vers nouvelle base de données", priority: "Medium", status: "Planning" },
  { id: 6, name: "Security Audit", description: "Audit de sécurité complet", priority: "High", status: "Not Started" }
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

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Charger les rôles depuis le localStorage au démarrage
  useEffect(() => {
    const savedRoles = localStorage.getItem('smarttrack-roles');
    if (savedRoles) {
      try {
        const parsed = JSON.parse(savedRoles);
        setRoles(parsed.map(role => ({
          ...role,
          createdAt: new Date(role.createdAt)
        })));
      } catch (error) {
        console.error('Erreur lors du chargement des rôles:', error);
      }
    }
  }, []);

  // Sauvegarder les rôles dans le localStorage
  useEffect(() => {
    localStorage.setItem('smarttrack-roles', JSON.stringify(roles));
  }, [roles]);

  // Créer un nouveau rôle
  const createRole = (roleData) => {
    const newRole = {
      id: Date.now(),
      ...roleData,
      members: roleData.members || [],
      assignedTasks: roleData.assignedTasks || [],
      isPinned: false,
      isPrivate: false, // Toujours public par défaut
      createdAt: new Date(),
      owner: { id: 1, name: "Vous" }
    };

    setRoles(prev => [...prev, newRole]);
    setIsModalOpen(false); // Fermer automatiquement le modal
    setEditingRole(null);
    return newRole;
  };

  // Modifier un rôle existant
  const updateRole = (roleId, updates) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === roleId 
          ? { ...role, ...updates }
          : role
      )
    );
    setIsModalOpen(false); // Fermer automatiquement le modal
    setEditingRole(null);
  };

  // Supprimer un rôle
  const deleteRole = (roleId) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  // Épingler/Désépingler un rôle
  const toggleRolePin = (roleId) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === roleId 
          ? { ...role, isPinned: !role.isPinned }
          : role
      )
    );
  };

  // Ajouter un membre à un rôle
  const addMemberToRole = (roleId, member) => {
    setRoles(prev => 
      prev.map(role => {
        if (role.id === roleId) {
          const memberExists = role.members.some(m => m.id === member.id);
          if (!memberExists) {
            return {
              ...role,
              members: [...role.members, member]
            };
          }
        }
        return role;
      })
    );
  };

  // Retirer un membre d'un rôle
  const removeMemberFromRole = (roleId, memberId) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === roleId 
          ? {
              ...role,
              members: role.members.filter(m => m.id !== memberId)
            }
          : role
      )
    );
  };

  // Assigner une tâche à un rôle
  const assignTaskToRole = (roleId, taskId) => {
    setRoles(prev => 
      prev.map(role => {
        if (role.id === roleId) {
          const taskExists = role.assignedTasks.includes(taskId);
          if (!taskExists) {
            return {
              ...role,
              assignedTasks: [...role.assignedTasks, taskId]
            };
          }
        }
        return role;
      })
    );
  };

  // Désassigner une tâche d'un rôle
  const unassignTaskFromRole = (roleId, taskId) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === roleId 
          ? {
              ...role,
              assignedTasks: role.assignedTasks.filter(tId => tId !== taskId)
            }
          : role
      )
    );
  };

  // Obtenir un rôle par ID
  const getRoleById = (roleId) => {
    return roles.find(role => role.id === parseInt(roleId));
  };

  // Obtenir les rôles assignés à une tâche
  const getRolesByTask = (taskId) => {
    return roles.filter(role => role.assignedTasks.includes(taskId));
  };

  // Obtenir les utilisateurs disponibles (non membres d'un rôle spécifique)
  const getAvailableUsers = (roleId = null) => {
    if (!roleId) return availableUsers;
    
    const role = getRoleById(roleId);
    if (!role) return availableUsers;
    
    const memberIds = role.members.map(m => m.id);
    return availableUsers.filter(user => !memberIds.includes(user.id));
  };

  // Obtenir les tâches disponibles (simulées pour le moment)
  const getAvailableTasks = () => {
    return mockTasks;
  };

  // Obtenir une tâche par ID
  const getTaskById = (taskId) => {
    return mockTasks.find(task => task.id === taskId);
  };

  // Ouvrir la modal de création/édition
  const openModal = (role = null) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  // Fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
  };

  const value = {
    roles,
    isModalOpen,
    editingRole,
    colorOptions,
    availableUsers,
    createRole,
    updateRole,
    deleteRole,
    toggleRolePin,
    addMemberToRole,
    removeMemberFromRole,
    assignTaskToRole,
    unassignTaskFromRole,
    getRoleById,
    getRolesByTask,
    getAvailableUsers,
    getAvailableTasks,
    getTaskById,
    openModal,
    closeModal
  };

  return (
    <RolesContext.Provider value={value}>
      {children}
    </RolesContext.Provider>
  );
}

export function useRoles() {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error('useRoles must be used within a RolesProvider');
  }
  return context;
}

export default RolesProvider;