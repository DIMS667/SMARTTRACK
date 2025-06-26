// src/context/FluxContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FluxContext = createContext();

// Données initiales des flux RSS
const initialFluxData = [
  {
    id: 1,
    title: "TechCrunch",
    description: "Latest technology news and startup information",
    url: "https://techcrunch.com/feed/",
    siteUrl: "https://techcrunch.com",
    category: "Tech",
    tags: ["technology", "startup"],
    isActive: true,
    status: "active",
    lastSync: new Date(Date.now() - 3600000), // 1h ago
    lastError: null,
    unreadCount: 12,
    totalArticles: 156,
    favicon: "https://techcrunch.com/favicon.ico",
    syncInterval: 3600000,
    isPinned: true // Épinglé dans QuickActions
  },
  {
    id: 2,
    title: "Hacker News",
    description: "News for hackers, makers and entrepreneurs",
    url: "https://hnrss.org/frontpage",
    siteUrl: "https://news.ycombinator.com",
    category: "Tech",
    tags: ["programming", "startup"],
    isActive: true,
    status: "active",
    lastSync: new Date(Date.now() - 1800000), // 30min ago
    lastError: null,
    unreadCount: 8,
    totalArticles: 89,
    favicon: "https://news.ycombinator.com/favicon.ico",
    syncInterval: 1800000,
    isPinned: true
  },
  {
    id: 3,
    title: "MIT Technology Review",
    description: "In-depth analysis of emerging technologies",
    url: "https://www.technologyreview.com/feed/",
    siteUrl: "https://www.technologyreview.com",
    category: "Science",
    tags: ["research", "innovation"],
    isActive: false,
    status: "paused",
    lastSync: new Date(Date.now() - 86400000), // 1 day ago
    lastError: null,
    unreadCount: 0,
    totalArticles: 45,
    favicon: "https://www.technologyreview.com/favicon.ico",
    syncInterval: 7200000,
    isPinned: false
  },
  {
    id: 4,
    title: "The Verge",
    description: "Technology, science, art, and culture",
    url: "https://www.theverge.com/rss/index.xml",
    siteUrl: "https://www.theverge.com",
    category: "Tech",
    tags: ["technology", "culture"],
    isActive: true,
    status: "error",
    lastSync: new Date(Date.now() - 7200000), // 2h ago
    lastError: "Feed temporarily unavailable (503)",
    unreadCount: 4,
    totalArticles: 234,
    favicon: "https://www.theverge.com/favicon.ico",
    syncInterval: 3600000,
    isPinned: false
  }
];

const categories = [
  { id: 'tech', name: 'Tech', color: 'blue', fluxCount: 3 },
  { id: 'science', name: 'Science', color: 'green', fluxCount: 1 },
  { id: 'news', name: 'News', color: 'red', fluxCount: 0 },
  { id: 'business', name: 'Business', color: 'yellow', fluxCount: 0 },
  { id: 'culture', name: 'Culture', color: 'purple', fluxCount: 0 },
  { id: 'sport', name: 'Sport', color: 'indigo', fluxCount: 0 }
];

export function FluxProvider({ children }) {
  const [fluxData, setFluxData] = useState(initialFluxData);
  const [fluxCategories, setFluxCategories] = useState(categories);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les flux depuis le localStorage au démarrage
  useEffect(() => {
    const savedFlux = localStorage.getItem('smarttrack-flux');
    if (savedFlux) {
      try {
        const parsed = JSON.parse(savedFlux);
        setFluxData(parsed.map(flux => ({
          ...flux,
          lastSync: new Date(flux.lastSync)
        })));
      } catch (error) {
        console.error('Erreur lors du chargement des flux:', error);
      }
    }
  }, []);

  // Sauvegarder les flux dans le localStorage
  useEffect(() => {
    localStorage.setItem('smarttrack-flux', JSON.stringify(fluxData));
    // Recalculer les compteurs de catégories
    updateCategoryCounters();
  }, [fluxData]);

  const updateCategoryCounters = () => {
    const updatedCategories = fluxCategories.map(category => ({
      ...category,
      fluxCount: fluxData.filter(flux => 
        flux.category.toLowerCase() === category.name.toLowerCase()
      ).length
    }));
    setFluxCategories(updatedCategories);
  };

  // Statistiques calculées
  const getStats = () => {
    const totalFlux = fluxData.length;
    const activeFlux = fluxData.filter(flux => flux.isActive);
    const pinnedFlux = fluxData.filter(flux => flux.isPinned);
    const totalUnread = fluxData.reduce((sum, flux) => sum + flux.unreadCount, 0);
    const errorFlux = fluxData.filter(flux => flux.status === 'error');

    return {
      totalFlux,
      activeFlux: activeFlux.length,
      pinnedFlux,
      totalUnread,
      errorFlux: errorFlux.length
    };
  };

  // Créer un nouveau flux
  const createFlux = (fluxInfo) => {
    const newFlux = {
      id: Date.now(),
      ...fluxInfo,
      isActive: true,
      status: 'active',
      lastSync: new Date(),
      lastError: null,
      unreadCount: 0,
      totalArticles: 0,
      syncInterval: 3600000, // 1h par défaut
      isPinned: false
    };

    setFluxData(prev => [...prev, newFlux]);
    return newFlux;
  };

  // Mettre à jour un flux
  const updateFlux = (fluxId, updates) => {
    setFluxData(prev => 
      prev.map(flux => 
        flux.id === fluxId 
          ? { ...flux, ...updates }
          : flux
      )
    );
  };

  // Supprimer un flux
  const deleteFlux = (fluxId) => {
    setFluxData(prev => prev.filter(flux => flux.id !== fluxId));
  };

  // Épingler/Désépingler un flux
  const toggleFluxPin = (fluxId) => {
    setFluxData(prev => 
      prev.map(flux => 
        flux.id === fluxId 
          ? { ...flux, isPinned: !flux.isPinned }
          : flux
      )
    );
  };

  // Activer/Désactiver un flux
  const toggleFluxStatus = (fluxId) => {
    setFluxData(prev => 
      prev.map(flux => 
        flux.id === fluxId 
          ? { 
              ...flux, 
              isActive: !flux.isActive,
              status: !flux.isActive ? 'active' : 'paused'
            }
          : flux
      )
    );
  };

  // Synchroniser un flux
  const syncFlux = async (fluxId) => {
    setIsLoading(true);
    const flux = fluxData.find(f => f.id === fluxId);
    
    if (!flux) return;

    try {
      // Simulation de synchronisation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuler de nouveaux articles
      const newArticles = Math.floor(Math.random() * 5) + 1;
      
      updateFlux(fluxId, {
        lastSync: new Date(),
        unreadCount: flux.unreadCount + newArticles,
        totalArticles: flux.totalArticles + newArticles,
        status: 'active',
        lastError: null
      });
      
      console.log(`Flux ${flux.title} synchronisé: +${newArticles} nouveaux articles`);
    } catch (error) {
      updateFlux(fluxId, {
        status: 'error',
        lastError: 'Erreur de synchronisation'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Synchroniser tous les flux actifs
  const syncAllFlux = async () => {
    setIsLoading(true);
    const activeFluxIds = fluxData.filter(flux => flux.isActive).map(flux => flux.id);
    
    try {
      for (const fluxId of activeFluxIds) {
        await syncFlux(fluxId);
        // Petit délai entre chaque sync
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      console.log('Synchronisation complète terminée');
    } finally {
      setIsLoading(false);
    }
  };

  // Importer des flux depuis OPML
  const importFromOPML = (fluxList) => {
    const newFluxes = fluxList.map(flux => createFlux(flux));
    console.log(`${newFluxes.length} flux importés depuis OPML`);
    return newFluxes;
  };

  // Obtenir un flux par ID
  const getFluxById = (fluxId) => {
    return fluxData.find(flux => flux.id === parseInt(fluxId));
  };

  // Filtrer les flux
  const getFilteredFlux = (searchTerm = '', category = 'all', status = 'all') => {
    return fluxData.filter(flux => {
      const matchesSearch = flux.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           flux.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || flux.category === category;
      const matchesStatus = status === 'all' || 
                           (status === 'active' && flux.isActive) ||
                           (status === 'inactive' && !flux.isActive) ||
                           (status === 'error' && flux.status === 'error');
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const value = {
    // Données
    fluxData,
    fluxCategories,
    isLoading,
    
    // Statistiques
    getStats,
    
    // Actions CRUD
    createFlux,
    updateFlux,
    deleteFlux,
    getFluxById,
    getFilteredFlux,
    
    // Actions spécifiques
    toggleFluxPin,
    toggleFluxStatus,
    syncFlux,
    syncAllFlux,
    importFromOPML
  };

  return (
    <FluxContext.Provider value={value}>
      {children}
    </FluxContext.Provider>
  );
}

export function useFlux() {
  const context = useContext(FluxContext);
  if (!context) {
    throw new Error('useFlux must be used within a FluxProvider');
  }
  return context;
}

export default FluxProvider;