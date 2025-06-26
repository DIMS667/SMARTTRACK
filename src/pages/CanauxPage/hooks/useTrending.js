// src/pages/CanauxPage/hooks/useTrending.js
import { useState } from 'react';
import { trendingTopics } from '../data/mockData';

export const useTrending = () => {
  const [topics, setTopics] = useState(trendingTopics);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  const filteredTopics = topics.filter(topic => {
    if (selectedCategory === 'all') return true;
    return topic.category === selectedCategory;
  });

  const sortedTopics = filteredTopics.sort((a, b) => {
    const aGrowth = parseInt(a.growth.replace('%', '').replace('+', ''));
    const bGrowth = parseInt(b.growth.replace('%', '').replace('+', ''));
    return bGrowth - aGrowth;
  });

  return {
    topics: sortedTopics,
    selectedCategory,
    setSelectedCategory,
    timeRange,
    setTimeRange
  };
};