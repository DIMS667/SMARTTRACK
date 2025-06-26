// src/pages/CanauxPage/components/Tendances/TopSharedArticles.jsx
import React from 'react';
import { Star, ExternalLink, User, Calendar, TrendingUp } from 'lucide-react';
import Button from '@/components/common/Button';
import { UserAvatar } from '../shared';
import { formatNumber } from '../../utils/formatters';

const TopSharedArticles = ({ articles = [], period, setPeriod }) => {
  const periods = [
    { id: 'week', label: 'Cette semaine' },
    { id: 'month', label: 'Ce mois' },
    { id: 'quarter', label: 'Ce trimestre' }
  ];

  // Données par défaut si articles est vide
  const defaultArticles = [
    {
      id: 1,
      title: 'The Future of AI Agents in Enterprise: A Comprehensive Guide',
      excerpt: 'An in-depth analysis of how AI agents are transforming business processes and decision-making in large corporations...',
      source: 'MIT Technology Review',
      publishedAt: '2 jours',
      shares: 2340,
      views: 45600,
      sharedBy: {
        name: 'Dr. Alice Chen',
        avatar: null
      }
    },
    {
      id: 2,
      title: 'Quantum Computing: The Race to Commercial Viability',
      excerpt: 'Major tech companies are investing billions in quantum computing. Here\'s what breakthrough we can expect in 2025...',
      source: 'Nature',
      publishedAt: '4 jours',
      shares: 1890,
      views: 38900,
      sharedBy: {
        name: 'Marc Dubois',
        avatar: null
      }
    }
  ];

  const safeArticles = articles.length > 0 ? articles : defaultArticles;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Articles les plus partagés
          </h3>
        </div>
        <div className="flex space-x-2">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod && setPeriod(p.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                period === p.id
                  ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {safeArticles.map((article, index) => (
          <div key={article.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full text-white font-bold text-sm">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {article.title}
                  </h4>
                  <Button size="sm" variant="ghost" className="ml-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {article.sharedBy && (
                        <>
                          <UserAvatar user={article.sharedBy} size="sm" showVerification={false} />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {article.sharedBy.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {article.source} • {article.publishedAt}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <TrendingUp className="h-4 w-4" />
                      <span>{formatNumber ? formatNumber(article.shares) : article.shares} partages</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {formatNumber ? formatNumber(article.views) : article.views} vues
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSharedArticles;