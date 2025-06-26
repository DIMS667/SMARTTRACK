// src/pages/CanauxPage/components/Tendances/PopularHashtags.jsx
import React from 'react';
import { Hash, TrendingUp, MessageCircle, Users } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

const PopularHashtags = ({ hashtags = [], onHashtagClick }) => {
  // Données par défaut si hashtags est vide
  const defaultHashtags = [
    {
      id: 1,
      tag: 'IA',
      category: 'IA',
      mentions: 15600,
      uniqueUsers: 2340,
      growth: 45
    },
    {
      id: 2,
      tag: 'Innovation',
      category: 'Innovation',
      mentions: 12400,
      uniqueUsers: 1890,
      growth: 32
    },
    {
      id: 3,
      tag: 'FinTech',
      category: 'FinTech',
      mentions: 9800,
      uniqueUsers: 1567,
      growth: 28
    },
    {
      id: 4,
      tag: 'Cybersécurité',
      category: 'Cybersécurité',
      mentions: 8900,
      uniqueUsers: 1345,
      growth: 19
    },
    {
      id: 5,
      tag: 'Blockchain',
      category: 'Tech',
      mentions: 7600,
      uniqueUsers: 1123,
      growth: 15
    },
    {
      id: 6,
      tag: 'GreenTech',
      category: 'Innovation',
      mentions: 6400,
      uniqueUsers: 892,
      growth: 67
    },
    {
      id: 7,
      tag: 'Web3',
      category: 'Tech',
      mentions: 5800,
      uniqueUsers: 756,
      growth: 23
    },
    {
      id: 8,
      tag: 'Quantum',
      category: 'Tech',
      mentions: 4900,
      uniqueUsers: 634,
      growth: 89
    },
    {
      id: 9,
      tag: 'ESG',
      category: 'FinTech',
      mentions: 4200,
      uniqueUsers: 567,
      growth: 12
    },
    {
      id: 10,
      tag: 'IoT',
      category: 'Tech',
      mentions: 3800,
      uniqueUsers: 445,
      growth: 8
    }
  ];

  const safeHashtags = hashtags.length > 0 ? hashtags : defaultHashtags;

  const getHashtagSize = (mentions) => {
    if (mentions > 1000) return 'text-2xl';
    if (mentions > 500) return 'text-xl';
    if (mentions > 200) return 'text-lg';
    return 'text-base';
  };

  const getHashtagColor = (category) => {
    const colors = {
      'IA': 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20',
      'Innovation': 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
      'FinTech': 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
      'Tech': 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/20',
      'Cybersécurité': 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    };
    return colors[category] || 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Hash className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Hashtags populaires
        </h3>
      </div>

      {/* Vue en nuage de mots */}
      <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {safeHashtags.slice(0, 15).map((hashtag) => (
            <button
              key={hashtag.id}
              onClick={() => onHashtagClick && onHashtagClick(hashtag.tag)}
              className={`inline-flex items-center px-3 py-2 rounded-full font-medium transition-all hover:scale-105 ${getHashtagSize(hashtag.mentions)} ${getHashtagColor(hashtag.category)}`}
            >
              <Hash className="h-4 w-4 mr-1" />
              {hashtag.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Liste détaillée */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">
          Top 10 des hashtags
        </h4>
        {safeHashtags.slice(0, 10).map((hashtag, index) => (
          <div key={hashtag.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white font-bold text-xs">
                {index + 1}
              </div>
              <div className="flex items-center space-x-2">
                <Hash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {hashtag.tag}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getHashtagColor(hashtag.category)}`}>
                  {hashtag.category}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <MessageCircle className="h-3 w-3" />
                <span>{formatNumber ? formatNumber(hashtag.mentions) : hashtag.mentions}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Users className="h-3 w-3" />
                <span>{formatNumber ? formatNumber(hashtag.uniqueUsers) : hashtag.uniqueUsers}</span>
              </div>
              <div className={`flex items-center space-x-1 ${
                hashtag.growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp className="h-3 w-3" />
                <span>{hashtag.growth > 0 ? '+' : ''}{hashtag.growth}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularHashtags;