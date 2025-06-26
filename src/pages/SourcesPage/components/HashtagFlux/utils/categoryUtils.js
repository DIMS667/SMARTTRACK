// src/pages/SourcesPage/components/HashtagFlux/utils/categoryUtils.js

export const getCategoryColor = (category) => {
  const colorMap = {
    'Tech': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white',
    'Business': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white',
    'Environment': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    'Finance': 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white',
    'News': 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
    'Design': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
    'Marketing': 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white',
    'Music': 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white',
    'Social': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
    'Wellness': 'bg-gradient-to-r from-indigo-400 to-purple-500 text-white'
  };
  return colorMap[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
};