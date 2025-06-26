// src/pages/CanauxPage/components/Tendances/EmergingTopics.jsx
import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Minus, Eye, MessageCircle, Share2 } from 'lucide-react';
import { formatGrowth, formatNumber } from '../../utils/formatters';

const EmergingTopics = ({ topics = [], timeRange, setTimeRange }) => {
  const timeRanges = [
    { id: '24h', label: '24h' },
    { id: '7d', label: '7 jours' },
    { id: '30d', label: '30 jours' }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 20) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend < -20) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = (trend) => {
    if (trend > 20) return 'text-green-600 dark:text-green-400';
    if (trend < -20) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  // Données par défaut si topics est vide
  const defaultTopics = [
    {
      id: 1,
      name: 'AI Agents',
      category: 'IA',
      growth: 340,
      views: 25600,
      mentions: 1240,
      shares: 890
    },
    {
      id: 2,
      name: 'Quantum Computing',
      category: 'Tech',
      growth: 280,
      views: 18900,
      mentions: 756,
      shares: 534
    }
  ];

  const safeTopics = topics.length > 0 ? topics : defaultTopics;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Sujets émergents
          </h3>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange && setTimeRange(range.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                timeRange === range.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {safeTopics.map((topic, index) => (
          <div key={topic.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full text-white font-bold text-sm">
              {index + 1}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {topic.name}
                </h4>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                  {topic.category}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{formatNumber ? formatNumber(topic.views) : topic.views} vues</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{formatNumber ? formatNumber(topic.mentions) : topic.mentions} mentions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="h-3 w-3" />
                  <span>{formatNumber ? formatNumber(topic.shares) : topic.shares} partages</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className={`font-semibold ${getTrendColor(topic.growth)}`}>
                  {topic.growth > 0 ? '+' : ''}{topic.growth}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  croissance
                </div>
              </div>
              {getTrendIcon(topic.growth)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergingTopics;