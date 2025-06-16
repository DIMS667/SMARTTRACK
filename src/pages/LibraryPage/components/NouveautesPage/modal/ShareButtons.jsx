import React, { useState, useRef, useEffect } from 'react';

const ShareButtons = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shareOptions = [
    {
      name: "Bluesky",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: "text-blue-500"
    },
    {
      name: "Copy article",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      ),
      color: "text-gray-600 dark:text-gray-400"
    },
    {
      name: "Print article",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="6,9 6,2 18,2 18,9"/>
          <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
      ),
      color: "text-gray-600 dark:text-gray-400"
    },
    {
      name: "Save as...",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
          <polyline points="17,21 17,13 7,13 7,21"/>
          <polyline points="7,3 7,8 15,8"/>
        </svg>
      ),
      color: "text-gray-600 dark:text-gray-400"
    },
    {
      name: "Blogger",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      color: "text-orange-600"
    },
    {
      name: "Telegram",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: "text-blue-500"
    },
    {
      name: "Buffer",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.251 11.567L12 6.741 1.749 11.567 12 16.392l10.251-4.825zm0 4.825L12 21.217l-10.251-4.825L12 11.567l10.251 4.825zM12 2.783l10.251 4.825L12 12.433 1.749 7.608 12 2.783z"/>
        </svg>
      ),
      color: "text-gray-700"
    },
    {
      name: "Evernote",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.22 5.5c0-1.21.99-2.2 2.2-2.2h3.27c.28 0 .5.22.5.5s-.22.5-.5.5h-3.27c-.66 0-1.2.54-1.2 1.2v1.5h4.47c.83 0 1.5.67 1.5 1.5v8c0 .83-.67 1.5-1.5 1.5H5.5c-.83 0-1.5-.67-1.5-1.5V8.5c0-.83.67-1.5 1.5-1.5h2.72V5.5z"/>
        </svg>
      ),
      color: "text-green-600"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "text-blue-700"
    },
    {
      name: "Raindrop",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0.5C9.8 3.4 3 10.5 3 16c0 5 4 8 9 8s9-3 9-8c0-5.5-6.8-12.6-9-15.5z"/>
        </svg>
      ),
      color: "text-blue-500"
    },
    {
      name: "Pocket",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.84 2H5.16C3.42 2 2 3.42 2 5.16v8.84c0 5.53 4.47 10 10 10s10-4.47 10-10V5.16C22 3.42 20.58 2 18.84 2zM12 16.5l-5.5-5.5 1.41-1.41L12 13.67l4.09-4.08L17.5 11 12 16.5z"/>
        </svg>
      ),
      color: "text-red-500"
    },
    {
      name: "Google Drive",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.01 1.485c-.276 0-.532.074-.756.202L4.58 5.927a1.501 1.501 0 0 0-.756 1.302v9.542c0 .537.287 1.033.756 1.302l6.674 4.24c.224.128.48.202.756.202.276 0 .532-.074.756-.202l6.674-4.24c.469-.269.756-.765.756-1.302V7.229c0-.537-.287-1.033-.756-1.302L12.766 1.687c-.224-.128-.48-.202-.756-.202z"/>
        </svg>
      ),
      color: "text-yellow-500"
    },
    {
      name: "Instapaper",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.766 20.259c0 1.819.271 2.089 2.934 2.089 2.934 0 2.934-1.275 2.934-2.934V3.586c0-1.659 0-2.934-2.934-2.934-2.663 0-2.934.27-2.934 2.089v16.518zM3.3 20.259c0 1.819.271 2.089 2.934 2.089 2.934 0 2.934-1.275 2.934-2.934V3.586c0-1.659 0-2.934-2.934-2.934C3.571.652 3.3.922 3.3 2.741v17.518z"/>
        </svg>
      ),
      color: "text-gray-800 dark:text-gray-400"
    },
    {
      name: "OneNote",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.84 2.16H7.92c-.6 0-1.08.48-1.08 1.08v17.52c0 .6.48 1.08 1.08 1.08h13.92c.6 0 1.08-.48 1.08-1.08V3.24c0-.6-.48-1.08-1.08-1.08z"/>
          <path d="M2.16 6H6v12H2.16V6z" fill="currentColor"/>
        </svg>
      ),
      color: "text-purple-600"
    },
    {
      name: "Hatena Bookmark",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 2h18c.55 0 1 .45 1 1v18c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1zm9 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm2-6V6h-4v6h4z"/>
        </svg>
      ),
      color: "text-blue-600"
    },
    {
      name: "Dropbox",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2L12 6L6 10L0 6L6 2ZM18 2L24 6L18 10L12 6L18 2ZM0 14L6 18L12 14L6 10L0 14ZM12 14L18 18L24 14L18 10L12 14ZM6 20L12 16L18 20L12 24L6 20Z"/>
        </svg>
      ),
      color: "text-blue-500"
    }
  ];

  const handleShareClick = (option) => {
    console.log(`Partager vers ${option.name}`);
    setShowMoreOptions(false);
    // Ici vous pouvez ajouter la logique de partage spécifique à chaque service
  };

  return (
    <div className="flex items-center gap-2 border-l border-gray-300 dark:border-gray-600 pl-3">
      <button 
        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" 
        title="Partager sur Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </button>
      
      <button 
        className="p-2 rounded-lg text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" 
        title="Partager sur Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
      
      <button 
        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
        title="Partager par email"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
      
      {/* Menu des options supplémentaires */}
      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {showMoreOptions && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
            {/* Header du menu */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Options de partage</h3>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Grille d'options */}
            <div className="p-4">
              <div className="grid grid-cols-4 gap-3">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleShareClick(option)}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className={`${option.color} mb-2 group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
                      {option.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;