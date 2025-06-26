// src/pages/CanauxPage/data/mockData.js

export const expertises = [
  { id: 'all', name: 'Toutes', count: 89 },
  { id: 'ia', name: 'Intelligence Artificielle', count: 24 },
  { id: 'fintech', name: 'FinTech', count: 18 },
  { id: 'cybersec', name: 'Cybersécurité', count: 15 },
  { id: 'blockchain', name: 'Blockchain', count: 12 },
  { id: 'iot', name: 'IoT', count: 8 },
  { id: 'greentech', name: 'Green Tech', count: 7 },
  { id: 'digital', name: 'Transformation Digitale', count: 5 }
];

export const followedUsers = [
  {
    id: 1,
    name: 'Dr. Alice Chen',
    role: 'Directrice IA - Google',
    avatar: null,
    expertise: ['ia', 'digital'],
    followers: 12400,
    posts: 156,
    lastActivity: '2h',
    isVerified: true,
    recentPost: {
      type: 'article',
      title: 'L\'évolution des LLMs en 2025',
      engagement: 245
    }
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'Expert Cybersécurité - ANSSI',
    avatar: null,
    expertise: ['cybersec'],
    followers: 8900,
    posts: 203,
    lastActivity: '4h',
    isVerified: true,
    recentPost: {
      type: 'discussion',
      title: 'Nouvelles menaces APT en Europe',
      engagement: 89
    }
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'CEO - FinTech Startup',
    avatar: null,
    expertise: ['fintech', 'blockchain'],
    followers: 15600,
    posts: 98,
    lastActivity: '1j',
    isVerified: false,
    recentPost: {
      type: 'article',
      title: 'DeFi vs TradFi : où va l\'innovation ?',
      engagement: 167
    }
  },
  {
    id: 4,
    name: 'Dr. Thomas Weber',
    role: 'Chercheur IoT - MIT',
    avatar: null,
    expertise: ['iot', 'digital'],
    followers: 6700,
    posts: 145,
    lastActivity: '3j',
    isVerified: true,
    recentPost: {
      type: 'collection',
      title: 'IoT & Edge Computing 2025',
      engagement: 78
    }
  }
];

export const suggestedFollows = [
  {
    id: 5,
    name: 'Emma Martinez',
    role: 'Head of Innovation - Tesla',
    avatar: null,
    expertise: ['greentech', 'ia'],
    followers: 23400,
    posts: 87,
    reason: 'Basé sur votre intérêt pour Green Tech',
    mutualConnections: ['Dr. Alice Chen', 'Thomas Weber'],
    recentHighlight: 'A publié 3 articles sur l\'IA dans l\'automobile cette semaine'
  },
  {
    id: 6,
    name: 'Alex Kim',
    role: 'Security Architect - Microsoft',
    avatar: null,
    expertise: ['cybersec', 'ia'],
    followers: 11200,
    posts: 134,
    reason: 'Suivi par Marc Dubois que vous suivez',
    mutualConnections: ['Marc Dubois'],
    recentHighlight: 'Expert en sécurité IA avec 15 ans d\'expérience'
  },
  {
    id: 7,
    name: 'Lisa Patel',
    role: 'Blockchain Lead - ConsenSys',
    avatar: null,
    expertise: ['blockchain', 'fintech'],
    followers: 18900,
    posts: 92,
    reason: 'Expertise similaire à Sarah Johnson',
    mutualConnections: ['Sarah Johnson'],
    recentHighlight: 'Vient de lancer une série sur les CBDCs'
  }
];

export const socialFeed = [
  {
    id: 1,
    type: 'article_share',
    user: {
      name: 'Alice Martin',
      role: 'Analyste Tech',
      avatar: null,
      isFollowing: false,
      followers: 142
    },
    article: {
      title: 'L\'IA générative transforme la veille stratégique',
      source: 'TechCrunch',
      url: 'https://techcrunch.com/ai-strategic-intelligence',
      excerpt: 'Les entreprises utilisent de plus en plus l\'IA pour automatiser leur veille concurrentielle et identifier les tendances émergentes...',
      image: null,
      readTime: '4 min',
      publishedAt: '2h'
    },
    comment: 'Excellent article sur l\'impact de l\'IA dans notre domaine. Les cas d\'usage présentés sont très concrets 🚀',
    timestamp: '2h',
    stats: {
      likes: 12,
      comments: 5,
      shares: 3,
      views: 89
    },
    tags: ['IA', 'Veille', 'Innovation'],
    isLiked: false,
    isBookmarked: true
  },
  {
    id: 2,
    type: 'discussion',
    user: {
      name: 'Jean Dupont',
      role: 'Directeur Innovation',
      avatar: null,
      isFollowing: true,
      followers: 267
    },
    content: 'Quels sont vos outils favoris pour la veille technologique ? Je cherche à optimiser notre workflow d\'équipe.',
    timestamp: '4h',
    stats: {
      likes: 8,
      comments: 12,
      shares: 2,
      views: 145
    },
    tags: ['Outils', 'Workflow', 'Équipe'],
    isLiked: true,
    isBookmarked: false,
    responses: [
      {
        user: 'Sophie Chen',
        content: 'Nous utilisons Feedly + Slack pour la diffusion',
        timestamp: '3h'
      },
      {
        user: 'Marc Rousseau', 
        content: 'SMARTTRACK semble être une excellente solution !',
        timestamp: '2h'
      }
    ]
  },
  {
    id: 3,
    type: 'curation',
    user: {
      name: 'Équipe Recherche',
      role: 'Collection collaborative',
      avatar: null,
      isFollowing: false,
      followers: 89
    },
    collection: {
      title: 'Tendances IA 2025',
      description: 'Articles et ressources sur l\'intelligence artificielle',
      articlesCount: 24,
      contributors: ['Alice', 'Jean', 'Sophie', '+5']
    },
    latestArticle: {
      title: 'GPT-5 : les nouvelles capacités révélées',
      source: 'AI News',
      addedBy: 'Sophie Chen'
    },
    timestamp: '1j',
    stats: {
      likes: 15,
      comments: 3,
      shares: 8,
      views: 234
    },
    isLiked: false,
    isBookmarked: true
  }
];

export const suggestedUsers = [
  {
    name: 'Dr. Marie Leclerc',
    role: 'Experte FinTech',
    followers: 1203,
    posts: 156,
    expertise: ['Finance', 'Blockchain', 'RegTech'],
    isFollowing: false
  },
  {
    name: 'Thomas Weber',
    role: 'Consultant Digital',
    followers: 892,
    posts: 203,
    expertise: ['Transformation', 'IoT', 'Industry 4.0'],
    isFollowing: false
  }
];

export const popularCollections = [
  {
    name: 'Cybersécurité 2025',
    contributors: 12,
    articles: 45,
    trend: '+15%'
  },
  {
    name: 'Green Tech',
    contributors: 8,
    articles: 32,
    trend: '+8%'
  },
  {
    name: 'Future of Work',
    contributors: 15,
    articles: 67,
    trend: '+22%'
  }
];

export const collections = [
  {
    id: 1,
    title: 'Intelligence Artificielle 2025',
    description: 'Dernières avancées et tendances en IA',
    articlesCount: 42,
    contributors: ['Alice Chen', 'Marc Dubois', 'Sophie Laurent', '+8'],
    category: 'IA',
    isPublic: true,
    isFollowing: true,
    lastUpdated: '2h',
    tags: ['IA', 'Machine Learning', 'LLM'],
    stats: {
      views: 1250,
      likes: 89,
      shares: 23
    }
  },
  {
    id: 2,
    title: 'Cybersécurité Enterprise',
    description: 'Ressources pour la sécurité en entreprise',
    articlesCount: 35,
    contributors: ['Marc Dubois', 'Alex Kim', '+5'],
    category: 'Cybersécurité',
    isPublic: false,
    isFollowing: false,
    lastUpdated: '1j',
    tags: ['Cybersécurité', 'Enterprise', 'ANSSI'],
    stats: {
      views: 892,
      likes: 67,
      shares: 15
    }
  }
];

export const trendingTopics = [
  {
    id: 1,
    topic: 'GPT-5',
    mentions: 1250,
    growth: '+45%',
    articles: 89,
    category: 'IA'
  },
  {
    id: 2,
    topic: 'Quantum Computing',
    mentions: 890,
    growth: '+23%',
    articles: 67,
    category: 'Tech'
  },
  {
    id: 3,
    topic: 'Green Finance',
    mentions: 745,
    growth: '+67%',
    articles: 123,
    category: 'FinTech'
  }
];

export const userStats = {
  articlesShared: 24,
  followers: 156,
  following: 89,
  collections: 12,
  totalViews: 2340,
  totalLikes: 456
};

export const recentActivity = [
  {
    id: 1,
    type: 'article_share',
    user: 'Dr. Alice Chen',
    action: 'a partagé un article',
    timestamp: '2h',
    icon: 'MessageSquare',
    color: 'green'
  },
  {
    id: 2,
    type: 'discussion_join',
    user: 'Marc Dubois',
    action: 'a rejoint une discussion',
    timestamp: '4h',
    icon: 'Users',
    color: 'blue'
  },
  {
    id: 3,
    type: 'collection_create',
    user: 'Sarah Johnson',
    action: 'a créé une collection',
    timestamp: '1j',
    icon: 'Bookmark',
    color: 'purple'
  }
];