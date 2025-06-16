import React, { useState } from 'react';
import Card from '@/components/common/Card';
import FavoriteCard from './components/FavoriteCard';
import ArticleModal from '../NouveautesPage/ArticleModal';
import { useSharedFavorites } from './hooks/useSharedFavorites';
import { useModal } from '../NouveautesPage/hooks/useModal';
import { 
  Heart, 
  Search, 
  Filter, 
  Trash2,
  Download,
  Share2,
  SortAsc,
  SortDesc,
  Calendar,
  Tag
} from 'lucide-react';

const FavorisPage = () => {
  const { favorites, removeFromFavorites, clearAllFavorites } = useSharedFavorites();
  const { selectedArticle, isOpen, openArticle, closeArticle } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  // Filtrer les favoris
  const filteredFavorites = favorites.filter(article => {
    const searchMatch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryMatch = selectedCategory === "All" || article.category === selectedCategory;
    
    return searchMatch && categoryMatch;
  });

  // Trier les favoris
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.addedToFavoritesAt) - new Date(a.addedToFavoritesAt);
      case "oldest":
        return new Date(a.addedToFavoritesAt) - new Date(b.addedToFavoritesAt);
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });

  // Obtenir les catégories uniques
  const categories = ["All", ...new Set(favorites.map(article => article.category))];

  const handleClearAll = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer tous les ${favorites.length} favoris ?`)) {
      clearAllFavorites();
    }
  };

  const handleExport = () => {
    const data = favorites.map(article => ({
      title: article.title,
      author: article.author,
      url: article.feedName,
      category: article.category,
      addedAt: article.addedToFavoritesAt
    }));
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mes-favoris.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes Favoris</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {favorites.length} article{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''} dans vos favoris
          </p>
        </div>

        {/* Barre de contrôles */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher dans vos favoris..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtres et actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Filtre par catégorie */}
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "All" ? "Toutes les catégories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tri */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                >
                  <option value="newest">Plus récemment ajoutés</option>
                  <option value="oldest">Plus anciennement ajoutés</option>
                  <option value="title">Titre A-Z</option>
                  <option value="author">Auteur A-Z</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-l border-gray-300 dark:border-gray-600 pl-3">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={favorites.length === 0}
                >
                  <Download className="w-4 h-4" />
                  Exporter
                </button>

                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  disabled={favorites.length === 0}
                >
                  <Trash2 className="w-4 h-4" />
                  Tout supprimer
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistiques rapides */}
        {favorites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{favorites.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total favoris</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{categories.length - 1}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Catégories</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {new Set(favorites.map(f => f.author)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Auteurs</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {new Set(favorites.map(f => f.feedName)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sources</div>
            </Card>
          </div>
        )}

        {/* Liste des favoris */}
        <div className="space-y-4">
          {sortedFavorites.length > 0 ? (
            sortedFavorites.map(article => (
              <FavoriteCard
                key={article.id}
                article={article}
                onRemoveFromFavorites={removeFromFavorites}
                onOpenArticle={openArticle}
                formatDate={formatDate}
              />
            ))
          ) : favorites.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Aucun favori pour le moment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Commencez à ajouter des articles à vos favoris en cliquant sur l'étoile dans les articles qui vous intéressent.
              </p>
              <button 
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Découvrir des articles
              </button>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </Card>
          )}
        </div>

        {/* Modal de lecture d'article */}
        <ArticleModal
          article={selectedArticle}
          isOpen={isOpen}
          onClose={closeArticle}
          onToggleFavorite={() => {}} // Géré par le hook partagé
          formatDate={formatDate}
          articleNote="" // Les notes ne sont pas gérées dans les favoris pour l'instant
          onNoteChange={() => {}}
        />
      </div>
    </main>
  );
};

export default FavorisPage;