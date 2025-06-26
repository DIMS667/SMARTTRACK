// src/pages/CanauxPage/utils/helpers.js
export const filterByExpertise = (items, expertise, expertiseField = 'expertise') => {
  if (expertise === 'all') return items;
  return items.filter(item => {
    const itemExpertise = item[expertiseField];
    if (Array.isArray(itemExpertise)) {
      return itemExpertise.includes(expertise);
    }
    return itemExpertise === expertise;
  });
};

export const sortByEngagement = (items) => {
  return [...items].sort((a, b) => {
    const aEngagement = a.stats?.likes || a.engagement || 0;
    const bEngagement = b.stats?.likes || b.engagement || 0;
    return bEngagement - aEngagement;
  });
};

export const groupByCategory = (items, categoryField = 'category') => {
  return items.reduce((groups, item) => {
    const category = item[categoryField] || 'Autres';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});
};