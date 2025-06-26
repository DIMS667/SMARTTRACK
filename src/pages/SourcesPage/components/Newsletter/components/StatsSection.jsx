import React from 'react';
import Card from '@/components/common/Card'; // ✅ Import par défaut
import { Mail, Eye, Clock, TrendingUp } from 'lucide-react';

const StatsSection = ({ subscribedCount, unreadCount, totalCount }) => {
  const stats = [
    {
      icon: Mail,
      label: 'Newsletters abonnées',
      value: subscribedCount || 0,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: Eye,
      label: 'Non lues',
      value: unreadCount || 0,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      icon: Clock,
      label: 'Cette semaine',
      value: '12', // This would come from props in real implementation
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: TrendingUp,
      label: 'Croissance',
      value: '+5.2%',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;