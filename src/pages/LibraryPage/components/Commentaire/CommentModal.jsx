import React, { useState } from 'react';
import { useSharedComments } from './hooks/useSharedComments';

const ReplyForm = ({ onSubmit, onCancel, placeholder = "Écrivez votre réponse..." }) => {
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await onSubmit(replyText.trim());
    setReplyText('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
      <div className="flex gap-2">
        <img
          src="https://ui-avatars.com/api/?name=Vous&background=6366f1"
          alt="Votre avatar"
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={placeholder}
            className="w-full h-16 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {replyText.length}/300 caractères
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCancel}
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
      </div>
    </form>
  );
};

const ReplyItem = ({ reply, onLike }) => {
  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  return (
    <div className="flex gap-3 pl-6 border-l-2 border-gray-100 dark:border-gray-700">
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
            onClick={() => onLike(reply.id, reply.parentId)}
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
  );
};

const CommentItem = ({ comment, onLike, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  const handleReplySubmit = async (replyText) => {
    await onReply(comment.id, replyText);
    setShowReplyForm(false);
  };

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
      <div className="flex gap-3">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {comment.author}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimeAgo(comment.timestamp)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
            {comment.content}
          </p>
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-xs transition-colors ${
                comment.isLiked
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
              }`}
            >
              <svg className="w-4 h-4" fill={comment.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {comment.likes}
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Répondre
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                {showReplies ? 'Masquer' : 'Afficher'} {comment.replies.length} réponse{comment.replies.length > 1 ? 's' : ''}
              </button>
            )}
          </div>

          {/* Formulaire de réponse */}
          {showReplyForm && (
            <ReplyForm
              onSubmit={handleReplySubmit}
              onCancel={() => setShowReplyForm(false)}
              placeholder={`Répondre à ${comment.author}...`}
            />
          )}

          {/* Réponses */}
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  onLike={onLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentModal = ({ isOpen, onClose, article }) => {
  const { addComment, addReply, toggleLike, getCommentsForArticle } = useSharedComments();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !article) {
    return null;
  }

  // Obtenir les commentaires pour cet article spécifique
  const articleComments = getCommentsForArticle(article.id);
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      addComment(article.id, article.title, newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('❌ Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyToComment = async (commentId, replyText) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addReply(commentId, replyText);
        resolve();
      }, 300);
    });
  };

  const totalComments = articleComments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0);

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Commentaires ({totalComments})
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {article.title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Formulaire de commentaire */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=Vous&background=6366f1"
                  alt="Votre avatar"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Écrivez votre commentaire..."
                    className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {newComment.length}/500 caractères
                    </span>
                    <button
                      type="submit"
                      disabled={!newComment.trim() || isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Publication...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Publier
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Liste des commentaires */}
          <div className="flex-1 overflow-y-auto">
            {articleComments.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {articleComments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={toggleLike}
                    onReply={handleReplyToComment}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Aucun commentaire
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Soyez le premier à partager votre avis sur cet article !
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;