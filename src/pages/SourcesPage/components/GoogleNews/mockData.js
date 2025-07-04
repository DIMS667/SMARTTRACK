// src/pages/SourcesPage/components/GoogleNews/mockData.js

export const mockGoogleNews = [
  {
    id: 1,
    title: "Élections européennes 2024 : Taux de participation record en France",
    description: "Le taux de participation aux élections européennes atteint 52,3% en France, soit le plus haut niveau depuis 1994. Les premiers résultats montrent une progression des partis écologistes...",
    source: "Le Monde",
    sourceUrl: "https://lemonde.fr",
    sourceFavicon: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
    url: "https://lemonde.fr/elections-europeennes-2024",
    publishedAt: new Date(Date.now() - 1 * 3600000), // 1h ago
    category: "general",
    location: "fr",
    isBreaking: true,
    isVerified: true,
    isRead: false,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=300&fit=crop",
    engagement: { views: 15420, shares: 892, comments: 234 },
    tags: ["élections", "Europe", "France", "politique"]
  },
  {
    id: 2,
    title: "Euro 2024 : L'équipe de France qualifiée en demi-finales",
    description: "Après une victoire serrée 2-1 contre l'Espagne, l'équipe de France se qualifie pour les demi-finales de l'Euro 2024. Mbappé auteur du but décisif à la 89e minute...",
    source: "L'Équipe",
    sourceUrl: "https://lequipe.fr",
    sourceFavicon: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=32&h=32&fit=crop&crop=faces",
    url: "https://lequipe.fr/euro-2024-france-demies",
    publishedAt: new Date(Date.now() - 3 * 3600000), // 3h ago
    category: "sports",
    location: "eu",
    isBreaking: false,
    isVerified: true,
    isRead: true,
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop",
    engagement: { views: 28760, shares: 1520, comments: 567 },
    tags: ["football", "Euro 2024", "équipe de France", "Mbappé"]
  },
  {
    id: 3,
    title: "OpenAI annonce GPT-5 : Une révolution dans l'intelligence artificielle",
    description: "OpenAI dévoile GPT-5, son nouveau modèle d'IA générative qui promet des capacités de raisonnement avancées et une meilleure compréhension du contexte. Disponibilité prévue fin 2024...",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    sourceFavicon: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=faces",
    url: "https://techcrunch.com/openai-gpt5-announcement",
    publishedAt: new Date(Date.now() - 5 * 3600000), // 5h ago
    category: "technology",
    location: "us",
    isBreaking: true,
    isVerified: true,
    isRead: false,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    engagement: { views: 45320, shares: 2890, comments: 1205 },
    tags: ["OpenAI", "GPT-5", "intelligence artificielle", "technologie"]
  },
  {
    id: 4,
    title: "Nouveau vaccin contre le cancer : Essais cliniques prometteurs",
    description: "Un nouveau vaccin thérapeutique contre le cancer du sein développé par l'Institut Curie montre des résultats encourageants. 78% de réduction du risque de récidive observée...",
    source: "Le Figaro Santé",
    sourceUrl: "https://sante.lefigaro.fr",
    sourceFavicon: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=32&h=32&fit=crop&crop=faces",
    url: "https://sante.lefigaro.fr/vaccin-cancer-essais-cliniques",
    publishedAt: new Date(Date.now() - 8 * 3600000), // 8h ago
    category: "health",
    location: "fr",
    isBreaking: false,
    isVerified: true,
    isRead: false,
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop",
    engagement: { views: 12580, shares: 456, comments: 189 },
    tags: ["cancer", "vaccin", "Institut Curie", "santé"]
  },
  {
    id: 5,
    title: "BCE : Nouvelle baisse des taux d'intérêt de 0,25 points",
    description: "La Banque centrale européenne abaisse ses taux directeurs pour stimuler l'économie de la zone euro. Cette décision fait suite aux signes de ralentissement économique...",
    source: "Les Échos",
    sourceUrl: "https://lesechos.fr",
    sourceFavicon: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=32&h=32&fit=crop&crop=faces",
    url: "https://lesechos.fr/bce-baisse-taux-interet",
    publishedAt: new Date(Date.now() - 6 * 3600000), // 6h ago
    category: "business",
    location: "eu",
    isBreaking: false,
    isVerified: true,
    isRead: true,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
    engagement: { views: 8940, shares: 234, comments: 78 },
    tags: ["BCE", "taux d'intérêt", "économie", "zone euro"]
  },
  {
    id: 6,
    title: "Festival de Cannes 2024 : Palme d'Or pour le film 'Anora'",
    description: "Le film 'Anora' de Sean Baker remporte la Palme d'Or du 77e Festival de Cannes. Cette comédie dramatique américaine a conquis le jury présidé par Greta Gerwig...",
    source: "Variety France",
    sourceUrl: "https://variety.fr",
    sourceFavicon: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=32&h=32&fit=crop&crop=faces",
    url: "https://variety.fr/cannes-2024-palme-or-anora",
    publishedAt: new Date(Date.now() - 12 * 3600000), // 12h ago
    category: "entertainment",
    location: "fr",
    isBreaking: false,
    isVerified: true,
    isRead: false,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=300&fit=crop",
    engagement: { views: 7650, shares: 298, comments: 145 },
    tags: ["Cannes", "Palme d'Or", "cinéma", "Sean Baker"]
  },
  {
    id: 7,
    title: "Découverte d'eau liquide sur Mars par le rover Perseverance",
    description: "La NASA annonce la découverte de traces d'eau liquide souterraine sur Mars grâce aux analyses du rover Perseverance. Cette découverte relance l'espoir de trouver de la vie...",
    source: "Science et Avenir",
    sourceUrl: "https://sciencesetavenir.fr",
    sourceFavicon: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=32&h=32&fit=crop&crop=faces",
    url: "https://sciencesetavenir.fr/mars-eau-liquide-perseverance",
    publishedAt: new Date(Date.now() - 10 * 3600000), // 10h ago
    category: "science",
    location: "us",
    isBreaking: true,
    isVerified: true,
    isRead: false,
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=300&fit=crop",
    engagement: { views: 34200, shares: 1840, comments: 892 },
    tags: ["Mars", "NASA", "Perseverance", "eau", "espace"]
  },
  {
    id: 8,
    title: "Cyberattaque majeure : Plusieurs hôpitaux français touchés",
    description: "Une cyberattaque par ransomware frappe une quinzaine d'hôpitaux en France. Les systèmes informatiques sont perturbés mais les soins d'urgence sont maintenus...",
    source: "France Info",
    sourceUrl: "https://franceinfo.fr",
    sourceFavicon: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=32&h=32&fit=crop&crop=faces",
    url: "https://franceinfo.fr/cyberattaque-hopitaux-france",
    publishedAt: new Date(Date.now() - 4 * 3600000), // 4h ago
    category: "general",
    location: "fr",
    isBreaking: true,
    isVerified: true,
    isRead: true,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop",
    engagement: { views: 19870, shares: 654, comments: 287 },
    tags: ["cyberattaque", "hôpitaux", "ransomware", "sécurité"]
  }
];