// src/pages/CanauxPage/components/Tendances/Tendances.jsx - Composant principal Tendances
import React from 'react';
import EmergingTopics from './EmergingTopics';
import TopSharedArticles from './TopSharedArticles';
import RisingExperts from './RisingExperts';
import PopularHashtags from './PopularHashtags';
import EngagementMetrics from './EngagementMetrics';

const Tendances = ({ 
  topics,
  emergingTopics,
  articles,
  experts,
  hashtags,
  metrics,
  chartData,
  selectedCategory,
  setSelectedCategory,
  timeRange,
  setTimeRange,
  articlesPeriod,
  setArticlesPeriod,
  handleFollowExpert,
  handleHashtagClick
}) => {
  return (
    <div className="space-y-6">
      {/* Métriques d'engagement */}
      <EngagementMetrics 
        metrics={metrics}
        chartData={chartData}
      />
      
      {/* Sujets émergents */}
      <EmergingTopics 
        topics={emergingTopics}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      
      {/* Articles les plus partagés */}
      <TopSharedArticles 
        articles={articles}
        period={articlesPeriod}
        setPeriod={setArticlesPeriod}
      />
      
      {/* Experts montants */}
      <RisingExperts 
        experts={experts}
        onFollow={handleFollowExpert}
      />
      
      {/* Hashtags populaires */}
      <PopularHashtags 
        hashtags={hashtags}
        onHashtagClick={handleHashtagClick}
      />
    </div>
  );
};

export default Tendances;