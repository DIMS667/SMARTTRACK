import { NEWSLETTER_FREQUENCIES } from '../constants';

export const formatSubscriberCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const formatFrequency = (frequency) => {
  const frequencyObj = NEWSLETTER_FREQUENCIES.find(f => f.value === frequency);
  return frequencyObj ? frequencyObj.label : frequency;
};

export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('fr-FR', defaultOptions);
};

export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) {
    return 'Il y a moins d\'une heure';
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInDays < 7) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  } else {
    return formatDate(dateString, { year: 'numeric', month: 'short', day: 'numeric' });
  }
};

export const formatGrowthPercentage = (growth) => {
  if (growth > 0) {
    return `+${growth.toFixed(1)}%`;
  } else if (growth < 0) {
    return `${growth.toFixed(1)}%`;
  }
  return '0%';
};

export const formatEmailAddress = (email) => {
  if (!email) return '';
  
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 3) {
    return email;
  }
  
  const maskedLocal = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);
  return `${maskedLocal}@${domain}`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength).trim() + '...';
};