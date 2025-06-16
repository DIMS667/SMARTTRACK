import { useState } from 'react';

// Données fictives pour les flux
const FAKE_FEEDS_DATA = [
  {
    id: 1,
    name: "TechCrunch",
    description: "Technology news and insights",
    logo: "https://ui-avatars.com/api/?name=TechCrunch&background=ff6b35&color=ffffff",
    color: "#ff6b35",
    unreadCount: 12,
    totalArticles: 45
  },
  {
    id: 2,
    name: "Le Monde",
    description: "Actualités françaises et internationales",
    logo: "https://ui-avatars.com/api/?name=Le+Monde&background=1e3a8a&color=ffffff",
    color: "#1e3a8a",
    unreadCount: 8,
    totalArticles: 32
  },
  {
    id: 3,
    name: "Nature",
    description: "Scientific research and discoveries",
    logo: "https://ui-avatars.com/api/?name=Nature&background=059669&color=ffffff",
    color: "#059669",
    unreadCount: 5,
    totalArticles: 18
  },
  {
    id: 4,
    name: "Les Échos",
    description: "Économie et business",
    logo: "https://ui-avatars.com/api/?name=Les+Echos&background=dc2626&color=ffffff",
    color: "#dc2626",
    unreadCount: 3,
    totalArticles: 25
  }
];

export const useFeeds = () => {
  const [feeds] = useState(FAKE_FEEDS_DATA);
  const [showFeedsPanel, setShowFeedsPanel] = useState(true);

  const toggleFeedsPanel = () => setShowFeedsPanel(!showFeedsPanel);
  const closeSidebar = () => setShowFeedsPanel(false);
  const openSidebar = () => setShowFeedsPanel(true);

  return {
    feeds,
    showFeedsPanel,
    toggleFeedsPanel,
    closeSidebar,
    openSidebar
  };
};