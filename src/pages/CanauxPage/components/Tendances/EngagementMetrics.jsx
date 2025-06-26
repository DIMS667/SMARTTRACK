// src/pages/CanauxPage/components/Tendances/EngagementMetrics.jsx
import React from 'react';
import { BarChart3, PieChart, Activity, Users, MessageCircle, Share2, Heart, Eye } from 'lucide-react';

const EngagementMetrics = ({ metrics = {}, chartData = [] }) => {
  // Valeurs par défaut si metrics n'est pas défini
  const defaultMetrics = {
    engagementRate: '0%',
    activeUsers: '0',
    totalInteractions: '0',
    sharedContent: '0',
    views: '0',
    likes: '0',
    comments: '0',
    shares: '0'
  };

  const safeMetrics = { ...defaultMetrics, ...metrics };

  const kpis = [
    {
      title: 'Taux d\'engagement',
      value: safeMetrics.engagementRate,
      change: '+12%',
      icon: Activity,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Utilisateurs actifs',
      value: safeMetrics.activeUsers,
      change: '+8%',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Interactions',
      value: safeMetrics.totalInteractions,
      change: '+25%',
      icon: MessageCircle,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'Contenu partagé',
      value: safeMetrics.sharedContent,
      change: '+15%',
      icon: Share2,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  const engagementTypes = [
    { type: 'Vues', count: safeMetrics.views, icon: Eye, color: 'text-gray-600' },
    { type: 'J\'aime', count: safeMetrics.likes, icon: Heart, color: 'text-red-600' },
    { type: 'Commentaires', count: safeMetrics.comments, icon: MessageCircle, color: 'text-blue-600' },
    { type: 'Partages', count: safeMetrics.shares, icon: Share2, color: 'text-green-600' }
  ];

  // Données par défaut pour le graphique si chartData est vide
  const defaultChartData = [
    { label: 'J1', value: 120 },
    { label: 'J2', value: 135 },
    { label: 'J3', value: 145 },
    { label: 'J4', value: 128 },
    { label: 'J5', value: 156 }
  ];

  const safeChartData = chartData.length > 0 ? chartData : defaultChartData;

  return (
    <div className="space-y-6">
      {/* KPIs principaux */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Métriques d'engagement
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                    {kpi.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {kpi.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Répartition des types d'engagement */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Répartition des interactions
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {engagementTypes.map((type, index) => {
            const Icon = type.icon;
            const totalValue = parseFloat(safeMetrics.totalInteractions.replace(/[^\d.]/g, '')) || 1;
            const typeValue = parseFloat(type.count.replace(/[^\d.]/g, '')) || 0;
            const percentage = ((typeValue / totalValue) * 100).toFixed(1);
            
            return (
              <div key={index} className="text-center">
                <div className="relative mb-3">
                  <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Icon className={`h-6 w-6 ${type.color} dark:${type.color.replace('600', '400')}`} />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {percentage}%
                  </div>
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {type.count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {type.type}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Graphique de tendance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
          Évolution de l'engagement (30 derniers jours)
        </h3>
        
        {/* Simulation d'un graphique simple */}
        <div className="h-48 bg-gradient-to-t from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg flex items-end justify-between p-4">
          {safeChartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-8 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t"
                style={{ height: `${(data.value / Math.max(...safeChartData.map(d => d.value))) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {data.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics;