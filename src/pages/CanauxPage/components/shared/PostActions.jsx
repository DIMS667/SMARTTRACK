// src/pages/CanauxPage/components/shared/PostActions.jsx
import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

const PostActions = ({ 
  stats, 
  isLiked, 
  isBookmarked, 
  onLike, 
  onShare, 
  onBookmark, 
  postId 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <button
          onClick={() => onLike(postId)}
          className={`flex items-center space-x-2 text-sm transition-colors ${
            isLiked
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{stats.likes}</span>
        </button>
        <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span>{stats.comments}</span>
        </button>
        <button
          onClick={() => onShare(postId)}
          className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          <span>{stats.shares}</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {stats.views} vues
        </span>
        <button
          onClick={() => onBookmark(postId)}
          className={`p-1 rounded transition-colors ${
            isBookmarked
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default PostActions;