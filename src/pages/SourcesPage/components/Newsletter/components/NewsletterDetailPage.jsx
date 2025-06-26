import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import NewsletterReader from './NewsletterReader';
import { 
  ArrowLeft, 
  Mail, 
  Users, 
  Calendar, 
  Star, 
  Settings, 
  ExternalLink,
  Eye,
  Heart,
  MoreHorizontal,
  Clock,
  Filter
} from 'lucide-react';

const NewsletterDetailPage = ({ newsletter, onBack, onMarkAsRead, onAddToFavorites }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'favorites'
  const [selectedEmail, setSelectedEmail] = useState(null); // Pour la vue lecteur

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        // Simuler le chargement des articles de cette newsletter
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Utiliser les articles de la newsletter si disponibles, sinon utiliser des mock
        let newsletterArticles = newsletter.articles || [];
        
        // Si pas d'articles, générer des mock articles pour les newsletters existantes
        if (newsletterArticles.length === 0 && newsletter.isSubscribed) {
          newsletterArticles = [
            {
              id: `${newsletter.id}-1`,
              title: `Les dernières actualités de ${newsletter.name}`,
              summary: `Découvrez les dernières nouvelles et tendances partagées par ${newsletter.name}.`,
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
              publishedAt: '2025-06-24T10:30:00Z',
              readAt: null,
              isFavorite: false,
              url: newsletter.websiteUrl || 'https://example.com'
            },
            {
              id: `${newsletter.id}-2`,
              title: `Guide complet ${newsletter.categories?.[0] || 'général'}`,
              summary: `Un guide détaillé sur ${newsletter.categories?.[0] || 'les sujets'} de ${newsletter.name}.`,
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
              publishedAt: '2025-06-23T14:15:00Z',
              readAt: newsletter.unreadCount === 0 ? '2025-06-23T15:00:00Z' : null,
              isFavorite: newsletter.isFavorite || false,
              url: newsletter.websiteUrl || 'https://example.com'
            },
            {
              id: `${newsletter.id}-3`,
              title: `Tendances ${newsletter.categories?.[0] || 'actuelles'} - ${newsletter.name}`,
              summary: `Les meilleures pratiques et tendances dans le domaine ${newsletter.categories?.[0] || 'général'}.`,
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
              publishedAt: '2025-06-22T09:45:00Z',
              readAt: null,
              isFavorite: false,
              url: newsletter.websiteUrl || 'https://example.com'
            }
          ];
        }
        
        setArticles(newsletterArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [newsletter]);

  const filteredArticles = articles.filter(article => {
    switch (filter) {
      case 'unread':
        return !article.readAt;
      case 'favorites':
        return article.isFavorite;
      default:
        return true;
    }
  });

  const handleMarkAsRead = (articleId) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, readAt: new Date().toISOString() }
          : article
      )
    );
  };

  const handleToggleFavorite = (articleId) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, isFavorite: !article.isFavorite }
          : article
      )
    );
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    // Marquer automatiquement comme lu
    if (!email.readAt) {
      handleMarkAsRead(email.id);
    }
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleArchiveEmail = (emailId) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === emailId 
          ? { ...article, isArchived: true }
          : article
      )
    );
  };

  const handleDeleteEmail = (emailId) => {
    setArticles(prev => prev.filter(article => article.id !== emailId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = articles.filter(article => !article.readAt).length;

  // Si un email est sélectionné, afficher le lecteur
  if (selectedEmail) {
    return (
      <NewsletterReader
        newsletter={newsletter}
        selectedEmail={selectedEmail}
        onBack={handleBackToList}
        onMarkAsRead={handleMarkAsRead}
        onArchive={handleArchiveEmail}
        onDelete={handleDeleteEmail}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            
            <div className="flex items-center space-x-3">
              {newsletter.logo ? (
                <img
                  src={newsletter.logo}
                  alt={newsletter.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              )}
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {newsletter.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {newsletter.publisher}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Articles totaux</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{articles.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Non lus</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{unreadCount}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Favoris</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {articles.filter(a => a.isFavorite).length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fréquence</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {newsletter.frequency === 'daily' ? 'Quotidienne' : 
                   newsletter.frequency === 'weekly' ? 'Hebdomadaire' : 
                   newsletter.frequency}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Tous ({articles.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === 'unread'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Non lus ({unreadCount})
                </button>
                <button
                  onClick={() => setFilter('favorites')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === 'favorites'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Favoris ({articles.filter(a => a.isFavorite).length})
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
            </p>
          </div>
        </Card>

        {/* Articles */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className={`p-6 hover:shadow-md transition-all cursor-pointer ${
                  !article.readAt ? 'ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50/30 dark:bg-blue-900/10' : ''
                }`}
                onClick={() => handleEmailClick(article)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {!article.readAt && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(article.publishedAt)}
                      </span>
                      {article.readAt && (
                        <span className="text-xs text-green-600 dark:text-green-400">Lu</span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(article.id);
                      }}
                      className={`p-2 rounded-md transition-colors ${
                        article.readAt
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/20'
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={article.readAt ? 'Déjà lu' : 'Marquer comme lu'}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(article.id);
                      }}
                      className={`p-2 rounded-md transition-colors ${
                        article.isFavorite
                          ? 'text-red-600 bg-red-100 dark:bg-red-900/20'
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={article.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      <Heart className={`h-4 w-4 ${article.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    
                    {article.url && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Ouvrir l'article"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-gray-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {filter === 'unread' ? 'Aucun article non lu' :
                   filter === 'favorites' ? 'Aucun article en favoris' :
                   'Aucun article'}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {filter === 'unread' ? 'Tous vos articles sont à jour !' :
                   filter === 'favorites' ? 'Ajoutez des articles à vos favoris pour les retrouver ici.' :
                   'Les articles de cette newsletter apparaîtront ici dès réception.'}
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetailPage;