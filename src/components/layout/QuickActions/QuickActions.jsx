// components/layout/QuickActions/QuickActions.jsx
import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Plus, 
  BarChart3, 
  Settings, 
  Archive, 
  MessageSquare, 
  Globe, 
  Upload, 
  TrendingUp,
  RotateCcw,
  MoreHorizontal,
  Sparkles,
  Star,
  MessageCircle,
  Search,
  Target,
  CheckSquare,
  CreditCard,
  Users,
  Shield,
  Bell,
  Database,
  Key,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Rss,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Bookmark,
  Share2,
  UserPlus,
  Edit,
  Brain,
  Coins,
  Leaf,
  Beaker
} from 'lucide-react';
import { useRoles } from '@/context/RoleContext';
import { useTeams } from '@/context/TeamsContext';
import { useFlux } from '@/context/FluxContext';

function QuickActions({ type = 'default', onAction, activeFilter = 'all' }) {
  const { roles, openModal: openRoleModal } = useRoles();
  const { teams, openModal: openTeamModal } = useTeams();
  const { fluxData, fluxCategories, getStats } = useFlux();
  
  // États pour les sections pliables
  const [collapsedSections, setCollapsedSections] = useState({
    roles: false,
    equipes: false,
    flux: false,
    personal: false,
    team: false,
    private: false
  });

  const toggleSection = (sectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Calculer les statistiques
  const pinnedRoles = roles.filter(role => role.isPinned);
  const pinnedTeams = teams.filter(team => team.isPinned);
  const totalRoles = roles.length;
  const totalTeams = teams.length;

  // Utiliser les vraies statistiques des flux
  const fluxStats = getStats();
  const pinnedFlux = fluxStats.pinnedFlux;

  const getFluxStatusColor = (status) => {
    const colorMap = {
      active: 'text-green-600 dark:text-green-400',
      error: 'text-red-600 dark:text-red-400',
      paused: 'text-yellow-600 dark:text-yellow-400'
    };
    return colorMap[status] || 'text-gray-600 dark:text-gray-400';
  };

  const getCategoryColor = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  // Configuration pour différents types de QuickActions
  const configurations = {
    default: {
      title: 'SMARTTRACK - Actions rapides',
      sections: [
        {
          title: 'Actions rapides',
          items: [
            { name: 'Dashboard', action: () => onAction?.('navigate', 'dashboard'), icon: Home },
            { name: 'Bibliothèque', action: () => onAction?.('navigate', 'library'), icon: BookOpen },
            { name: 'Nouveau projet', action: () => onAction?.('action', 'new-project'), icon: Plus },
            { name: 'Rapports', action: () => onAction?.('action', 'reports'), icon: BarChart3 },
            { name: 'Paramètres', action: () => onAction?.('action', 'settings'), icon: Settings }
          ]
        }
      ]
    },
    library: {
      title: 'Bibliothèque',
      sections: [
        {
          title: 'Bibliothèque',
          items: [
            { 
              name: 'Recherche', 
              action: () => onAction?.('filter', 'recherche'),
              icon: Search,
              highlighted: false
            },
            { 
              name: 'Nouveautés', 
              action: () => onAction?.('filter', 'nouveautes'),
              icon: Sparkles,
              highlighted: false
            },
            { 
              name: 'Favoris', 
              action: () => onAction?.('filter', 'favorites'),
              icon: Star,
              highlighted: false
            },
            { 
              name: 'Commentaires', 
              action: () => onAction?.('filter', 'commentaires'),
              icon: MessageCircle,
              highlighted: false
            },
            { 
              name: 'Archive', 
              action: () => onAction?.('filter', 'archive'),
              icon: Archive 
            },
            { 
              name: 'Annotations', 
              action: () => onAction?.('filter', 'annotations'),
              icon: MessageSquare 
            },
            { 
              name: 'Pages web', 
              action: () => onAction?.('filter', 'web-pages'),
              icon: Globe 
            },
            { 
              name: 'Chargements', 
              action: () => onAction?.('filter', 'uploads'),
              icon: Upload 
            },
            { 
              name: 'Rapports de renseignement', 
              action: () => onAction?.('filter', 'reports'),
              icon: TrendingUp 
            }
          ]
        },
        {
          title: 'Étiquettes',
          showControls: true,
          items: [
            { name: 'React', action: () => onAction?.('tag', 'react'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
            { name: 'JavaScript', action: () => onAction?.('tag', 'javascript'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
            { name: 'Design', action: () => onAction?.('tag', 'design'), color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
            { name: 'SMARTTRACK', action: () => onAction?.('tag', 'smarttrack'), color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
            { name: 'Node.js', action: () => onAction?.('tag', 'node.js'), color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
            { name: 'IA', action: () => onAction?.('tag', 'ia'), color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' }
          ]
        }
      ]
    },
    'roles-equipe': {
      title: 'Rôles & Équipes',
      sections: [
        {
          title: 'Actions rapides',
          items: [
            { 
              name: 'Nouveau rôle', 
              action: () => onAction?.('action', 'new-role'),
              icon: Plus,
              description: 'Créer un nouveau rôle'
            },
            { 
              name: 'Nouvelle équipe', 
              action: () => onAction?.('action', 'new-team'),
              icon: Plus,
              description: 'Créer une nouvelle équipe'
            }
          ]
        },
        {
          title: `Rôles épinglés (${pinnedRoles.length}/${totalRoles})`,
          collapsible: true,
          sectionKey: 'roles',
          items: pinnedRoles.map(role => ({
            name: role.name,
            action: () => onAction?.('navigate', `role/${role.id}`),
            icon: UserCheck,
            description: `${role.members.length} membre${role.members.length > 1 ? 's' : ''}`,
            color: getColorClass(role.color)
          }))
        },
        {
          title: `Équipes épinglées (${pinnedTeams.length}/${totalTeams})`,
          collapsible: true,
          sectionKey: 'equipes',
          items: pinnedTeams.map(team => ({
            name: team.name,
            action: () => onAction?.('navigate', `team/${team.id}`),
            icon: Users,
            description: `${team.members.length} membre${team.members.length > 1 ? 's' : ''}`,
            color: getColorClass(team.color)
          }))
        }
      ]
    },
    sources: {
      title: 'Sources RSS',
      sections: [
        {
          title: 'Sources',
          items: [
            { 
              name: 'Flux RSS', 
              action: () => onAction?.('navigate', 'sources'),
              icon: Rss,
              description: 'Gérer vos flux RSS'
            },
            { 
              name: 'Mot-clé', 
              action: () => onAction?.('navigate', 'mot-cle'),
              icon: Search,
              description: 'Surveillance par mots-clés'
            },
            { 
              name: 'Hashtag', 
              action: () => onAction?.('navigate', 'hashtag'),
              icon: MessageSquare,
              description: 'Suivi des hashtags'
            },
            { 
              name: 'Entité', 
              action: () => onAction?.('navigate', 'entite'),
              icon: Users,
              description: 'Marques, personnes, lieux'
            },
            { 
              name: 'Google Actualité', 
              action: () => onAction?.('navigate', 'google-actualite'),
              icon: Globe,
              description: 'Actualités de Google'
            },
            { 
              name: 'Site web', 
              action: () => onAction?.('navigate', 'site-web'),
              icon: Globe,
              description: 'Sites web spécifiques'
            },
            { 
              name: 'Newsletter', 
              action: () => onAction?.('navigate', 'newsletter'),
              icon: MessageCircle,
              description: 'Newsletters et bulletins'
            },
            { 
              name: 'Base de donnée', 
              action: () => onAction?.('navigate', 'base-donnee'),
              icon: Database,
              description: 'Sources de données'
            },
            { 
              name: 'Connecteur API', 
              action: () => onAction?.('navigate', 'connecteur-api'),
              icon: Key,
              description: 'APIs et connecteurs'
            },
            { 
              name: 'Fichier', 
              action: () => onAction?.('navigate', 'fichier'),
              icon: Upload,
              description: 'Documents et fichiers'
            },
            { 
              name: 'Réseaux sociaux', 
              action: () => onAction?.('navigate', 'reseaux-sociaux'),
              icon: Users,
              description: 'Médias sociaux'
            },
            { 
              name: 'Podcast', 
              action: () => onAction?.('navigate', 'podcast'),
              icon: MessageCircle,
              description: 'Contenus audio'
            },
            { 
              name: 'Dark-Deep web', 
              action: () => onAction?.('navigate', 'dark-deep-web'),
              icon: Shield,
              description: 'Sources du web profond'
            }
          ]
        },
        {
          title: `Flux suivis (${pinnedFlux.length}/${fluxStats.totalFlux})`,
          collapsible: true,
          sectionKey: 'flux',
          items: pinnedFlux.map(flux => ({
            name: flux.title,
            action: () => onAction?.('navigate', `flux/${flux.id}`),
            icon: Rss,
            description: `${flux.unreadCount} non lus`,
            color: getFluxStatusColor(flux.status)
          }))
        },
        {
          title: 'Catégories',
          showControls: true,
          items: fluxCategories.filter(cat => cat.fluxCount > 0).map(cat => ({
            name: cat.name,
            action: () => onAction?.('filter', cat.id),
            color: getCategoryColor(cat.color),
            count: `${cat.fluxCount} flux`
          }))
        },
        {
          title: 'Statistiques',
          items: [
            {
              name: `${fluxStats.totalUnread} articles non lus`,
              action: () => onAction?.('filter', 'unread'),
              icon: TrendingUp,
              color: 'text-purple-600 dark:text-purple-400'
            },
            {
              name: `${fluxStats.activeFlux} flux actifs`,
              action: () => onAction?.('filter', 'active'),
              icon: CheckCircle,
              color: 'text-green-600 dark:text-green-400'
            },
            {
              name: `${fluxStats.errorFlux} flux en erreur`,
              action: () => onAction?.('filter', 'error'),
              icon: AlertCircle,
              color: 'text-red-600 dark:text-red-400'
            }
          ]
        }
      ]
    },
    canaux: {
      title: 'Réseau de Veille',
      sections: [
        {
          title: 'Navigation',
          items: [
            { 
              name: 'Flux Social', 
              action: () => onAction?.('navigate', 'canaux'),
              icon: Globe,
              description: 'Flux principal de veille collaborative'
            },
            { 
              name: 'Mes Abonnements', 
              action: () => onAction?.('tab', 'following'),
              icon: Users,
              description: 'Experts et personnes que vous suivez'
            },
            { 
              name: 'Collections', 
              action: () => onAction?.('tab', 'collections'),
              icon: Bookmark,
              description: 'Collections thématiques collaboratives'
            },
            { 
              name: 'Tendances', 
              action: () => onAction?.('tab', 'trending'),
              icon: TrendingUp,
              description: 'Sujets et contenus populaires'
            }
          ]
        },
        {
          title: 'Mon Canal Personnel',
          collapsible: true,
          sectionKey: 'personal',
          items: [
            {
              name: 'Mes Publications',
              action: () => onAction?.('filter', 'my-posts'),
              icon: MessageSquare,
              description: '12 articles partagés',
              color: 'text-blue-600 dark:text-blue-400'
            },
            {
              name: 'Brouillons',
              action: () => onAction?.('filter', 'drafts'),
              icon: Edit,
              description: '3 brouillons en attente',
              color: 'text-orange-600 dark:text-orange-400'
            },
            {
              name: 'Mes Collections',
              action: () => onAction?.('filter', 'my-collections'),
              icon: Bookmark,
              description: '5 collections créées',
              color: 'text-purple-600 dark:text-purple-400'
            }
          ]
        },
        {
          title: 'Canal d\'Équipe',
          collapsible: true,
          sectionKey: 'team',
          items: [
            {
              name: 'Équipe Innovation',
              action: () => onAction?.('team', 'innovation'),
              icon: Users,
              description: '8 membres • 45 articles',
              color: 'text-green-600 dark:text-green-400'
            },
            {
              name: 'Veille Concurrentielle',
              action: () => onAction?.('team', 'competitive'),
              icon: Target,
              description: '12 membres • 67 articles',
              color: 'text-red-600 dark:text-red-400'
            },
            {
              name: 'Recherche & Développement',
              action: () => onAction?.('team', 'rd'),
              icon: Beaker,
              description: '6 membres • 23 articles',
              color: 'text-indigo-600 dark:text-indigo-400'
            }
          ]
        },
        {
          title: 'Canaux Particuliers',
          collapsible: true,
          sectionKey: 'private',
          items: [
            {
              name: 'IA & Machine Learning',
              action: () => onAction?.('channel', 'ai-ml'),
              icon: Brain,
              description: '156 membres • Très actif',
              color: 'text-purple-600 dark:text-purple-400'
            },
            {
              name: 'Cybersécurité',
              action: () => onAction?.('channel', 'cybersec'),
              icon: Shield,
              description: '89 membres • Modéré',
              color: 'text-red-600 dark:text-red-400'
            },
            {
              name: 'FinTech & Blockchain',
              action: () => onAction?.('channel', 'fintech'),
              icon: Coins,
              description: '203 membres • Très actif',
              color: 'text-yellow-600 dark:text-yellow-400'
            },
            {
              name: 'Green Tech',
              action: () => onAction?.('channel', 'greentech'),
              icon: Leaf,
              description: '67 membres • Actif',
              color: 'text-green-600 dark:text-green-400'
            }
          ]
        },
        {
          title: 'Actions Rapides',
          items: [
            {
              name: 'Partager un Article',
              action: () => onAction?.('action', 'share-article'),
              icon: Share2,
              description: 'Partager un article avec commentaire'
            },
            {
              name: 'Créer une Discussion',
              action: () => onAction?.('action', 'create-discussion'),
              icon: MessageCircle,
              description: 'Démarrer une nouvelle discussion'
            },
            {
              name: 'Nouvelle Collection',
              action: () => onAction?.('action', 'create-collection'),
              icon: Plus,
              description: 'Créer une collection collaborative'
            }
          ]
        },
        {
          title: 'Statistiques',
          items: [
            {
              name: '24 articles partagés ce mois',
              action: () => onAction?.('stats', 'shared-articles'),
              icon: TrendingUp,
              color: 'text-blue-600 dark:text-blue-400'
            },
            {
              name: '156 abonnés',
              action: () => onAction?.('stats', 'followers'),
              icon: Users,
              color: 'text-green-600 dark:text-green-400'
            },
            {
              name: '89 abonnements',
              action: () => onAction?.('stats', 'following'),
              icon: UserPlus,
              color: 'text-purple-600 dark:text-purple-400'
            },
            {
              name: '5 collections collaboratives',
              action: () => onAction?.('stats', 'collections'),
              icon: Bookmark,
              color: 'text-orange-600 dark:text-orange-400'
            }
          ]
        }
      ]
    },
    settings: {
      title: 'Paramètres',
      sections: [
        {
          title: 'Organisation',
          items: [
            { 
              name: 'Gestion des axes', 
              action: () => onAction?.('navigate', 'axes'),
              icon: Target,
              description: 'Créez et gérez les axes stratégiques'
            },
            { 
              name: 'Gestion des tâches', 
              action: () => onAction?.('navigate', 'tasks'),
              icon: CheckSquare,
              description: 'Organisez les tâches de votre équipe'
            },
            { 
              name: 'Équipes et groupes', 
              action: () => onAction?.('navigate', 'teams'),
              icon: Users,
              description: 'Gérez vos équipes et groupes'
            }
          ]
        },
        {
          title: 'Application',
          items: [
            { 
              name: 'Plans et facturation', 
              action: () => onAction?.('navigate', 'pricing'),
              icon: CreditCard,
              description: 'Gérez votre abonnement'
            },
            { 
              name: 'Sécurité', 
              action: () => onAction?.('navigate', 'security'),
              icon: Shield,
              description: 'Paramètres de sécurité'
            },
            { 
              name: 'Notifications', 
              action: () => onAction?.('navigate', 'notifications'),
              icon: Bell,
              description: 'Préférences de notifications'
            },
            { 
              name: 'Données et export', 
              action: () => onAction?.('navigate', 'data'),
              icon: Database,
              description: 'Sauvegarde et export'
            },
            { 
              name: 'API et intégrations', 
              action: () => onAction?.('navigate', 'integrations'),
              icon: Key,
              description: 'Clés API et services externes'
            }
          ]
        }
      ]
    }
  };

  // Fonction utilitaire pour les couleurs
  function getColorClass(color) {
    const colorMap = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      red: 'text-red-600 dark:text-red-400',
      yellow: 'text-yellow-600 dark:text-yellow-400',
      pink: 'text-pink-600 dark:text-pink-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      gray: 'text-gray-600 dark:text-gray-400'
    };
    return colorMap[color] || 'text-gray-600 dark:text-gray-400';
  }

  const config = configurations[type] || configurations.default;

  const ActionButton = ({ item, isTag = false }) => {
    if (isTag) {
      return (
        <button
          onClick={item.action}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${item.color} hover:opacity-80`}
        >
          {item.name}
        </button>
      );
    }

    const Icon = item.icon;

    // Meilleure logique de surlignage basée sur activeFilter
    const getFilterFromAction = (action) => {
      const actionString = action.toString();
      const match = actionString.match(/'([^']+)'/);
      return match ? match[1] : null;
    };

    const isActive = getFilterFromAction(item.action) === activeFilter;

    // Style spécial pour les éléments avec description
    if (item.description) {
      return (
        <button 
          onClick={item.action}
          className={`w-full text-left px-3 py-3 text-sm transition-colors rounded-md ${
            isActive
              ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${item.color || ''}`} />
            <div className="flex-1 min-w-0">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </div>
            </div>
          </div>
        </button>
      );
    }

    // Style pour les éléments avec count (catégories)
    if (item.count) {
      return (
        <button
          onClick={item.action}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${item.color} hover:opacity-80 flex items-center justify-between`}
        >
          <span>{item.name}</span>
          <span className="text-xs opacity-75">{item.count}</span>
        </button>
      );
    }

    return (
      <button 
        onClick={item.action}
        className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-md flex items-center ${
          isActive
            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        {Icon && <Icon className={`w-4 h-4 mr-3 ${item.color || ''}`} />}
        {item.name}
      </button>
    );
  };

  const SectionControls = () => (
    <div className="flex items-center space-x-1">
      <button 
        onClick={() => onAction?.('control', 'settings')}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
        title="Paramètres des étiquettes"
      >
        <Settings className="w-3 h-3" />
      </button>
      <button 
        onClick={() => onAction?.('control', 'reset')}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
        title="Réinitialiser les filtres"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
      <button 
        onClick={() => onAction?.('control', 'more')}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
        title="Plus d'options"
      >
        <MoreHorizontal className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {config.sections.map((section, sectionIndex) => (
        <div 
          key={sectionIndex} 
          className={`p-4 ${sectionIndex > 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="flex items-center gap-1">
              {section.collapsible && (
                <button
                  onClick={() => toggleSection(section.sectionKey)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                  title={collapsedSections[section.sectionKey] ? 'Déplier' : 'Plier'}
                >
                  {collapsedSections[section.sectionKey] ? (
                    <ChevronRight className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              )}
              {section.showControls && <SectionControls />}
            </div>
          </div>
          
          {!collapsedSections[section.sectionKey] && (
            <div className="space-y-2">
              {section.items.length > 0 ? (
                section.items.map((item, itemIndex) => (
                  <ActionButton 
                    key={itemIndex} 
                    item={item} 
                    isTag={section.title === 'Étiquettes'}
                  />
                ))
              ) : (
                // Affichage du message d'aide pour les sections vides épinglées
                (section.title.includes('épinglés') || section.title.includes('épinglées')) ? (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                    {section.title.includes('Rôles') ? 'Aucun rôle épinglé' : section.title.includes('Flux') ? 'Aucun flux épinglé' : 'Aucune équipe épinglée'}
                    <div className="text-xs mt-1">Utilisez l'icône 📌 pour épingler</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuickActions;