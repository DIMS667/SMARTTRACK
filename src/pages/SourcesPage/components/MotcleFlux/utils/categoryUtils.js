// src/pages/SourcesPage/components/MotcleFlux/utils/categoryUtils.js

export const getCategoryColor = (category) => {
  const colorMap = {
    'Sport': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    'Tech': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white',
    'News': 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
    'Business': 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white',
    'Politics': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white',
    'Health': 'bg-gradient-to-r from-green-400 to-blue-500 text-white',
    'Environment': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
  };
  return colorMap[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
};