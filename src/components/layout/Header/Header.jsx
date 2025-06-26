// Header.jsx - Version adaptée pour SMARTTRACK
import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, ChevronDown, Mail, User, Settings } from 'lucide-react';
import Button from '@/components/common/Button';
import Avatar from '@/components/common/Avatar';
import { useCustomizer } from '@/context/CustomizerContext';

function Header({ setSidebarOpen, onNavigate }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { isDark, navbarTheme } = useCustomizer();

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleProfileClick = () => {
    setIsProfileOpen(false);
    onNavigate && onNavigate('profile');
  };

  const handleSettingsClick = () => {
    setIsProfileOpen(false);
    onNavigate && onNavigate('settings');
  };

  const handleNotificationsClick = () => {
    console.log('Système de notifications en cours de développement pour SMARTTRACK');
  };

  return (
    <header className={`${navbarTheme.primary} shadow-sm border-b ${navbarTheme.border} transition-colors duration-200`}>
      <div className="flex h-16 items-center justify-between px-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-white hover:text-gray-200 hover:bg-black/20 transition-colors duration-200 rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <div className="w-full max-w-lg lg:max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <input
                type="text"
                placeholder="Rechercher dans SMARTTRACK..."
                className="w-full pl-10 pr-4 py-2 border border-white/20 bg-black/20 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 relative text-white hover:text-white hover:bg-black/20 rounded-lg transition-colors duration-200"
            onClick={handleNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium min-w-[16px] transform translate-x-1 -translate-y-1">
              3
            </span>
          </Button>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-1 hover:bg-black/20 rounded-lg transition-colors duration-200"
            >
              <Avatar alt="Utilisateur SMARTTRACK" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Utilisateur</p>
                <p className="text-xs text-white/70">admin@smarttrack.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-white/70" />
            </button>

            {isProfileOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="py-1">
                  <button 
                    onClick={handleProfileClick}
                    className={`flex items-center w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mon Profil
                  </button>
                  
                  <button 
                    onClick={handleSettingsClick}
                    className={`flex items-center w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </button>
                  
                  <hr className={`my-1 ${isDark ? 'border-gray-600' : 'border-gray-200'}`} />
                  
                  <button 
                    onClick={() => {
                      console.log('Déconnexion - à implémenter selon votre système d\'auth');
                      setIsProfileOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;