//MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import HorizontalNav from '@/components/layout/HorizontalNav';
import QuickActions from '@/components/layout/QuickActions';
import DashboardPage from '@/pages/DashboardPage';
import LibraryPage from '@/pages/LibraryPage';
import SourcesPage from '@/pages/SourcesPage';
import MotcleFluxPage from '@/pages/SourcesPage/components/MotcleFlux';
import HashtagFluxPage from '@/pages/SourcesPage/components/HashtagFlux';
import GoogleNewsPage from '@/pages/SourcesPage/components/GoogleNews';
import WebScraperPage from '@/pages/SourcesPage/components/WebScraper';
import NewsletterPage from '@/pages/SourcesPage/components/Newsletter';
import RolesEquipePage from '@/pages/RolesEquipePage';
import RoleDetailPage from '@/pages/RolePage/RoleDetailPage';
import PricingPage from '@/pages/PricingPage';
import SettingsPage from '@/pages/SettingsPage/SettingsPage';
import ProfilePage from '@/pages/ProfilePage';
import CanauxPage from '@/pages/CanauxPage';
import CustomizeButton from '@/components/customizer/CustomizeButton';
import CustomizerPanel from '@/components/customizer/CustomizerPanel';
import { useRoles } from '@/context/RoleContext';
import { useTeams } from '@/context/TeamsContext';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [libraryFilter, setLibraryFilter] = useState('all');
  const [settingsSection, setSettingsSection] = useState('axes');
  
  // États pour gérer le hover
  const [isHoveringLibrary, setIsHoveringLibrary] = useState(false);
  const [isHoveringRolesEquipe, setIsHoveringRolesEquipe] = useState(false);
  const [isHoveringSources, setIsHoveringSources] = useState(false);
  const [isHoveringSettings, setIsHoveringSettings] = useState(false);
  const [isHoveringQuickActions, setIsHoveringQuickActions] = useState(false);
  const [isHoveringCanaux, setIsHoveringCanaux] = useState(false);
  
  // État pour forcer le re-render de la sidebar quand les préférences changent
  const [sidebarKey, setSidebarKey] = useState(0);
  
  const { navType, containerWidth, borderRadius, sidebarCollapsed, sidebarTheme } = useCustomizer();
  const { isModalOpen, openModal: openRoleModal } = useRoles();
  const { openModal: openTeamModal } = useTeams();

  // Écouter les changements de préférences
  useEffect(() => {
    const handlePreferencesChange = (event) => {
      // Forcer le re-render de la sidebar
      setSidebarKey(prev => prev + 1);
    };

    window.addEventListener('preferencesChanged', handlePreferencesChange);
    
    return () => {
      window.removeEventListener('preferencesChanged', handlePreferencesChange);
    };
  }, []);

  const getContainerClass = () => {
    const baseClass = `min-h-screen ${sidebarTheme.background} transition-all duration-300`;
    const widthClass = containerWidth === 'boxed' ? 'max-w-7xl mx-auto' : 'w-full';
    return `${baseClass} ${widthClass}`;
  };

  const getContentClass = () => {
    const baseClass = "transition-all duration-300 flex-1 overflow-hidden";
    const radiusClass = 
      borderRadius === 'square' ? 'rounded-none' :
      borderRadius === 'rounded' ? 'rounded-lg' : 'rounded-xl';
    return `${baseClass} ${radiusClass}`;
  };

  const handleNavigation = (page) => {
    const availablePages = [
      'dashboard', 
      'library', 
      'sources', 
      'mot-cle', 
      'hashtag',
      'google-actualite',
      'site-web',
      'newsletter',
      'roles-equipe', 
      'role-management', 
      'pricing', 
      'settings',
      'profile',
      'canaux'
    ];
    
    if (availablePages.includes(page) || page.startsWith('role/')) {
      setCurrentPage(page);
      if (page === 'library') {
        setLibraryFilter('all');
      }
    } else {
      console.log(`Navigation vers ${page} - Page à créer plus tard`);
    }
  };

  const handleQuickAction = (actionType, actionValue) => {
    switch (actionType) {
      case 'navigate':
        if (currentPage === 'settings') {
          setSettingsSection(actionValue);
        } else {
          handleNavigation(actionValue);
        }
        break;
      case 'filter':
        setLibraryFilter(actionValue);
        break;
      case 'tag':
        setLibraryFilter(actionValue);
        break;
      case 'action':
        if (actionValue === 'new-role') {
          openRoleModal();
        } else if (actionValue === 'new-team') {
          openTeamModal();
        } else if (actionValue === 'new-flux') {
          console.log('Nouveau flux RSS');
        } else if (actionValue === 'import-opml') {
          console.log('Import OPML');
        } else if (actionValue === 'sync-all') {
          console.log('Synchroniser tous les flux');
        } else if (actionValue === 'newsletter-subscribe') {
          console.log('S\'abonner à une newsletter');
        } else if (actionValue === 'newsletter-create') {
          console.log('Créer une newsletter');
        }
        break;
      case 'control':
        if (actionValue === 'reset') {
          setLibraryFilter('all');
        }
        break;
      default:
        console.log(`Action non reconnue: ${actionType} - ${actionValue}`);
    }
  };

  const renderCurrentPage = () => {
    // Gérer les routes des rôles
    if (currentPage === 'roles-equipe') {
      return <RolesEquipePage onNavigate={handleNavigation} />;
    }
    
    if (currentPage === 'role-management') {
      return <RolesEquipePage onNavigate={handleNavigation} />;
    }
    
    if (currentPage.startsWith('role/')) {
      const roleId = currentPage.split('/')[1];
      return <RoleDetailPage roleId={roleId} onNavigate={handleNavigation} />;
    }

    // Pages existantes
    switch (currentPage) {
      case 'library':
        return <LibraryPage activeFilter={libraryFilter} />;
      case 'sources': 
        return <SourcesPage onNavigate={handleNavigation} />;
      case 'mot-cle':
        return <MotcleFluxPage onNavigate={handleNavigation} />;
      case 'hashtag':
        return <HashtagFluxPage onNavigate={handleNavigation} />;
      case 'google-actualite':
        return <GoogleNewsPage onNavigate={handleNavigation} />;
      case 'site-web':
        return <WebScraperPage onNavigate={handleNavigation} />;
      case 'newsletter':
        return <NewsletterPage onNavigate={handleNavigation} />;
      case 'pricing':
        return <PricingPage />;
      case 'settings':
        return <SettingsPage activeSection={settingsSection} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigation} />;
      case 'canaux':
        return <CanauxPage onNavigate={handleNavigation} />;
      case 'dashboard':
      default:
        return <DashboardPage />;
    }
  };

  const getQuickActionsType = () => {
    if (currentPage === 'settings') return 'settings';
    if (currentPage === 'roles-equipe') return 'roles-equipe';
    if (currentPage === 'canaux') return 'canaux';
    if (currentPage === 'sources' || 
        currentPage === 'mot-cle' || 
        currentPage === 'hashtag' || 
        currentPage === 'google-actualite' ||
        currentPage === 'site-web' ||
        currentPage === 'newsletter') return 'sources';
    return currentPage === 'library' ? 'library' : 'default';
  };

  const shouldShowQuickActions = 
    (currentPage === 'settings' && (isHoveringSettings || isHoveringQuickActions)) ||
    (currentPage === 'library' && (isHoveringLibrary || isHoveringQuickActions)) ||
    (currentPage === 'canaux' && (isHoveringCanaux || isHoveringQuickActions)) ||
    ((currentPage === 'sources' || 
      currentPage === 'mot-cle' || 
      currentPage === 'hashtag' || 
      currentPage === 'google-actualite' ||
      currentPage === 'site-web' ||
      currentPage === 'newsletter') && (isHoveringSources || isHoveringQuickActions)) ||
    (currentPage === 'roles-equipe' && (isHoveringRolesEquipe || isHoveringQuickActions));

  // Component pour le modal des rôles
  const RoleModalComponent = () => {
    if (!isModalOpen) return null;
    
    try {
      const { RoleModal } = require('@/pages/RolePage/modal/RoleModal');
      return <RoleModal />;
    } catch (error) {
      return null;
    }
  };

  // Vertical Navigation (défaut)
  if (navType === 'vertical') {
    return (
      <div className={getContainerClass()}>
        <div className="flex min-h-screen">
          <Sidebar 
            key={sidebarKey}
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
            onNavigate={handleNavigation}
            currentPage={currentPage}
            onLibraryHover={setIsHoveringLibrary}
            onSourcesHover={setIsHoveringSources}
            onSettingsHover={setIsHoveringSettings}
            onRolesEquipeHover={setIsHoveringRolesEquipe}
            onCanauxHover={setIsHoveringCanaux}
          />
          
          <div className={`flex-1 flex flex-col min-h-screen ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
            <Header setSidebarOpen={setSidebarOpen} onNavigate={handleNavigation} />
            
            <div className="flex flex-1 overflow-hidden">
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  shouldShowQuickActions ? 'w-64 opacity-100' : 'w-0 opacity-0'
                } overflow-hidden ${sidebarTheme.quickActions} border-r ${sidebarTheme.border}`}
                onMouseEnter={() => setIsHoveringQuickActions(true)}
                onMouseLeave={() => setIsHoveringQuickActions(false)}
              >
                <QuickActions 
                  type={getQuickActionsType()} 
                  onAction={handleQuickAction}
                  activeFilter={currentPage === 'settings' ? settingsSection : libraryFilter}
                />
              </div>
              
              <main className={`${getContentClass()} ${sidebarTheme.content}`}>
                {renderCurrentPage()}
              </main>
            </div>
          </div>
        </div>
        
        <CustomizeButton />
        <CustomizerPanel />
        <RoleModalComponent />
      </div>
    );
  }

  // Horizontal Navigation
  if (navType === 'horizontal') {
    return (
      <div className={getContainerClass()}>
        <div className="flex flex-col min-h-screen w-full">
          <Header setSidebarOpen={setSidebarOpen} onNavigate={handleNavigation} />
          <HorizontalNav onNavigate={handleNavigation} />
          
          <div className="flex flex-1 overflow-hidden">
            <div 
              className={`transition-all duration-300 ease-in-out ${
                shouldShowQuickActions ? 'w-64 opacity-100' : 'w-0 opacity-0'
              } overflow-hidden ${sidebarTheme.quickActions} border-r ${sidebarTheme.border}`}
              onMouseEnter={() => setIsHoveringQuickActions(true)}
              onMouseLeave={() => setIsHoveringQuickActions(false)}
            >
              <QuickActions 
                type={getQuickActionsType()} 
                onAction={handleQuickAction}
                activeFilter={currentPage === 'settings' ? settingsSection : libraryFilter}
              />
            </div>
            <main className={`${getContentClass()} ${sidebarTheme.content}`}>
              {renderCurrentPage()}
            </main>
          </div>
        </div>
        
        <CustomizeButton />
        <CustomizerPanel />
        <RoleModalComponent />
      </div>
    );
  }

  // Combo Navigation (Sidebar + Top Nav)
  if (navType === 'combo') {
    return (
      <div className={getContainerClass()}>
        <div className="flex min-h-screen">
          <Sidebar 
            key={sidebarKey}
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
            onNavigate={handleNavigation}
            currentPage={currentPage}
            onLibraryHover={setIsHoveringLibrary}
            onSourcesHover={setIsHoveringSources}
            onSettingsHover={setIsHoveringSettings}
            onRolesEquipeHover={setIsHoveringRolesEquipe}
            onCanauxHover={setIsHoveringCanaux}
          />
          
          <div className={`flex-1 flex flex-col min-h-screen ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
            <Header setSidebarOpen={setSidebarOpen} onNavigate={handleNavigation} />
            <HorizontalNav onNavigate={handleNavigation} />
            
            <div className="flex flex-1 overflow-hidden">
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  shouldShowQuickActions ? 'w-64 opacity-100' : 'w-0 opacity-0'
                } overflow-hidden ${sidebarTheme.quickActions} border-r ${sidebarTheme.border}`}
                onMouseEnter={() => setIsHoveringQuickActions(true)}
                onMouseLeave={() => setIsHoveringQuickActions(false)}
              >
                <QuickActions 
                  type={getQuickActionsType()} 
                  onAction={handleQuickAction}
                  activeFilter={currentPage === 'settings' ? settingsSection : libraryFilter}
                />
              </div>
              <main className={`${getContentClass()} ${sidebarTheme.content}`}>
                {renderCurrentPage()}
              </main>
            </div>
          </div>
        </div>
        
        <CustomizeButton />
        <CustomizerPanel />
        <RoleModalComponent />
      </div>
    );
  }

  // Dual Navigation - QuickActions toujours visible
  if (navType === 'dual') {
    return (
      <div className={getContainerClass()}>
        <div className="flex min-h-screen">
          <Sidebar 
            key={sidebarKey}
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
            onNavigate={handleNavigation}
            currentPage={currentPage}
            onLibraryHover={setIsHoveringLibrary}
            onSourcesHover={setIsHoveringSources}
            onSettingsHover={setIsHoveringSettings}
            onRolesEquipeHover={setIsHoveringRolesEquipe}
            onCanauxHover={setIsHoveringCanaux}
          />
          
          <div className={`flex-1 flex flex-col min-h-screen ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
            <Header setSidebarOpen={setSidebarOpen} onNavigate={handleNavigation} />
            
            <div className="flex flex-1 overflow-hidden">
              <div className={`w-64 ${sidebarTheme.quickActions} border-r ${sidebarTheme.border}`}>
                <QuickActions 
                  type={getQuickActionsType()} 
                  onAction={handleQuickAction}
                  activeFilter={currentPage === 'settings' ? settingsSection : libraryFilter}
                />
              </div>
              <main className={`${getContentClass()} ${sidebarTheme.content}`}>
                {renderCurrentPage()}
              </main>
            </div>
          </div>
        </div>
        
        <CustomizeButton />
        <CustomizerPanel />
        <RoleModalComponent />
      </div>
    );
  }

  return null;
}

export default MainLayout;