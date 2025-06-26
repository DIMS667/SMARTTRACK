export const NEWSLETTER_CATEGORIES = [
  { value: 'tech', label: 'Technologie', color: 'blue' },
  { value: 'business', label: 'Business', color: 'green' },
  { value: 'design', label: 'Design', color: 'purple' },
  { value: 'marketing', label: 'Marketing', color: 'pink' },
  { value: 'startup', label: 'Startup', color: 'orange' },
  { value: 'productivity', label: 'Productivité', color: 'indigo' },
  { value: 'finance', label: 'Finance', color: 'yellow' },
  { value: 'health', label: 'Santé', color: 'red' },
  { value: 'news', label: 'Actualités', color: 'gray' },
  { value: 'science', label: 'Science', color: 'cyan' }
];

export const NEWSLETTER_FREQUENCIES = [
  { value: 'daily', label: 'Quotidienne' },
  { value: 'weekly', label: 'Hebdomadaire' },
  { value: 'biweekly', label: 'Bi-hebdomadaire' },
  { value: 'monthly', label: 'Mensuelle' },
  { value: 'occasional', label: 'Occasionnelle' }
];

export const NEWSLETTER_LANGUAGES = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
  { value: 'es', label: 'Espagnol' },
  { value: 'de', label: 'Allemand' },
  { value: 'it', label: 'Italien' }
];

export const NEWSLETTER_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CANCELLED: 'cancelled'
};

export const NEWSLETTER_FORMATS = [
  { value: 'html', label: 'HTML', description: 'Avec images et mise en forme' },
  { value: 'text', label: 'Texte', description: 'Texte simple uniquement' }
];

export const SORT_OPTIONS = [
  { value: '', label: 'Pertinence' },
  { value: 'subscribers', label: 'Plus d\'abonnés' },
  { value: 'rating', label: 'Mieux notées' },
  { value: 'recent', label: 'Plus récentes' },
  { value: 'trending', label: 'Tendance' }
];