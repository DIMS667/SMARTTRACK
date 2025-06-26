// src/pages/SourcesPage/components/WebScraper/utils/urlUtils.js

/**
 * Valide si une chaîne est une URL valide
 */
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Normalise une URL en ajoutant le protocole si nécessaire
 */
export const normalizeUrl = (url) => {
  if (!url) return '';
  
  // Nettoyer l'URL
  url = url.trim();
  
  // Ajouter le protocole si manquant
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch {
    return url;
  }
};

/**
 * Extrait le nom de domaine d'une URL
 */
export const extractDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/**
 * Extrait le nom de domaine principal (sans sous-domaines)
 */
export const extractMainDomain = (url) => {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.');
    
    // Pour les domaines comme 'example.co.uk', garder les 3 dernières parties
    if (parts.length > 2 && parts[parts.length - 2].length <= 3) {
      return parts.slice(-3).join('.');
    }
    
    // Pour les domaines normaux, garder les 2 dernières parties
    return parts.slice(-2).join('.');
  } catch {
    return url;
  }
};

/**
 * Génère une favicon URL pour un domaine
 */
export const getFaviconUrl = (url) => {
  try {
    const domain = extractDomain(url);
    return `https://${domain}/favicon.ico`;
  } catch {
    return null;
  }
};

/**
 * Raccourcit une URL pour l'affichage
 */
export const shortenUrl = (url, maxLength = 50) => {
  try {
    const urlObj = new URL(url);
    const display = urlObj.hostname + urlObj.pathname;
    
    if (display.length <= maxLength) {
      return display;
    }
    
    return display.substring(0, maxLength - 3) + '...';
  } catch {
    return url.length > maxLength ? url.substring(0, maxLength - 3) + '...' : url;
  }
};

/**
 * Vérifie si une URL est sécurisée (HTTPS)
 */
export const isSecureUrl = (url) => {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Génère des URLs de suggestion basées sur un domaine
 */
export const generateSuggestionUrls = (domain) => {
  const cleanDomain = extractMainDomain(`https://${domain}`);
  
  return [
    `https://${cleanDomain}`,
    `https://${cleanDomain}/news`,
    `https://${cleanDomain}/blog`,
    `https://${cleanDomain}/articles`,
    `https://www.${cleanDomain}`,
    `https://blog.${cleanDomain}`
  ];
};

/**
 * Détermine si une URL pointe vers un flux RSS
 */
export const isRssFeed = (url) => {
  const rssPatterns = [
    /\/rss\/?$/,
    /\/feed\/?$/,
    /\/atom\/?$/,
    /\.rss$/,
    /\.xml$/,
    /\/rss\.xml$/,
    /\/feed\.xml$/,
    /\/atom\.xml$/
  ];
  
  return rssPatterns.some(pattern => pattern.test(url.toLowerCase()));
};

/**
 * Construit une URL de recherche pour un site
 */
export const buildSearchUrl = (baseUrl, query) => {
  try {
    const url = new URL(baseUrl);
    
    // Patterns de recherche communs
    const searchPatterns = {
      'google.com': (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      'bing.com': (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
      'duckduckgo.com': (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
      'youtube.com': (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
      'twitter.com': (q) => `https://twitter.com/search?q=${encodeURIComponent(q)}`,
      'reddit.com': (q) => `https://www.reddit.com/search/?q=${encodeURIComponent(q)}`
    };
    
    const domain = extractMainDomain(baseUrl);
    const searchFn = searchPatterns[domain];
    
    if (searchFn) {
      return searchFn(query);
    }
    
    // Pattern générique
    return `${baseUrl}/search?q=${encodeURIComponent(query)}`;
  } catch {
    return baseUrl;
  }
};