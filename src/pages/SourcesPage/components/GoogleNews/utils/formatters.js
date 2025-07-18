// src/pages/SourcesPage/components/GoogleNews/utils/formatters.js

export const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `Il y a ${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }
  return `Il y a ${minutes}m`;
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export const getNewsUrgency = (publishedAt, isBreaking) => {
  const now = new Date();
  const diff = now - publishedAt;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (isBreaking) return 'breaking';
  if (hours < 2) return 'recent';
  if (hours < 24) return 'today';
  return 'normal';
};