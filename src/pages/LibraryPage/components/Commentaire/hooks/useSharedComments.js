// pages/LibraryPage/components/Commentaire/hooks/useSharedComments.js
import { useState, useCallback, useEffect } from 'react';

// Données initiales fake
const INITIAL_COMMENTS = [
  {
    id: 1,
    articleId: 1,
    articleTitle: "L'Intelligence Artificielle révolutionne l'industrie pharmaceutique",
    author: "Marie Dupont",
    avatar: "https://ui-avatars.com/api/?name=Marie+Dupont&background=random",
    content: "Article très intéressant ! J'aimerais en savoir plus sur les implications éthiques de ces avancées en IA.",
    timestamp: "2025-06-13T10:30:00Z",
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: "Paul Martin",
        avatar: "https://ui-avatars.com/api/?name=Paul+Martin&background=random",
        content: "Excellente question Marie ! Les implications éthiques sont effectivement cruciales dans ce domaine.",
        timestamp: "2025-06-13T11:15:00Z",
        likes: 5,
        isLiked: true,
        parentId: 1
      }
    ]
  },
  {
    id: 2,
    articleId: 1,
    articleTitle: "L'Intelligence Artificielle révolutionne l'industrie pharmaceutique",
    author: "Thomas Chen",
    avatar: "https://ui-avatars.com/api/?name=Thomas+Chen&background=random",
    content: "Merci pour ce partage. Avez-vous des sources supplémentaires sur les études cliniques mentionnées ?",
    timestamp: "2025-06-13T09:15:00Z",
    likes: 8,
    isLiked: true,
    replies: []
  },
  {
    id: 3,
    articleId: 2,
    articleTitle: "Le télétravail transforme l'architecture urbaine",
    author: "Sophie Martin",
    avatar: "https://ui-avatars.com/api/?name=Sophie+Martin&background=random",
    content: "Je travaille dans ce domaine et je confirme que ces développements sont révolutionnaires.",
    timestamp: "2025-06-13T08:45:00Z",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 31,
        author: "Emma Wilson",
        avatar: "https://ui-avatars.com/api/?name=Emma+Wilson&background=random",
        content: "Sophie, pourriez-vous partager quelques exemples concrets de votre expérience ?",
        timestamp: "2025-06-13T12:00:00Z",
        likes: 3,
        isLiked: false,
        parentId: 3
      },
      {
        id: 32,
        author: "Sophie Martin",
        avatar: "https://ui-avatars.com/api/?name=Sophie+Martin&background=random",
        content: "@Emma Wilson Bien sûr ! Par exemple, nous avons vu une amélioration de 300% dans la vitesse de découverte de nouveaux composés.",
        timestamp: "2025-06-13T12:30:00Z",
        likes: 7,
        isLiked: false,
        parentId: 3
      }
    ]
  },
  {
    id: 4,
    articleId: 3,
    articleTitle: "Breakthrough in Quantum Computing reaches new milestone",
    author: "David Wilson",
    avatar: "https://ui-avatars.com/api/?name=David+Wilson&background=random",
    content: "Fascinant ! Cette avancée va changer beaucoup de choses dans notre domaine.",
    timestamp: "2025-06-12T16:20:00Z",
    likes: 23,
    isLiked: false,
    replies: []
  }
];

// Utilisation d'un state global simple
let globalComments = [...INITIAL_COMMENTS];
let listeners = [];

// Fonction pour notifier tous les composants
const notifyListeners = () => {
  listeners.forEach(listener => listener([...globalComments]));
};

export const useSharedComments = () => {
  const [comments, setComments] = useState([...globalComments]);

  // Ajouter ce composant aux listeners
  useEffect(() => {
    listeners.push(setComments);
    
    // Cleanup
    return () => {
      listeners = listeners.filter(listener => listener !== setComments);
    };
  }, []);

  // Ajouter un nouveau commentaire
  const addComment = useCallback((articleId, articleTitle, content) => {
    console.log('🔥 Ajout commentaire:', { articleId, articleTitle, content });
    
    const newComment = {
      id: Date.now(),
      articleId: Number(articleId), // S'assurer que c'est un nombre
      articleTitle: articleTitle || "Article sans titre",
      author: "Vous",
      avatar: "https://ui-avatars.com/api/?name=Vous&background=6366f1",
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    globalComments = [newComment, ...globalComments];
    console.log('✅ Nouveau commentaire ajouté:', newComment);
    console.log('📚 Tous les commentaires:', globalComments);
    
    notifyListeners();
    return newComment;
  }, []);

  // Ajouter une réponse à un commentaire
  const addReply = useCallback((commentId, content) => {
    const reply = {
      id: Date.now(),
      author: "Vous",
      avatar: "https://ui-avatars.com/api/?name=Vous&background=6366f1",
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      parentId: commentId
    };

    globalComments = globalComments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    });

    notifyListeners();
    return reply;
  }, []);

  // Liker/déliker un commentaire ou une réponse
  const toggleLike = useCallback((commentId, parentId = null) => {
    globalComments = globalComments.map(comment => {
      if (parentId && comment.id === parentId) {
        // Liker une réponse
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                isLiked: !reply.isLiked,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      } else if (comment.id === commentId) {
        // Liker un commentaire principal
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    });

    notifyListeners();
  }, []);

  // Obtenir les commentaires pour un article spécifique
  const getCommentsForArticle = useCallback((articleId) => {
    if (!articleId) return [];
    
    const numericArticleId = Number(articleId);
    console.log('🔍 Recherche commentaires pour article ID:', numericArticleId);
    
    const filtered = globalComments.filter(comment => {
      const commentArticleId = Number(comment.articleId);
      return commentArticleId === numericArticleId;
    });
    
    console.log('📋 Commentaires trouvés pour cet article:', filtered);
    return filtered;
  }, []);

  return {
    comments: globalComments,
    addComment,
    addReply,
    toggleLike,
    getCommentsForArticle
  };
};