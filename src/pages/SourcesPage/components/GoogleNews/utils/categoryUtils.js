// src/pages/SourcesPage/components/GoogleNews/utils/categoryUtils.js

export const getCategoryColor = (category) => {
  const colorMap = {
    'general': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white',
    'sports': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    'technology': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white',
    'health': 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
    'business': 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white',
    'entertainment': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
    'science': 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white'
  };
  return colorMap[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
};

export const getCategoryIcon = (category) => {
  const iconMap = {
    'general': '📰',
    'sports': '🏆',
    'technology': '💻',
    'health': '❤️',
    'business': '💰',
    'entertainment': '🎬',
    'science': '⚡'
  };
  return iconMap[category] || '📰';
};