// src/pages/SourcesPage/components/WebScraper/utils/scrapingUtils.js

/**
 * Valide et normalise une URL
 */
export const validateAndNormalizeUrl = (url) => {
  try {
    // Ajouter le protocole si manquant
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const urlObject = new URL(url);
    return {
      isValid: true,
      normalizedUrl: urlObject.href,
      domain: urlObject.hostname,
      protocol: urlObject.protocol
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
};

/**
 * Extrait le domaine principal d'une URL
 */
export const extractMainDomain = (url) => {
  try {
    const domain = new URL(url).hostname;
    // Supprimer les sous-domaines (garde seulement domain.tld)
    const parts = domain.split('.');
    if (parts.length > 2) {
      return parts.slice(-2).join('.');
    }
    return domain;
  } catch {
    return url;
  }
};

/**
 * Détermine le type de site web basé sur l'URL et le contenu
 */
export const detectWebsiteType = (url, content = '') => {
  const domain = extractMainDomain(url).toLowerCase();
  const urlLower = url.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Patterns pour différents types de sites
  const patterns = {
    news: [
      'news', 'actualit', 'journal', 'press', 'media', 'info',
      'reuters', 'bbc', 'cnn', 'lemonde', 'figaro', 'liberation'
    ],
    tech: [
      'tech', 'digital', 'code', 'dev', 'programming', 'software',
      'techcrunch', 'wired', 'ars-technica', 'github', 'stackoverflow'
    ],
    business: [
      'business', 'finance', 'economic', 'money', 'invest', 'market',
      'bloomberg', 'forbes', 'economist', 'lesechos', 'challenges'
    ],
    lifestyle: [
      'lifestyle', 'fashion', 'health', 'beauty', 'travel', 'food',
      'vogue', 'elle', 'marieclaire', 'cosmopolitan'
    ],
    sports: [
      'sport', 'football', 'basket', 'tennis', 'olympic',
      'espn', 'lequipe', 'eurosport', 'skysports'
    ],
    gaming: [
      'gaming', 'game', 'esport', 'playstation', 'xbox',
      'ign', 'gamespot', 'polygon', 'kotaku'
    ],
    education: [
      'education', 'learn', 'course', 'university', 'school',
      'coursera', 'udemy', 'edx', 'khan-academy'
    ]
  };
  
  // Scorer chaque type
  const scores = {};
  Object.keys(patterns).forEach(type => {
    scores[type] = 0;
    patterns[type].forEach(pattern => {
      if (domain.includes(pattern)) scores[type] += 3;
      if (urlLower.includes(pattern)) scores[type] += 2;
      if (contentLower.includes(pattern)) scores[type] += 1;
    });
  });
  
  // Retourner le type avec le meilleur score
  const bestType = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  return scores[bestType] > 0 ? bestType : 'news'; // Défaut: news
};

/**
 * Génère des sélecteurs CSS intelligents pour le scrapping
 */
export const generateSmartSelectors = (url) => {
  const domain = extractMainDomain(url).toLowerCase();
  
  // Sélecteurs spécifiques par domaine populaire
  const domainSelectors = {
    'lemonde.fr': {
      article: 'article.teaser, .article__content',
      title: 'h1, .article__title, .teaser__title',
      content: '.article__content, .article__paragraph',
      author: '.meta__author, .signature',
      date: '.meta__date, time'
    },
    'techcrunch.com': {
      article: 'article, .post-block',
      title: 'h1.post-title, .post-block__title',
      content: '.article-content, .post-content',
      author: '.byline__author',
      date: '.byline__date, time'
    },
    'bbc.com': {
      article: 'article, [data-component="story-body"]',
      title: 'h1, .story-headline',
      content: '.story-body, .rich-text',
      author: '.byline, .author',
      date: 'time, .date'
    }
  };
  
  // Sélecteurs génériques si domaine non reconnu
  const genericSelectors = {
    article: 'article, .article, .post, .content, .story, .news-item',
    title: 'h1, .title, .headline, .post-title, .article-title',
    content: '.content, .article-content, .post-content, .story-content, .body',
    author: '.author, .byline, .writer, .journalist',
    date: 'time, .date, .published, .publish-date, .timestamp',
    image: '.featured-image img, .article-image img, .post-image img'
  };
  
  return domainSelectors[domain] || genericSelectors;
};

/**
 * Calcule un score de confiance pour les données extraites
 */
export const calculateConfidenceScore = (extractedData, selectors) => {
  let score = 0;
  let maxScore = 0;
  
  // Critères de scoring
  const criteria = [
    { field: 'title', weight: 25, minLength: 10 },
    { field: 'content', weight: 30, minLength: 100 },
    { field: 'author', weight: 15, minLength: 2 },
    { field: 'publishedAt', weight: 20, minLength: 8 },
    { field: 'image', weight: 10, minLength: 10 }
  ];
  
  criteria.forEach(criterion => {
    maxScore += criterion.weight;
    const value = extractedData[criterion.field];
    
    if (value && typeof value === 'string' && value.length >= criterion.minLength) {
      score += criterion.weight;
    } else if (value && criterion.field === 'publishedAt' && !isNaN(Date.parse(value))) {
      score += criterion.weight;
    }
  });
  
  return Math.min(score / maxScore, 1);
};

/**
 * Nettoie et normalise le texte extrait
 */
export const cleanExtractedText = (text) => {
  if (!text) return '';
  
  return text
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .replace(/\n+/g, '\n') // Normaliser les retours à la ligne
    .trim()
    .substring(0, 10000); // Limiter la taille
};

/**
 * Détecte la langue du contenu
 */
export const detectLanguage = (text) => {
  if (!text) return 'unknown';
  
  const frenchWords = ['le', 'la', 'les', 'de', 'et', 'à', 'un', 'une', 'pour', 'que', 'qui', 'dans', 'sur', 'avec'];
  const englishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are'];
  
  const words = text.toLowerCase().split(/\s+/).slice(0, 100);
  
  let frenchScore = 0;
  let englishScore = 0;
  
  words.forEach(word => {
    if (frenchWords.includes(word)) frenchScore++;
    if (englishWords.includes(word)) englishScore++;
  });
  
  if (frenchScore > englishScore) return 'fr';
  if (englishScore > frenchScore) return 'en';
  return 'unknown';
};

/**
 * Valide la structure d'un article scrappé
 */
export const validateScrapedArticle = (article) => {
  const errors = [];
  const warnings = [];
  
  // Validations obligatoires
  if (!article.title || article.title.length < 5) {
    errors.push('Titre manquant ou trop court');
  }
  
  if (!article.url || !validateAndNormalizeUrl(article.url).isValid) {
    errors.push('URL invalide');
  }
  
  // Validations recommandées
  if (!article.description || article.description.length < 20) {
    warnings.push('Description manquante ou trop courte');
  }
  
  if (!article.author) {
    warnings.push('Auteur non identifié');
  }
  
  if (!article.publishedAt || isNaN(Date.parse(article.publishedAt))) {
    warnings.push('Date de publication invalide');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, 100 - (errors.length * 25) - (warnings.length * 5))
  };
};