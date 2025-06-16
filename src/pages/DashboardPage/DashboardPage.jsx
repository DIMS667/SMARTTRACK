// DashboardPage.jsx - Version adaptée pour SMARTTRACK
import React from 'react';
import Card from '@/components/common/Card';
import Avatar from '@/components/common/Avatar';

function DashboardPage() {
  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard SMARTTRACK</h1>
          <p className="text-gray-600 dark:text-gray-400">Bienvenue ! Voici un aperçu de votre activité.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Projets Actifs', value: '8', change: '+2', positive: true },
            { title: 'Tâches En Cours', value: '24', change: '+12%', positive: true },
            { title: 'Membres Équipe', value: '12', change: '+2', positive: true },
            { title: 'Taux Completion', value: '87%', change: '+5%', positive: true }
          ].map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projets Récents */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Projets Récents</h3>
            <div className="space-y-4">
              {[
                { name: 'Application Mobile E-commerce', status: 'En Cours', progress: 75 },
                { name: 'Site Web Corporatif', status: 'Review', progress: 90 },
                { name: 'API REST Backend', status: 'Planification', progress: 25 },
                { name: 'Dashboard Analytics', status: 'En Cours', progress: 60 }
              ].map((project) => (
                <div key={project.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{project.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.status}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activité de l'Équipe */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activité de l'Équipe</h3>
            <div className="space-y-4">
              {[
                { name: 'Marie Dubois', action: 'a terminé la tâche "Interface utilisateur"', time: '2h', avatar: 'MD' },
                { name: 'Pierre Martin', action: 'a mis à jour le planning du projet', time: '4h', avatar: 'PM' },
                { name: 'Sophie Bernard', action: 'a ajouté un nouveau commentaire', time: '6h', avatar: 'SB' },
                { name: 'Lucas Moreau', action: 'a créé une nouvelle tâche', time: '8h', avatar: 'LM' }
              ].map((activity) => (
                <div key={activity.name} className="flex items-start space-x-3">
                  <Avatar alt={activity.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.name}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Il y a {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Section supplémentaire pour SMARTTRACK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Tâches Prioritaires */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tâches Prioritaires</h3>
            <div className="space-y-3">
              {[
                { task: 'Révision code backend API', priority: 'Haute', dueDate: 'Aujourd\'hui' },
                { task: 'Tests unitaires frontend', priority: 'Moyenne', dueDate: 'Demain' },
                { task: 'Documentation utilisateur', priority: 'Basse', dueDate: 'Cette semaine' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.task}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.dueDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.priority === 'Haute' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    item.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Progression Mensuelle */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progression Mensuelle</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Projets Complétés</span>
                  <span className="text-gray-900 dark:text-white">3/5</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Heures Travaillées</span>
                  <span className="text-gray-900 dark:text-white">142/160h</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Objectifs Atteints</span>
                  <span className="text-gray-900 dark:text-white">7/8</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions Rapides */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              {[
                { name: 'Nouveau Projet', description: 'Créer un nouveau projet' },
                { name: 'Ajouter Tâche', description: 'Ajouter une nouvelle tâche' },
                { name: 'Inviter Membre', description: 'Inviter un membre d\'équipe' },
                { name: 'Générer Rapport', description: 'Créer un rapport de progression' }
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => console.log(`Action: ${action.name} - En cours de développement`)}
                  className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;