// src/pages/RolesEquipePage/RolesEquipePage.jsx
import React, { useState } from 'react';
import { Users, UserCheck } from 'lucide-react';
import RoleManagementPage from '@/pages/RolePage/RoleManagementPage';
import EquipePage from '@/pages/EquipePage/EquipePage';
import RoleModal from '@/pages/RolePage/modal/RoleModal';
import TeamModal from '@/pages/RolePage/modal/TeamModal';

function RolesEquipePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('roles'); // 'roles' ou 'equipes'

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des rôles et équipes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organisez vos utilisateurs en rôles et gérez vos équipes
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'roles'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Rôles
          </button>
          <button
            onClick={() => setActiveTab('equipes')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'equipes'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Équipes
          </button>
        </div>

        {/* Content */}
        <div className="mt-[-24px]"> {/* Ajustement pour que le contenu remonte */}
          {activeTab === 'roles' && (
            <RoleManagementPage onNavigate={onNavigate} />
          )}
          {activeTab === 'equipes' && (
            <EquipePage onNavigate={onNavigate} />
          )}
        </div>
      </div>

      {/* Modals - Toujours présents pour les deux onglets */}
      <RoleModal />
      <TeamModal />
    </div>
  );
}

export default RolesEquipePage;