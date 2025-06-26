// src/pages/SourcesPage/components/FluxSuivis/FluxSuivisPage.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreVertical,
  RefreshCw,
  Pause,
  Play,
  Edit,
  Trash2,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Tag,
  Users
} from 'lucide-react';

const FluxCard = ({ flux, onEdit, onDelete, onToggleStatus, onSync, viewMode = 'grid' }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'error':
        return 'Erreur';
      case 'paused':
        return 'En pause';
      default:
        return 'Inconnu';
    }
  };

  const formatLastSync = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `Il y a ${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    }
    return `Il y a ${minutes}m`;
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Tech': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'Science': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'News': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'Business': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Favicon */}
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
              {flux.favicon ? (
                <img 
                  src={flux.favicon} 
                  alt={flux.title}
                  className="w-6 h-6 rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <Globe className="w-5 h-5 text-gray-400" style={{ display: flux.favicon ? 'none' : 'flex' }} />
            </div>

            {/* Info principale */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {flux.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(flux.category)}`}>
                  {flux.category}
                </span>
                {flux.unreadCount > 0 && (
                  <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                    {flux.unreadCount} non lus
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                {flux.description}
              </p>
            </div>

            {/* Statut et dernière sync */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                {getStatusIcon(flux.status)}
                <span>{getStatusText(flux.status)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatLastSync(flux.lastSync)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
                <button
                  onClick={() => { onSync(flux.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Synchroniser
                </button>
                <button
                  onClick={() => { onToggleStatus(flux.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {flux.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {flux.isActive ? 'Mettre en pause' : 'Activer'}
                </button>
                <a
                  href={flux.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visiter le site
                </a>
                <button
                  onClick={() => { onEdit(flux); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => { onDelete(flux.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Erreur si présente */}
        {flux.status === 'error' && flux.lastError && (
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
            <span className="font-medium">Erreur:</span> {flux.lastError}
          </div>
        )}
      </div>
    );
  }

  // Vue grille (par défaut)
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        {/* Favicon et titre */}
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
            {flux.favicon ? (
              <img 
                src={flux.favicon} 
                alt={flux.title}
                className="w-8 h-8 rounded"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <Globe className="w-6 h-6 text-gray-400" style={{ display: flux.favicon ? 'none' : 'flex' }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
              {flux.title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(flux.category)}`}>
                {flux.category}
              </span>
              <div className="flex items-center gap-1">
                {getStatusIcon(flux.status)}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {getStatusText(flux.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
              <button
                onClick={() => { onSync(flux.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Synchroniser
              </button>
              <button
                onClick={() => { onToggleStatus(flux.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                {flux.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {flux.isActive ? 'Mettre en pause' : 'Activer'}
              </button>
              <a
                href={flux.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <ExternalLink className="w-4 h-4" />
                Visiter le site
              </a>
              <button
                onClick={() => { onEdit(flux); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </button>
              <button
                onClick={() => { onDelete(flux.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {flux.description || 'Aucune description disponible pour ce flux.'}
      </p>

      {/* Statistiques */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Articles non lus:</span>
          <span className="font-medium text-gray-900 dark:text-white">{flux.unreadCount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Total articles:</span>
          <span className="font-medium text-gray-900 dark:text-white">{flux.totalArticles}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Dernière sync:</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatLastSync(flux.lastSync)}</span>
        </div>
      </div>

      {/* Tags */}
      {flux.tags && flux.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {flux.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {flux.tags.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                +{flux.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Erreur si présente */}
      {flux.status === 'error' && flux.lastError && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Erreur:</span>
              <br />
              {flux.lastError}
            </div>
          </div>
        </div>
      )}

      {/* Action principale */}
      <div className="flex gap-2">
        <button
          onClick={() => onSync(flux.id)}
          className="flex-1 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-sm font-medium"
        >
          Synchroniser
        </button>
        <a
          href={flux.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Visiter le site"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

function FluxSuivisPage({ 
  fluxData, 
  categories, 
  onQuickAction,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('lastSync');

  // Filtrage et tri des flux
  const filteredFlux = fluxData
    .filter(flux => {
      const matchesSearch = flux.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           flux.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || flux.category === selectedCategory;
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'active' && flux.isActive) ||
                           (statusFilter === 'inactive' && !flux.isActive) ||
                           (statusFilter === 'error' && flux.status === 'error');
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'unread':
          return b.unreadCount - a.unreadCount;
        case 'lastSync':
        default:
          return new Date(b.lastSync) - new Date(a.lastSync);
      }
    });

  const handleFluxAction = (action, fluxId) => {
    console.log(`Action ${action} pour le flux ${fluxId}`);
    // Ici vous implémenterez les actions réelles
  };

  const handleEdit = (flux) => {
    console.log('Modifier le flux:', flux);
    // Ouvrir une modal d'édition
  };

  const handleDelete = (fluxId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce flux ?')) {
      console.log('Supprimer le flux:', fluxId);
      // Implémenter la suppression
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Barre de filtres */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un flux..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filtres */}
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Toutes catégories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Tous statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="error">En erreur</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="lastSync">Dernière sync</option>
              <option value="title">Nom</option>
              <option value="unread">Non lus</option>
            </select>

            {/* Sélecteur de vue */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors rounded-l-lg`}
                title="Vue grille"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors rounded-r-lg`}
                title="Vue liste"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto p-6">
        {filteredFlux.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredFlux.map((flux) => (
              <FluxCard
                key={flux.id}
                flux={flux}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={(id) => handleFluxAction('toggle', id)}
                onSync={(id) => handleFluxAction('sync', id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || selectedCategory !== 'all' || statusFilter !== 'all' 
                ? 'Aucun flux trouvé' 
                : 'Aucun flux RSS configuré'
              }
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'all' || statusFilter !== 'all'
                ? 'Essayez de modifier vos critères de recherche pour voir plus de résultats.'
                : 'Commencez par ajouter vos premiers flux RSS pour suivre l\'actualité de vos sources préférées.'
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && statusFilter === 'all' && (
              <button
                onClick={() => onQuickAction('new-flux')}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Ajouter votre premier flux
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FluxSuivisPage;