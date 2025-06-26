// src/pages/SettingsPage/axes/hooks/useAxes.jsx
import { useState, useEffect } from 'react';
import PESTEL_DATA from '../constants/pestelData';

/**
 * Hook personnalisé pour gérer les axes et les thèmes
 * 
 * @returns {Object} Méthodes et données pour gérer les axes
 */
const useAxes = () => {
  // État pour les axes
  const [axes, setAxes] = useState([]);
  
  // État pour tous les thèmes disponibles
  const [allThemes, setAllThemes] = useState([]);

  // Initialiser les données au chargement
  useEffect(() => {
    // Convertir les données PESTEL en axes
    const initialAxes = Object.entries(PESTEL_DATA).map(([key, data], index) => ({
      id: index + 1,
      key,
      name: data.name,
      description: data.description,
      color: data.color,
      icon: getDefaultIconForCategory(key),
      themes: data.themes || []
    }));
    
    setAxes(initialAxes);
    
    // Extraire tous les thèmes uniques de toutes les catégories PESTEL
    const themes = Object.values(PESTEL_DATA).flatMap(data => data.themes || []);
    const uniqueThemes = [...new Set(themes)];
    setAllThemes(uniqueThemes);
  }, []);

  // Déterminer l'icône par défaut en fonction de la catégorie PESTEL
  const getDefaultIconForCategory = (category) => {
    const iconMap = {
      politique: 'Landmark',
      economique: 'BarChart',
      socioculturel: 'Layers',
      technologique: 'DatabaseBackup',
      ecologique: 'Leaf',
      legal: 'Scale'
    };
    
    return iconMap[category] || 'Target';
  };

  // Créer un nouvel axe
  const createAxis = (axisData) => {
    const newAxis = {
      id: Date.now(),
      ...axisData
    };
    
    setAxes(prev => [...prev, newAxis]);
    updateThemesList(axisData.themes);
    
    return newAxis;
  };

  // Mettre à jour un axe existant
  const updateAxis = (axisId, axisData) => {
    setAxes(prev => prev.map(axis => 
      axis.id === axisId 
        ? { ...axis, ...axisData }
        : axis
    ));
    
    updateThemesList(axisData.themes);
  };

  // Supprimer un axe
  const deleteAxis = (axisId) => {
    setAxes(prev => prev.filter(axis => axis.id !== axisId));
  };

  // Mettre à jour la liste des thèmes disponibles
  const updateThemesList = (themes) => {
    if (!themes || themes.length === 0) return;
    
    setAllThemes(prev => {
      const newThemes = themes.filter(theme => !prev.includes(theme));
      return [...prev, ...newThemes];
    });
  };

  // Rechercher des axes par terme
  const searchAxes = (searchTerm) => {
    if (!searchTerm) return axes;
    
    const term = searchTerm.toLowerCase();
    
    return axes.filter(axis =>
      axis.name.toLowerCase().includes(term) ||
      axis.description?.toLowerCase().includes(term) ||
      (axis.themes && axis.themes.some(theme => 
        theme.toLowerCase().includes(term)
      ))
    );
  };

  return {
    axes,
    allThemes,
    createAxis,
    updateAxis,
    deleteAxis,
    searchAxes,
    updateThemesList
  };
};

export default useAxes;