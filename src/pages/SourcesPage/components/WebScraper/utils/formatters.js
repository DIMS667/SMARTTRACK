// src/pages/SourcesPage/components/WebScraper/utils/formatters.js

/**
 * Formate une date en temps relatif (ex: "il y a 2 heures")
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  if (diffInSeconds < 60) {
    return 'À l\'instant';
  }
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  }
  
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  }
  
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `Il y a ${months} mois`;
  }
  
  const years = Math.floor(diffInSeconds / 31536000);
  return `Il y a ${years} an${years > 1 ? 's' : ''}`;
};

/**
 * Formate une date en format court (ex: "12 juin 2024")
 */
export const formatShortDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

/**
 * Formate une date avec l'heure (ex: "12 juin 2024 à 14:30")
 */
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

/**
 * Formate un nombre avec des suffixes (K, M, B)
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  
  const number = Number(num);
  
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return number.toString();
};

/**
 * Formate une durée en format lisible
 */
export const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }
  
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

/**
 * Formate un pourcentage
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Tronque un texte avec des points de suspension
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalise la première lettre d'une chaîne
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convertit un texte en slug (URL-friendly)
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .trim('-'); // Supprime les tirets en début/fin
};

/**
 * Formate la taille d'un fichier
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Formate un score de confiance
 */
export const formatConfidenceScore = (score) => {
  const percentage = Math.round(score * 100);
  
  if (percentage >= 90) {
    return { label: 'Excellent', color: 'green', percentage };
  }
  
  if (percentage >= 75) {
    return { label: 'Bon', color: 'blue', percentage };
  }
  
  if (percentage >= 50) {
    return { label: 'Moyen', color: 'yellow', percentage };
  }
  
  return { label: 'Faible', color: 'red', percentage };
};

/**
 * Formate une liste en phrase
 */
export const formatList = (items, conjunction = 'et') => {
  if (!items || items.length === 0) return '';
  
  if (items.length === 1) return items[0];
  
  if (items.length === 2) {
    return `${items[0]} ${conjunction} ${items[1]}`;
  }
  
  const allButLast = items.slice(0, -1);
  const last = items[items.length - 1];
  
  return `${allButLast.join(', ')} ${conjunction} ${last}`;
};

/**
 * Nettoie et formate un texte HTML
 */
export const cleanHtmlText = (html) => {
  if (!html) return '';
  
  return html
    .replace(/<[^>]*>/g, '') // Supprime les balises HTML
    .replace(/\s+/g, ' ') // Normalise les espaces
    .replace(/&nbsp;/g, ' ') // Remplace les espaces insécables
    .replace(/&amp;/g, '&') // Décode les entités HTML basiques
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

/**
 * Formate les métadonnées de scrapping
 */
export const formatScrapingMetadata = (metadata) => {
  if (!metadata) return {};
  
  return {
    confidence: formatConfidenceScore(metadata.confidence || 0),
    elements: formatList(metadata.extractedElements || [], 'et'),
    selector: metadata.selector || 'Sélecteur générique',
    lastModified: metadata.lastModified ? formatRelativeTime(metadata.lastModified) : null,
    issues: metadata.issues?.length || 0,
    userActions: metadata.userActions?.length || 0
  };
};