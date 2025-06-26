// src/pages/CanauxPage/data/constants.js

export const FILTER_OPTIONS = [
  { id: 'all', label: 'Tout' },
  { id: 'articles', label: 'Articles' },
  { id: 'discussions', label: 'Discussions' },
  { id: 'collections', label: 'Collections' }
];

export const POST_TYPES = {
  ARTICLE_SHARE: 'article_share',
  DISCUSSION: 'discussion',
  CURATION: 'curation'
};

export const EXPERTISE_CATEGORIES = {
  ALL: 'all',
  IA: 'ia',
  FINTECH: 'fintech',
  CYBERSEC: 'cybersec',
  BLOCKCHAIN: 'blockchain',
  IOT: 'iot',
  GREENTECH: 'greentech',
  DIGITAL: 'digital'
};

export const COLLECTION_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  TEAM: 'team'
};

export const ACTIVITY_TYPES = {
  ARTICLE_SHARE: 'article_share',
  DISCUSSION_JOIN: 'discussion_join',
  COLLECTION_CREATE: 'collection_create',
  USER_FOLLOW: 'user_follow',
  LIKE: 'like',
  COMMENT: 'comment'
};

export const TRENDING_CATEGORIES = {
  IA: 'IA',
  TECH: 'Tech',
  FINTECH: 'FinTech',
  CYBERSEC: 'Cybersécurité',
  GREENTECH: 'Green Tech'
};

export const TIME_PERIODS = {
  HOUR: '1h',
  DAY: '1j',
  WEEK: '1s',
  MONTH: '1m'
};