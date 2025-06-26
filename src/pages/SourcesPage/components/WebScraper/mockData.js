// src/pages/SourcesPage/components/WebScraper/mockData.js

export const mockScrapedData = [
  {
    id: 1,
    title: "Les nouvelles technologies révolutionnent l'industrie automobile",
    description: "Une analyse approfondie des innovations technologiques qui transforment le secteur automobile, des véhicules électriques à la conduite autonome.",
    content: "L'industrie automobile traverse une période de transformation majeure...",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    url: "https://techcrunch.com/2024/auto-tech-revolution",
    scrapedAt: new Date(Date.now() - 2 * 3600000), // 2h ago
    publishedAt: new Date(Date.now() - 4 * 3600000), // 4h ago
    author: "Sarah Chen",
    category: "technology",
    tags: ["technologie", "automobile", "innovation", "électrique"],
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=300&fit=crop",
    engagement: { views: 15420, shares: 892, comments: 234 },
    isRead: false,
    isFavorite: false,
    isBookmarked: true,
    scrapingMetadata: {
      selector: "article.main-content",
      confidence: 0.95,
      extractedElements: ["title", "description", "author", "publishDate", "content"]
    }
  },
  {
    id: 2,
    title: "Marché financier : Analyse des tendances Q4 2024",
    description: "Les experts analysent les performances des marchés financiers et prévoient les tendances pour le dernier trimestre 2024.",
    content: "Les marchés financiers mondiaux montrent des signes de...",
    source: "Bloomberg",
    sourceUrl: "https://bloomberg.com",
    url: "https://bloomberg.com/2024/q4-market-analysis",
    scrapedAt: new Date(Date.now() - 1 * 3600000), // 1h ago
    publishedAt: new Date(Date.now() - 3 * 3600000), // 3h ago
    author: "Michael Rodriguez",
    category: "business",
    tags: ["finance", "marché", "économie", "investissement"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
    engagement: { views: 28760, shares: 1520, comments: 567 },
    isRead: true,
    isFavorite: true,
    isBookmarked: false,
    scrapingMetadata: {
      selector: "div.article-body",
      confidence: 0.88,
      extractedElements: ["title", "description", "author", "publishDate"]
    }
  },
  {
    id: 3,
    title: "Intelligence Artificielle : Les dernières avancées en 2024",
    description: "Découvrez les innovations les plus marquantes en IA cette année, des modèles de langage aux applications pratiques.",
    content: "L'année 2024 a été exceptionnelle pour l'intelligence artificielle...",
    source: "Wired",
    sourceUrl: "https://wired.com",
    url: "https://wired.com/2024/ai-advances-2024",
    scrapedAt: new Date(Date.now() - 30 * 60000), // 30min ago
    publishedAt: new Date(Date.now() - 2 * 3600000), // 2h ago
    author: "Dr. Lisa Park",
    category: "technology",
    tags: ["IA", "intelligence artificielle", "machine learning", "innovation"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    engagement: { views: 45320, shares: 2890, comments: 1205 },
    isRead: false,
    isFavorite: false,
    isBookmarked: true,
    scrapingMetadata: {
      selector: "main.content",
      confidence: 0.92,
      extractedElements: ["title", "description", "author", "publishDate", "content", "tags"]
    }
  },
  {
    id: 4,
    title: "Actualités sportives : Résultats des championnats européens",
    description: "Résumé complet des performances et résultats des championnats européens de football qui se sont déroulés ce week-end.",
    content: "Les championnats européens ont livré des matchs spectaculaires...",
    source: "ESPN",
    sourceUrl: "https://espn.com",
    url: "https://espn.com/2024/european-championships-results",
    scrapedAt: new Date(Date.now() - 45 * 60000), // 45min ago
    publishedAt: new Date(Date.now() - 6 * 3600000), // 6h ago
    author: "James Wilson",
    category: "sports",
    tags: ["football", "sport", "championnat", "Europe"],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop",
    engagement: { views: 32100, shares: 1840, comments: 892 },
    isRead: true,
    isFavorite: false,
    isBookmarked: false,
    scrapingMetadata: {
      selector: "article.sports-content",
      confidence: 0.90,
      extractedElements: ["title", "description", "author", "publishDate", "content"]
    }
  },
  {
    id: 5,
    title: "Tendances lifestyle : Bien-être et santé mentale en 2024",
    description: "Les nouvelles approches du bien-être et de la santé mentale qui gagnent en popularité cette année.",
    content: "Le bien-être mental est devenu une priorité absolue...",
    source: "Vogue",
    sourceUrl: "https://vogue.com",
    url: "https://vogue.com/2024/wellness-mental-health-trends",
    scrapedAt: new Date(Date.now() - 3 * 3600000), // 3h ago
    publishedAt: new Date(Date.now() - 8 * 3600000), // 8h ago
    author: "Emma Thompson",
    category: "lifestyle",
    tags: ["bien-être", "santé mentale", "lifestyle", "tendances"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop",
    engagement: { views: 19850, shares: 756, comments: 334 },
    isRead: false,
    isFavorite: true,
    isBookmarked: true,
    scrapingMetadata: {
      selector: "div.article-wrapper",
      confidence: 0.87,
      extractedElements: ["title", "description", "author", "publishDate"]
    }
  },
  {
    id: 6,
    title: "Gaming : Les jeux les plus attendus de fin 2024",
    description: "Preview des sorties gaming les plus prometteuses pour la fin d'année, des AAA aux indies les plus créatifs.",
    content: "La fin 2024 s'annonce exceptionnelle pour les gamers...",
    source: "IGN",
    sourceUrl: "https://ign.com",
    url: "https://ign.com/2024/most-anticipated-games-end-2024",
    scrapedAt: new Date(Date.now() - 4 * 3600000), // 4h ago
    publishedAt: new Date(Date.now() - 10 * 3600000), // 10h ago
    author: "Alex Rodriguez",
    category: "gaming",
    tags: ["gaming", "jeux vidéo", "sorties", "preview"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=300&fit=crop",
    engagement: { views: 41200, shares: 2100, comments: 1890 },
    isRead: false,
    isFavorite: false,
    isBookmarked: false,
    scrapingMetadata: {
      selector: "article.game-article",
      confidence: 0.94,
      extractedElements: ["title", "description", "author", "publishDate", "content", "tags"]
    }
  },
  {
    id: 7,
    title: "Éducation numérique : L'avenir de l'apprentissage en ligne",
    description: "Comment les plateformes d'apprentissage en ligne transforment l'éducation et rendent le savoir plus accessible.",
    content: "L'éducation numérique connaît une révolution sans précédent...",
    source: "EdTech Hub",
    sourceUrl: "https://edtechhub.org",
    url: "https://edtechhub.org/2024/future-online-learning",
    scrapedAt: new Date(Date.now() - 5 * 3600000), // 5h ago
    publishedAt: new Date(Date.now() - 12 * 3600000), // 12h ago
    author: "Dr. Maria Gonzalez",
    category: "education",
    tags: ["éducation", "e-learning", "numérique", "formation"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop",
    engagement: { views: 12800, shares: 445, comments: 178 },
    isRead: true,
    isFavorite: false,
    isBookmarked: true,
    scrapingMetadata: {
      selector: "main.post-content",
      confidence: 0.91,
      extractedElements: ["title", "description", "author", "publishDate", "content"]
    }
  },
  {
    id: 8,
    title: "Actualités monde : Sommet climatique COP29 - Les décisions clés",
    description: "Résumé des principales décisions et accords conclus lors du sommet climatique COP29 qui s'est tenu cette semaine.",
    content: "Le sommet climatique COP29 a abouti à des accords historiques...",
    source: "BBC News",
    sourceUrl: "https://bbc.com/news",
    url: "https://bbc.com/news/2024/cop29-key-decisions",
    scrapedAt: new Date(Date.now() - 6 * 3600000), // 6h ago
    publishedAt: new Date(Date.now() - 14 * 3600000), // 14h ago
    author: "David Mitchell",
    category: "news",
    tags: ["climat", "COP29", "environnement", "politique"],
    image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=600&h=300&fit=crop",
    engagement: { views: 67500, shares: 3420, comments: 2105 },
    isRead: false,
    isFavorite: true,
    isBookmarked: false,
    scrapingMetadata: {
      selector: "div.story-body",
      confidence: 0.96,
      extractedElements: ["title", "description", "author", "publishDate", "content", "tags"]
    }
  }
];