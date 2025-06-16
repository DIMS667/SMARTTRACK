import React, { useState } from 'react';
import { useSharedComments } from './hooks/useSharedComments';

const CommentCard = ({ comment, onLike, onReply }) => {
  const [showReplies, setShowReplies] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await onReply(comment.id, replyText.trim());
    setReplyText('');
    setIsSubmitting(false);
    setShowReplyForm(false);
  };

  const totalReplies = comment.replies?.length || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      {/* Header du commentaire */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {comment.author}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatTimeAgo(comment.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            Sur l'article : "{comment.articleTitle}"
          </p>
        </div>
      </div>

      {/* Contenu du commentaire */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {comment.content}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onLike(comment.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              comment.isLiked
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'
            }`}
          >
            <svg className="w-4 h-4" fill={comment.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">{comment.likes}</span>
          </button>

          <button 
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span className="text-sm">Répondre</span>
          </button>

          {totalReplies > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              {showReplies ? 'Masquer' : 'Afficher'} {totalReplies} réponse{totalReplies > 1 ? 's' : ''}
            </button>
          )}
        </div>

        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      {/* Formulaire de réponse */}
      {showReplyForm && (
        <div className="mb-4 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
          <form onSubmit={handleReplySubmit} className="flex gap-3">
            <img
              src="https://ui-avatars.com/api/?name=Vous&background=6366f1"
              alt="Votre avatar"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Répondre à ${comment.author}...`}
                className="w-full h-16 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {replyText.length}/300 caractères
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReplyForm(false);
                      setReplyText('');
                    }}
                    className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSubmitting}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                        Envoi...
                      </>
                    ) : (
                      'Répondre'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Réponses */}
      {showReplies && totalReplies > 0 && (
        <div className="space-y-3 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <img
                src={reply.avatar}
                alt={reply.author}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                    {reply.author}
                  </h5>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(reply.timestamp)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
                  {reply.content}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onLike(reply.id, comment.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      reply.isLiked
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <svg className="w-3 h-3" fill={reply.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {reply.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommentairePage = () => {
  const { comments, addReply, toggleLike } = useSharedComments();
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const handleLikeComment = (commentId, parentId = null) => {
    toggleLike(commentId, parentId);
  };

  const handleReplyToComment = async (commentId, replyText) => {
    // Simuler un délai d'API
    return new Promise((resolve) => {
      setTimeout(() => {
        addReply(commentId, replyText);
        resolve();
      }, 300);
    });
  };

  // Filtrer et trier les commentaires
  const filteredAndSortedComments = comments
    .filter(comment => {
      if (filterBy === 'liked') return comment.isLiked;
      if (filterBy === 'mine') return comment.author === 'Vous'; // Dans un vrai app, comparer avec l'utilisateur connecté
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.timestamp) - new Date(a.timestamp);
      if (sortBy === 'popular') return b.likes - a.likes;
      return a.author.localeCompare(b.author);
    });

  const totalLikes = comments.reduce((sum, comment) => {
    const commentLikes = comment.likes;
    const repliesLikes = (comment.replies || []).reduce((replySum, reply) => replySum + reply.likes, 0);
    return sum + commentLikes + repliesLikes;
  }, 0);
  
  const totalComments = comments.reduce((sum, comment) => sum + 1 + (comment.replies?.length || 0), 0);
  const myComments = comments.filter(comment => comment.author === 'Vous').length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Commentaires</h1>
            <p className="text-gray-600 dark:text-gray-400">Gérez et consultez tous les commentaires</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalComments}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Commentaires</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{totalLikes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Likes total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{myComments}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Mes commentaires</div>
          </div>
        </div>

        {/* Filtres et tri */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterBy('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterBy === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterBy('liked')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterBy === 'liked'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Aimés
            </button>
            <button
              onClick={() => setFilterBy('mine')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterBy === 'mine'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Mes commentaires
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Plus récents</option>
            <option value="popular">Plus populaires</option>
            <option value="author">Par auteur</option>
          </select>
        </div>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-6">
        {filteredAndSortedComments.length > 0 ? (
          filteredAndSortedComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onLike={handleLikeComment}
              onReply={handleReplyToComment}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Aucun commentaire trouvé
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filterBy === 'mine' 
                ? "Vous n'avez pas encore écrit de commentaires."
                : filterBy === 'liked'
                ? "Vous n'avez pas encore aimé de commentaires."
                : "Aucun commentaire disponible."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentairePage;