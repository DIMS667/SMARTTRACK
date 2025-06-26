// components/layout/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { 
  Home, Users, FolderOpen, Calendar, FileText, BarChart3, 
  Settings, X, Trello, Target, Clock, BookOpen, ChevronLeft, Rss, Radio
} from 'lucide-react';
import { useCustomizer } from '@/context/CustomizerContext';
import SidebarItem from './SidebarItem';
import TeamSection from './TeamSection';
import RoleSection from './RoleSection';

// Navigation adaptée pour SMARTTRACK - seules les pages qui seront créées
const baseNavigation = [
  { name: 'Dashboard', href: 'dashboard', icon: Home, count: null, available: true },
  { name: 'Bibliothèque', href: 'library', icon: BookOpen, count: 8, available: true },
  { name: 'Sources', href: 'sources', icon: Rss, count: 24, available: true },
  { name: 'Rôles & Équipe', href: 'roles-equipe', icon: Users, count: null, available: true },
  { name: 'Projets', href: 'projects', icon: FolderOpen, count: 8, available: false },
  { name: 'Tâches', href: 'tasks', icon: Target, count: 12, available: false },
  { name: 'Planning', href: 'planning', icon: Calendar, count: null, available: false },
  { name: 'Suivi temps', href: 'timetracking', icon: Clock, count: null, available: false },
  { name: 'Documents', href: 'documents', icon: FileText, count: 24, available: false },
  { name: 'Rapports', href: 'reports', icon: BarChart3, count: null, available: false }
];

// Item pour les canaux avec icône antenne
const canauxItem = {
  name: 'Canaux',
  href: 'canaux',
  icon: Radio,
  count: 3,
  available: true
};

function Sidebar({ 
  isOpen, 
  setIsOpen, 
  onNavigate, 
  currentPage, 
  onLibraryHover, 
  onSettingsHover, 
  onRolesEquipeHover, 
  onSourcesHover,
  onCanauxHover 
}) {
  const { sidebarTheme, sidebarCollapsed, toggleSidebar } = useCustomizer();
  const activeItem = currentPage || 'dashboard';
  const [socialFeatures, setSocialFeatures] = useState(false);

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const checkSocialFeatures = () => {
      try {
        // Simuler la vérification des préférences utilisateur
        // Dans une vraie app, vous récupéreriez cela depuis un contexte ou une API
        const savedPreferences = localStorage.getItem('user-preferences');
        if (savedPreferences) {
          const preferences = JSON.parse(savedPreferences);
          setSocialFeatures(preferences.socialFeatures || false);
        }
      } catch (error) {
        console.log('Erreur lors du chargement des préférences:', error);
      }
    };

    checkSocialFeatures();
    
    // Écouter les changements dans localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'user-preferences') {
        checkSocialFeatures();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier périodiquement (pour les changements dans la même page)
    const interval = setInterval(checkSocialFeatures, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Construire la navigation en insérant les canaux après Sources
  const navigation = socialFeatures 
    ? [
        baseNavigation[0], // Dashboard
        baseNavigation[1], // Bibliothèque
        baseNavigation[2], // Sources
        canauxItem,        // Canaux après Sources
        ...baseNavigation.slice(3) // Reste de la navigation
      ]
    : baseNavigation;

  const handleItemClick = (href, available) => {
    if (available && onNavigate) {
      onNavigate(href);
    } else if (!available) {
      // Afficher une notification que la page n'est pas encore disponible
      console.log(`Page ${href} en cours de développement pour SMARTTRACK`);
      // Optionnel : vous pouvez ajouter une notification toast ici
    }
    
    // Fermer la sidebar sur mobile après navigation
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
        ${sidebarTheme.primary}
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className={`flex h-16 items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-4 flex-shrink-0`}>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className={`w-4 h-4 ${sidebarTheme.primary} rounded`}></div>
            </div>
            {!sidebarCollapsed && (
              <span className="ml-2 text-white font-semibold text-lg">SMARTTRACK</span>
            )}
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden ml-auto text-white hover:text-gray-200 hover:bg-black/20 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Navigation principale */}
          <nav className="px-4 space-y-2 py-4">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => {
                  if (item.href === 'library') {
                    onLibraryHover?.(true);
                  } else if (item.href === 'roles-equipe') {
                    onRolesEquipeHover?.(true);
                  } else if (item.href === 'sources') {
                    onSourcesHover?.(true);
                  } else if (item.href === 'canaux') {
                    onCanauxHover?.(true);
                  } else {
                    onLibraryHover?.(false);
                    onRolesEquipeHover?.(false);
                    onSourcesHover?.(false);
                    onCanauxHover?.(false);
                  }
                }}
                onMouseLeave={() => {
                  onLibraryHover?.(false);
                  onRolesEquipeHover?.(false);
                  onSourcesHover?.(false);
                  onCanauxHover?.(false);
                }}
              >
                <SidebarItem
                  icon={item.icon}
                  label={item.name}
                  active={activeItem === item.href}
                  collapsed={sidebarCollapsed}
                  onClick={() => handleItemClick(item.href, item.available)}
                  disabled={!item.available}
                  count={item.count}
                />
                {/* Indicateur pour les pages non disponibles */}
                {!item.available && !sidebarCollapsed && (
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-yellow-500 text-yellow-900 px-1 rounded">
                    Bientôt
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* TeamSection - Gardé pour les équipes existantes */}
          {!sidebarCollapsed && (
            <div className="px-4 pb-4">
              <TeamSection />
            </div>
          )}
        </div>

        {/* Settings - toujours en bas, position fixe - MAINTENANT POINTE VERS SETTINGS */}
        <div 
          className="px-4 pb-4 flex-shrink-0 border-t border-white/10 pt-4"
          onMouseEnter={() => onSettingsHover?.(true)}
          onMouseLeave={() => onSettingsHover?.(false)}
        >
          <SidebarItem
            icon={Settings}
            label="Paramètres"
            active={activeItem === 'settings'}
            collapsed={sidebarCollapsed}
            onClick={() => handleItemClick('settings', true)}
            disabled={false}
          />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;