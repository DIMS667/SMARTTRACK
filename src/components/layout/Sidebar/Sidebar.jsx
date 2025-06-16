// components/layout/Sidebar/Sidebar.jsx
import React from 'react';
import { 
  Home, Users, FolderOpen, Calendar, FileText, BarChart3, 
  Settings, X, Trello, Target, Clock, BookOpen, ChevronLeft
} from 'lucide-react';
import { useCustomizer } from '@/context/CustomizerContext';
import SidebarItem from './SidebarItem';
import TeamSection from './TeamSection';

// Navigation adaptée pour SMARTTRACK - seules les pages qui seront créées
const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: Home, count: null, available: true },
  { name: 'Bibliothèque', href: 'library', icon: BookOpen, count: 8, available: true },
  { name: 'Projets', href: 'projects', icon: FolderOpen, count: 8, available: false },
  { name: 'Tâches', href: 'tasks', icon: Target, count: 12, available: false },
  { name: 'Équipe', href: 'team', icon: Users, count: 5, available: false },
  { name: 'Planning', href: 'planning', icon: Calendar, count: null, available: false },
  { name: 'Suivi temps', href: 'timetracking', icon: Clock, count: null, available: false },
  { name: 'Documents', href: 'documents', icon: FileText, count: 24, available: false },
  { name: 'Rapports', href: 'reports', icon: BarChart3, count: null, available: false }
];

function Sidebar({ isOpen, setIsOpen, onNavigate, currentPage, onLibraryHover }) {
  const { sidebarTheme, sidebarCollapsed, toggleSidebar } = useCustomizer();
  const activeItem = currentPage || 'dashboard';

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

        {/* Navigation - takes available space */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto min-h-0 py-4">
          {navigation.map((item) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => {
                if (item.href === 'library') {
                  onLibraryHover?.(true);
                } else {
                  onLibraryHover?.(false);
                }
              }}
              onMouseLeave={() => onLibraryHover?.(false)}
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

        {/* TeamSection - always at bottom */}
        {!sidebarCollapsed && (
          <div className="flex-shrink-0 px-4">
            <TeamSection />
          </div>
        )}

        {/* Settings - always at bottom */}
        <div className="px-4 pb-4 flex-shrink-0 pt-4">
          <SidebarItem
            icon={Settings}
            label="Paramètres"
            active={activeItem === 'settings'}
            collapsed={sidebarCollapsed}
            onClick={() => handleItemClick('settings', false)}
            disabled={true}
          />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;