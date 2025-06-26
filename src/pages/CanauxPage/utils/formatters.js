// src/pages/CanauxPage/utils/formatters.js
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const formatTimeAgo = (timestamp) => {
  // Simple mock implementation - à remplacer par une vraie logique
  return timestamp;
};

export const formatGrowth = (growth) => {
  const isPositive = growth.startsWith('+');
  return {
    value: growth,
    isPositive,
    className: isPositive 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400'
  };
};