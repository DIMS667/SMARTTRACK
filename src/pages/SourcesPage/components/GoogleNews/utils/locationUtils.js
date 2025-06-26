// src/pages/SourcesPage/components/GoogleNews/utils/locationUtils.js

export const getLocationFlag = (locationId) => {
  const flagMap = {
    'fr': '🇫🇷',
    'world': '🌍',
    'eu': '🇪🇺',
    'us': '🇺🇸',
    'uk': '🇬🇧',
    'de': '🇩🇪'
  };
  return flagMap[locationId] || '🌍';
};

export const getLocationName = (locationId) => {
  const nameMap = {
    'fr': 'France',
    'world': 'International',
    'eu': 'Europe',
    'us': 'États-Unis',
    'uk': 'Royaume-Uni',
    'de': 'Allemagne'
  };
  return nameMap[locationId] || 'International';
};