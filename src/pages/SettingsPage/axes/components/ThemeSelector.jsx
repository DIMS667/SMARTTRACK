// src/pages/SettingsPage/axes/components/ThemeSelector.jsx
import React, { useState } from 'react';
import { Filter, Tag, X } from 'lucide-react';

/**
 * Composant pour sélectionner et gérer les thèmes associés à un axe
 * 
 * @param {Object} props
 * @param {Array} props.availableThemes - Liste de tous les thèmes disponibles
 * @param {Array} props.selectedThemes - Liste des thèmes actuellement sélectionnés
 * @param {Function} props.onChange - Fonction appelée lorsque la sélection change
 */
const ThemeSelector = ({ availableThemes, selectedThemes, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtrer les thèmes disponibles selon le terme de recherche et exclure ceux déjà sélectionnés
  const filteredThemes = availableThemes.filter(theme => 
    theme.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedThemes.includes(theme)
  );
  
  // Ajouter un thème existant à la sélection
  const handleSelectTheme = (theme) => {
    onChange([...selectedThemes, theme]);
    setSearchTerm('');
  };

  // Créer et ajouter un nouveau thème
  const handleCreateTheme = () => {
    if (searchTerm.trim() && !availableThemes.includes(searchTerm.trim())) {
      onChange([...selectedThemes, searchTerm.trim()]);
      setSearchTerm('');
    }
  };

  // Supprimer un thème de la sélection
  const handleRemoveTheme = (theme) => {
    onChange(selectedThemes.filter(t => t !== theme));
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        {/* Champ de recherche */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Rechercher ou ajouter un thème..."
            className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Liste déroulante des thèmes */}
        {showDropdown && (searchTerm || filteredThemes.length > 0) && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
            {filteredThemes.length > 0 ? (
              <ul className="py-1">
                {filteredThemes.map((theme, index) => (
                  <li 
                    key={index}
                    onClick={() => handleSelectTheme(theme)}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            ) : searchTerm.trim() ? (
              <div 
                onClick={handleCreateTheme}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-blue-600 dark:text-blue-400 font-medium"
              >
                + Créer "{searchTerm}"
              </div>
            ) : (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                Aucun thème trouvé
              </div>
            )}
          </div>
        )}
      </div>

      {/* Badges des thèmes sélectionnés */}
      {selectedThemes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedThemes.map((theme, index) => (
            <div 
              key={index}
              className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm"
            >
              <Tag className="w-3 h-3" />
              <span className="truncate max-w-[200px]">{theme}</span>
              <button
                type="button"
                onClick={() => handleRemoveTheme(theme)}
                className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;