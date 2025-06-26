import React from 'react';
import Card from '@/components/common/Card'; // ✅ Import par défaut
import Button from '@/components/common/Button'; // ✅ Import par défaut
import { Mail, Search, Star, Folder, Plus } from 'lucide-react';

const EmptyState = ({ activeTab, onTabChange }) => {
  const getEmptyStateContent = () => {
    switch (activeTab) {
      case 'subscribed':
        return {
          icon: Mail,
          title: 'Aucune newsletter abonnée',
          description: 'Vous n\'êtes abonné à aucune newsletter pour le moment. Découvrez notre sélection de newsletters populaires pour commencer.',
          action: {
            label: 'Découvrir des newsletters',
            onClick: () => onTabChange('discover'),
            variant: 'primary'
          },
          illustration: (
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          )
        };
      
      case 'discover':
        return {
          icon: Search,
          title: 'Aucune newsletter trouvée',
          description: 'Aucune newsletter ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou utilisez des mots-clés différents.',
          action: {
            label: 'Réinitialiser les filtres',
            onClick: () => window.location.reload(),
            variant: 'outline'
          },
          illustration: (
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-gray-600 dark:text-gray-400" />
            </div>
          )
        };
      
      case 'bundles':
        return {
          icon: Folder,
          title: 'Aucune collection créée',
          description: 'Les collections vous permettent d\'organiser vos newsletters par thème. Créez votre première collection pour mieux organiser vos abonnements.',
          action: {
            label: 'Créer une collection',
            onClick: () => console.log('Create bundle'),
            variant: 'primary'
          },
          illustration: (
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-full flex items-center justify-center mb-6">
              <Folder className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
          )
        };
      
      default:
        return {
          icon: Star,
          title: 'Newsletters',
          description: 'Gérez vos abonnements et découvrez de nouveaux contenus.',
          action: null,
          illustration: (
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-full flex items-center justify-center mb-6">
              <Star className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
            </div>
          )
        };
    }
  };

  const { title, description, action, illustration } = getEmptyStateContent();

  return (
    <Card className="p-12 text-center">
      <div className="max-w-md mx-auto">
        {illustration}
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {description}
        </p>
        
        {action && (
          <div className="space-y-4">
            <Button 
              onClick={action.onClick} 
              variant={action.variant}
              size="lg"
            >
              {action.label}
            </Button>
            
            {activeTab === 'subscribed' && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Suggestions populaires :
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    Technologie
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                    Business
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                    Design
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default EmptyState;