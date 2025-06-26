// src/components/layout/Sidebar/RoleSection.jsx
import React, { useState } from 'react';
import { Plus, Settings, UserPlus, UsersRound } from 'lucide-react';

/**
 * Section des rôles dans la sidebar
 * 
 * @param {Object} props
 * @param {boolean} props.collapsed - Si la sidebar est réduite
 * @param {Function} props.onNavigate - Fonction de navigation
 */
function RoleSection({ collapsed, onNavigate }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Exemples de rôles - à remplacer par des données réelles de l'API
  const roles = [
    { id: 1, name: "Administrateurs", count: 5 },
    { id: 2, name: "Éditeurs", count: 12 },
    { id: 3, name: "Lecteurs", count: 8 }
  ];

  const handleRoleClick = (roleId) => {
    if (onNavigate) {
      onNavigate(`role/${roleId}`);
    }
  };

  const handleManageRoles = () => {
    if (onNavigate) {
      onNavigate('role');
    }
  };

  // Si la sidebar est réduite, ne pas afficher cette section
  if (collapsed) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* En-tête de la section */}
      <div className="flex items-center justify-between px-3 mb-2">
        <div 
          className="flex items-center gap-2 text-white/80 font-medium text-sm cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <UsersRound className="w-4 h-4" />
          <span>RÔLES</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleManageRoles}
            className="p-1 text-white/60 hover:text-white transition-colors"
            title="Gérer les rôles"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('role/new')}
            className="p-1 text-white/60 hover:text-white transition-colors"
            title="Ajouter un rôle"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Liste des rôles - visible seulement si la section est étendue */}
      {isExpanded && (
        <div className="space-y-1 mt-2">
          {roles.length > 0 ? (
            roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleClick(role.id)}
                className="flex items-center justify-between px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <UserPlus className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{role.name}</span>
                </div>
                {role.count > 0 && (
                  <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">
                    {role.count}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-white/50 italic">
              Aucun rôle disponible
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RoleSection;