// src/pages/SettingsPage/axes/components/AxisModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, Target } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import IconSelector from './IconSelector';
import { COLOR_OPTIONS, getColorClass } from '../constants/pestelData';

/**
 * Modal pour créer ou éditer un axe
 * 
 * @param {Object} props
 * @param {Object} props.axis - Axe à éditer (null pour création)
 * @param {boolean} props.isOpen - Si le modal est ouvert
 * @param {Function} props.onClose - Fonction appelée à la fermeture
 * @param {Function} props.onSave - Fonction appelée pour sauvegarder
 * @param {Array} props.allThemes - Liste de tous les thèmes disponibles
 */
const AxisModal = ({ axis, isOpen, onClose, onSave, allThemes }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'blue',
    icon: null,
    themes: []
  });

  // Mettre à jour le formulaire lorsque l'axe change
  useEffect(() => {
    if (axis) {
      setFormData({
        name: axis.name || '',
        description: axis.description || '',
        color: axis.color || 'blue',
        icon: axis.icon || null,
        themes: axis.themes || []
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: 'blue',
        icon: null,
        themes: []
      });
    }
  }, [axis]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      // S'assurer que l'icône est un nom valide
      const validatedData = {
        ...formData,
        icon: formData.icon && LucideIcons[formData.icon] ? formData.icon : 'Target'
      };
      
      onSave(validatedData);
      onClose();
    }
  };

  // Pour débogage - afficher l'icône actuelle
  const IconPreview = formData.icon && LucideIcons[formData.icon] 
    ? LucideIcons[formData.icon] 
    : Target;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      {/* Overlay de fond */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <IconPreview className="w-5 h-5 text-blue-600" />
                {axis ? 'Modifier l\'axe' : 'Créer un nouvel axe'}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Nom de l'axe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom de l'axe *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le nom de l'axe"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Description de l'axe (optionnel)"
                />
              </div>

              {/* Sélecteur de couleur (prend toute la largeur) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Couleur
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`relative p-3 rounded-lg border-2 transition-all ${
                        formData.color === color.value
                          ? 'border-gray-900 dark:border-white'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${color.bg} mx-auto`} />
                      {formData.color === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-900 dark:border-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélecteur d'icône professionnelle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icône
                </label>
                <IconSelector
                  selectedIcon={formData.icon}
                  onChange={(iconName) => setFormData({ ...formData, icon: iconName })}
                  colorClass={getColorClass(formData.color)}
                />
              </div>

              {/* Sélecteur de thèmes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thèmes associés
                </label>
                <ThemeSelector
                  availableThemes={allThemes}
                  selectedThemes={formData.themes}
                  onChange={(themes) => setFormData({ ...formData, themes })}
                />
                
                {/* Information sur les thèmes créés */}
                {formData.themes.length > 0 && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                    <p>{formData.themes.length} thème{formData.themes.length > 1 ? 's' : ''} sélectionné{formData.themes.length > 1 ? 's' : ''}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      Ces thèmes seront disponibles pour tous les autres axes.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {axis ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AxisModal;
