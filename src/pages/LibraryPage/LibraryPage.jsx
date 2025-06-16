// pages/LibraryPage/LibraryPage.jsx
import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card';
import NouveautesPage from './components/NouveautesPage/NouveautesPage';
import FavorisPage from './components/FavorisPage/FavorisPage';
import CommentairePage from './components/Commentaire/CommentairePage';
import { 
  BookOpen, 
  Archive, 
  MessageSquare, 
  Globe, 
  Upload, 
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

function LibraryPage({ activeFilter = 'all' }) {
  const [currentFilter, setCurrentFilter] = useState(activeFilter);

  const libraryItems = [
    {
      id: 1,
      title: 'Guide complet React.js 2024',
      description: 'Un guide détaillé pour maîtriser React.js avec les dernières fonctionnalités',
      type: 'archive',
      category: 'Documentation',
      date: 'Il y a 2 heures',
      url: 'https://react.dev/guide',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Stratégie marketing digital',
      description: 'Document PDF sur les meilleures pratiques marketing digital en 2024',
      type: 'archive',
      category: 'Business',
      date: 'Il y a 1 jour',
      url: 'marketing-strategy.pdf',
      tags: ['Marketing', 'Strategy', 'Digital']
    },
    {
      id: 3,
      title: 'Note importante sur le projet SMARTTRACK',
      description: 'Annotations sur les fonctionnalités prioritaires à développer',
      type: 'annotations',
      category: 'Projet',
      date: 'Il y a 3 heures',
      url: '#',
      tags: ['SMARTTRACK', 'Développement', 'Notes']
    },
    {
      id: 4,
      title: 'Site web inspiration design',
      description: 'Collection de designs modernes pour inspiration',
      type: 'web-pages',
      category: 'Design',
      date: 'Il y a 5 heures',
      url: 'https://dribbble.com/shots',
      tags: ['Design', 'UI/UX', 'Inspiration']
    },
    {
      id: 5,
      title: 'Rapport mensuel - Décembre 2024',
      description: 'Chargement des données et analyse des performances',
      type: 'uploads',
      category: 'Rapports',
      date: 'Il y a 1 semaine',
      url: 'rapport-dec-2024.xlsx',
      tags: ['Rapport', 'Performance', 'Données']
    },
    {
      id: 6,
      title: 'Analyse concurrentielle Q4',
      description: 'Rapport de renseignement sur les concurrents du marché',
      type: 'reports',
      category: 'Intelligence',
      date: 'Il y a 2 jours',
      url: 'competitive-analysis-q4.pdf',
      tags: ['Intelligence', 'Concurrence', 'Analyse']
    },
    {
      id: 7,
      title: 'Tutoriel JavaScript avancé',
      description: 'Techniques avancées en JavaScript pour les développeurs',
      type: 'archive',
      category: 'Documentation',
      date: 'Il y a 4 heures',
      url: 'https://javascript.info/advanced',
      tags: ['JavaScript', 'Tutorial', 'Avancé']
    },
    {
      id: 8,
      title: 'Maquettes interface utilisateur',
      description: 'Annotations sur les améliorations UX à apporter',
      type: 'annotations',
      category: 'Design',
      date: 'Il y a 6 heures',
      url: '#',
      tags: ['Design', 'UX', 'Maquettes']
    }
  ];

  const etiquettes = [
    { name: 'React', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { name: 'Design', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    { name: 'Marketing', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { name: 'SMARTTRACK', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
  ];

  // Fonction pour filtrer les éléments selon le filtre actif
  const getFilteredItems = () => {
    if (currentFilter === 'all') {
      return libraryItems;
    }
    
    // Si c'est nouveautés, favoris ou commentaires, on affiche le composant séparé
    if (currentFilter === 'nouveautes' || currentFilter === 'favorites' || currentFilter === 'commentaires') {
      return null;
    }
    
    // Mapping des filtres du QuickActions vers les types d'éléments
    const filterMapping = {
      'archive': 'archive',
      'annotations': 'annotations',
      'web-pages': 'web-pages',
      'uploads': 'uploads',
      'reports': 'reports'
    };

    const mappedFilter = filterMapping[currentFilter];
    if (mappedFilter) {
      return libraryItems.filter(item => item.type === mappedFilter);
    }

    // Filtrage par tag
    return libraryItems.filter(item => 
      item.tags.some(tag => tag.toLowerCase() === currentFilter.toLowerCase())
    );
  };

  const filteredItems = getFilteredItems();

  // Fonction pour obtenir le titre du filtre actif
  const getFilterTitle = () => {
    const filterTitles = {
      'all': 'Tous les éléments',
      'nouveautes': 'Nouveautés',
      'favorites': 'Favoris',
      'commentaires': 'Commentaires',
      'archive': 'Archive',
      'annotations': 'Annotations',
      'web-pages': 'Pages web',
      'uploads': 'Chargements',
      'reports': 'Rapports de renseignement',
      'react': 'Étiquette: React',
      'javascript': 'Étiquette: JavaScript',
      'design': 'Étiquette: Design',
      'smarttrack': 'Étiquette: SMARTTRACK'
    };
    
    return filterTitles[currentFilter] || `Filtre: ${currentFilter}`;
  };

  // Fonction appelée depuis le MainLayout via les props
  useEffect(() => {
    setCurrentFilter(activeFilter);
  }, [activeFilter]);

  // Si le filtre est nouveautés, afficher le composant séparé
  if (currentFilter === 'nouveautes') {
    return (
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bibliothèque</h1>
            <p className="text-gray-600 dark:text-gray-400">Section Nouveautés</p>
          </div>
          <NouveautesPage />
        </div>
      </main>
    );
  }

  // Si le filtre est favoris, afficher le composant FavorisPage
  if (currentFilter === 'favorites') {
    return (
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bibliothèque</h1>
            <p className="text-gray-600 dark:text-gray-400">Section Favoris</p>
          </div>
          <FavorisPage />
        </div>
      </main>
    );
  }

  // Si le filtre est commentaires, afficher le composant CommentairePage
  if (currentFilter === 'commentaires') {
    return (
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bibliothèque</h1>
            <p className="text-gray-600 dark:text-gray-400">Section Commentaires</p>
          </div>
          <CommentairePage />
        </div>
      </main>
    );
  }

  const LibraryItem = ({ item }) => {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mr-2">
                {item.title}
              </h3>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                {item.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full ${
                      etiquettes.find(e => e.name === tag)?.color || 
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.date}
              </span>
            </div>
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Archive className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bibliothèque</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {getFilterTitle()} • {filteredItems?.length || 0} élément{(filteredItems?.length || 0) > 1 ? 's' : ''}
          </p>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* Barre de recherche et filtres */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher dans la bibliothèque..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setCurrentFilter('all')}
                  className={`flex items-center px-3 py-2 text-sm border rounded-lg transition-colors ${
                    currentFilter === 'all'
                      ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Tous
                </button>
                <select className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500">
                  <option>Plus récent</option>
                  <option>Plus ancien</option>
                  <option>Nom A-Z</option>
                  <option>Nom Z-A</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Liste des éléments */}
          <div className="space-y-4">
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <LibraryItem key={item.id} item={item} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Aucun élément trouvé
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Aucun élément ne correspond au filtre "{getFilterTitle()}"
                </p>
                <button 
                  onClick={() => setCurrentFilter('all')}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Voir tous les éléments
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default LibraryPage;