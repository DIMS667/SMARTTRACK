import React, { useState } from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import HorizontalNav from '@/components/layout/HorizontalNav';
import QuickActions from '@/components/layout/QuickActions';
import DashboardPage from '@/pages/DashboardPage';
import LibraryPage from '@/pages/LibraryPage';
import CustomizeButton from '@/components/customizer/CustomizeButton';
import CustomizerPanel from '@/components/customizer/CustomizerPanel';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [libraryFilter, setLibraryFilter] = useState('all');
  // États pour gérer le hover
  const [isHoveringLibrary, setIsHoveringLibrary] = useState(false);
  const [isHoveringQuickActions, setIsHoveringQuickActions] = useState(false);
  const { navType, containerWidth, borderRadius, sidebarCollapsed, sidebarTheme } = useCustomizer();

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
    const availablePages = ['dashboard', 'library'];
    
    if (availablePages.includes(page)) {
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
        handleNavigation(actionValue);
        break;
      case 'filter':
        console.log(`Filtrer par: ${actionValue}`);
        setLibraryFilter(actionValue);
        break;
      case 'tag':
        console.log(`Filtrer par tag: ${actionValue}`);
        setLibraryFilter(actionValue);
        break;
      case 'action':
        console.log(`Action: ${actionValue}`);
        break;
      case 'control':
        console.log(`Contrôle: ${actionValue}`);
        if (actionValue === 'reset') {
          setLibraryFilter('all');
        }
        break;
      default:
        console.log(`Action non reconnue: ${actionType} - ${actionValue}`);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'library':
        return <LibraryPage activeFilter={libraryFilter} />;
      case 'dashboard':
      default:
        return <DashboardPage />;
    }
  };

  const getQuickActionsType = () => {
    return currentPage === 'library' ? 'library' : 'default';
  };

  // Déterminer si QuickActions doit être affiché
  const shouldShowQuickActions = currentPage === 'library' && (isHoveringLibrary || isHoveringQuickActions);

  // Vertical Navigation (défaut)
  if (navType === 'vertical') {
    return (
      <div className={getContainerClass()}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
            onNavigate={handleNavigation}
            currentPage={currentPage}
            onLibraryHover={setIsHoveringLibrary}
          />
          
          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col min-h-screen ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
            <Header setSidebarOpen={setSidebarOpen} onNavigate={handleNavigation} />
            
            <div className="flex flex-1 overflow-hidden">
              {/* QuickActions avec animation de transition */}
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
                  activeFilter={libraryFilter}
                />
              </div>
              
              {/* Page Content */}
              <main className={`${getContentClass()} ${sidebarTheme.content}`}>
                {renderCurrentPage()}
              </main>
            </div>
          </div>
        </div>
        
        <CustomizeButton />
        <CustomizerPanel />
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
                activeFilter={libraryFilter}
              />
            </div>
            <main className={`${getContentClass()} ${sidebarTheme.content}`}>
              {renderCurrentPage()}
            </main>
          </div>
        </div>
        
        <CustomizeButton />
        <CustomizerPanel />
      </div>
    );
  }

  // Combo Navigation (Sidebar + Top Nav)
  if (navType === 'combo') {
    return (
      <div className={getContainerClass()}>
        <div className="flex min-h-screen">
          <Sidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
            onNavigate={handleNavigation}
            currentPage={currentPage}
            onLibraryHover={setIsHoveringLibrary}
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
                  activeFilter={libraryFilter}
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
      </div>
    );
  }

  // Dual Navigation - QuickActions toujours visible
  if (navType === 'dual') {
    return (
      <div className={getContainerClass()}>
        <div className="flex min-h-screen">
          <Sidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
            onNavigate={handleNavigation}
            currentPage={currentPage}
            onLibraryHover={setIsHoveringLibrary}
          />
          
          <div className={`flex-1 flex flex-col min-h-screen ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
            <Header setSidebarOpen={setSidebarOpen} onNavigate={handleNavigation} />
            
            <div className="flex flex-1 overflow-hidden">
              <div className={`w-64 ${sidebarTheme.quickActions} border-r ${sidebarTheme.border}`}>
                <QuickActions 
                  type={getQuickActionsType()} 
                  onAction={handleQuickAction}
                  activeFilter={libraryFilter}
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
      </div>
    );
  }

  return null;
}

export default MainLayout;