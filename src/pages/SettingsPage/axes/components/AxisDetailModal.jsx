// src/pages/SettingsPage/axes/components/AxisDetailModal.jsx
import React from 'react';
import { 
  X, Tag, Users, Calendar, Target
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTeams } from '@/context/TeamsContext';
import { getColorClass } from '../constants/pestelData';

/**
 * Modal affichant les détails d'un axe
 * 
 * @param {Object} props
 * @param {Object} props.axis - Axe à afficher
 * @param {boolean} props.isOpen - Si le modal est ouvert
 * @param {Function} props.onClose - Fonction appelée à la fermeture
 */
const AxisDetailModal = ({ axis, isOpen, onClose }) => {
  const { getTeamsByAxis } = useTeams();
  
  if (!axis || !isOpen) return null;
  
  const assignedTeams = getTeamsByAxis(axis.id);
  
  // Obtenir le composant d'icône en fonction du nom stocké
  const getIconComponent = (iconName) => {
    if (!iconName) return Target;
    
    // Si c'est une chaîne, essayer de trouver le composant correspondant
    if (typeof iconName === 'string' && LucideIcons[iconName]) {
      return LucideIcons[iconName];
    }
    
    // Sinon retourner l'icône par défaut
    return Target;
  };

  const IconComponent = getIconComponent(axis.icon);
  
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      {/* Overlay de fond */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${getColorClass(axis.color)} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {axis.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {axis.description || 'Aucune description fournie pour cet axe.'}
                </p>
                
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Informations</h4>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date de création</span>
                    <span className="text-gray-900 dark:text-white">{new Date().toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Équipes associées</span>
                    <span className="text-gray-900 dark:text-white">{assignedTeams.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Thèmes</span>
                    <span className="text-gray-900 dark:text-white">{axis.themes?.length || 0}</span>
                  </div>
                </div>
                
                {assignedTeams.length > 0 && (
                  <>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Équipes</h4>
                    <ul className="space-y-1 mb-6">
                      {assignedTeams.map((team, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{team.name}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Thèmes</h4>
                {axis.themes && axis.themes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {axis.themes.map((theme, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{theme}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Aucun thème associé à cet axe.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AxisDetailModal;
  
