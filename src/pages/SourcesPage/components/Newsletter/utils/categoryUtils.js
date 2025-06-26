import { NEWSLETTER_CATEGORIES } from '../constants';

export const getCategoryColor = (category) => {
  const categoryObj = NEWSLETTER_CATEGORIES.find(cat => cat.value === category);
  const color = categoryObj?.color || 'gray';
  
  const colorMap = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
  };
  
  return colorMap[color] || colorMap.gray;
};

export const getCategoryLabel = (category) => {
  const categoryObj = NEWSLETTER_CATEGORIES.find(cat => cat.value === category);
  return categoryObj?.label || category;
};

export const getCategoryIcon = (category) => {
  const iconMap = {
    tech: '💻',
    business: '💼',
    design: '🎨',
    marketing: '📊',
    startup: '🚀',
    productivity: '⚡',
    finance: '💰',
    health: '🏥',
    news: '📰',
    science: '🔬'
  };
  
  return iconMap[category] || '📰';
};

export const groupNewslettersByCategory = (newsletters) => {
  const grouped = {};
  
  newsletters.forEach(newsletter => {
    if (newsletter.categories && newsletter.categories.length > 0) {
      newsletter.categories.forEach(category => {
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(newsletter);
      });
    } else {
      // Newsletter without category goes to 'other'
      if (!grouped.other) {
        grouped.other = [];
      }
      grouped.other.push(newsletter);
    }
  });
  
  return grouped;
};

export const getPopularCategories = (newsletters, limit = 5) => {
  const categoryCount = {};
  
  newsletters.forEach(newsletter => {
    if (newsletter.categories) {
      newsletter.categories.forEach(category => {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
    }
  });
  
  return Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([category, count]) => ({
      category,
      count,
      label: getCategoryLabel(category),
      icon: getCategoryIcon(category)
    }));
};

export const getRecommendedCategories = (subscribedNewsletters) => {
  // Get categories from subscribed newsletters
  const subscribedCategories = new Set();
  subscribedNewsletters.forEach(newsletter => {
    if (newsletter.categories) {
      newsletter.categories.forEach(cat => subscribedCategories.add(cat));
    }
  });
  
  // Recommend related categories
  const recommendations = new Set();
  
  subscribedCategories.forEach(category => {
    switch (category) {
      case 'tech':
        recommendations.add('startup');
        recommendations.add('productivity');
        break;
      case 'business':
        recommendations.add('finance');
        recommendations.add('marketing');
        break;
      case 'design':
        recommendations.add('tech');
        recommendations.add('productivity');
        break;
      case 'startup':
        recommendations.add('tech');
        recommendations.add('business');
        break;
      case 'finance':
        recommendations.add('business');
        recommendations.add('news');
        break;
      case 'marketing':
        recommendations.add('business');
        recommendations.add('startup');
        break;
      case 'health':
        recommendations.add('science');
        break;
      case 'science':
        recommendations.add('tech');
        recommendations.add('health');
        break;
    }
  });
  
  // Remove already subscribed categories
  subscribedCategories.forEach(cat => recommendations.delete(cat));
  
  return Array.from(recommendations).slice(0, 3).map(category => ({
    category,
    label: getCategoryLabel(category),
    icon: getCategoryIcon(category)
  }));
};