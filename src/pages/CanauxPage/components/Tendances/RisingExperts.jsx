// src/pages/CanauxPage/components/Tendances/RisingExperts.jsx
import React from 'react';
import { Users, TrendingUp, UserPlus, Award, Eye } from 'lucide-react';
import Button from '@/components/common/Button';
import { UserAvatar } from '../shared';
import { formatNumber } from '../../utils/formatters';

const RisingExperts = ({ experts = [], onFollow }) => {
  // Données par défaut si experts est vide
  const defaultExperts = [
    {
      id: 1,
      name: 'Dr. Emma Rodriguez',
      role: 'AI Research Director at Stanford',
      expertise: ['IA', 'Machine Learning', 'Ethics'],
      newFollowers: 2340,
      growthRate: 89,
      isVerified: true,
      isFollowing: false,
      avatar: null
    },
    {
      id: 2,
      name: 'James Wu',
      role: 'Quantum Computing Lead at IBM',
      expertise: ['Quantum', 'Computing', 'Physics'],
      newFollowers: 1890,
      growthRate: 67,
      isVerified: true,
      isFollowing: false,
      avatar: null
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      role: 'Green Finance Specialist',
      expertise: ['Finance', 'ESG', 'Sustainability'],
      newFollowers: 1456,
      growthRate: 45,
      isVerified: false,
      isFollowing: true,
      avatar: null
    }
  ];

  const safeExperts = experts.length > 0 ? experts : defaultExperts;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Award className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Experts montants
        </h3>
      </div>

      <div className="space-y-4">
        {safeExperts.map((expert, index) => (
          <div key={expert.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full text-white font-bold text-sm">
              {index + 1}
            </div>
            
            <UserAvatar user={expert} size="md" />
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {expert.name}
                </h4>
                {expert.isVerified && (
                  <span className="text-blue-500 text-sm">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {expert.role}
              </p>
              <div className="flex flex-wrap gap-1">
                {expert.expertise && expert.expertise.slice(0, 3).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatNumber ? formatNumber(expert.newFollowers) : expert.newFollowers}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    nouveaux abonnés
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    +{expert.growthRate}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    croissance
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => onFollow && onFollow(expert.id)}
                disabled={expert.isFollowing}
              >
                {expert.isFollowing ? (
                  'Suivi'
                ) : (
                  <>
                    <UserPlus className="h-3 w-3 mr-1" />
                    Suivre
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RisingExperts;