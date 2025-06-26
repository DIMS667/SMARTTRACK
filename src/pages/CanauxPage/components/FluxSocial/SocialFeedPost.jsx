// src/pages/CanauxPage/components/FluxSocial/SocialFeedPost.jsx
import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Settings, 
  ExternalLink, 
  UserPlus,
  Hash 
} from 'lucide-react';
import Button from '@/components/common/Button';
import { POST_TYPES } from '../../data/constants';

const SocialFeedPost = ({ 
  post, 
  onLike, 
  onShare, 
  onBookmark, 
  onFollow 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* En-tête du post */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {post.user.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {post.user.name}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.user.role}
                </span>
                {!post.user.isFollowing && (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onFollow(post.user.name)}
                    className="text-xs"
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    Suivre
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{post.timestamp}</span>
                <span>{post.user.followers} abonnés</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contenu du post */}
      <div className="px-6 py-4">
        {post.type === POST_TYPES.ARTICLE_SHARE && (
          <ArticleShareContent post={post} />
        )}

        {post.type === POST_TYPES.DISCUSSION && (
          <DiscussionContent post={post} />
        )}

        {post.type === POST_TYPES.CURATION && (
          <CurationContent post={post} />
        )}

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Hash className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions du post */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 text-sm transition-colors ${
                post.isLiked
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span>{post.stats.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>{post.stats.comments}</span>
            </button>
            <button
              onClick={() => onShare(post.id)}
              className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>{post.stats.shares}</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {post.stats.views} vues
            </span>
            <button
              onClick={() => onBookmark(post.id)}
              className={`p-1 rounded transition-colors ${
                post.isBookmarked
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleShareContent = ({ post }) => (
  <div>
    <p className="text-gray-800 dark:text-gray-200 mb-4">
      {post.comment}
    </p>
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            {post.article.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {post.article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{post.article.source}</span>
              <span>{post.article.readTime}</span>
              <span>il y a {post.article.publishedAt}</span>
            </div>
            <Button size="sm" variant="ghost">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DiscussionContent = ({ post }) => (
  <div>
    <p className="text-gray-800 dark:text-gray-200 mb-4">
      {post.content}
    </p>
    {post.responses && (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h5 className="font-medium text-gray-900 dark:text-white mb-3">
          Réponses populaires :
        </h5>
        <div className="space-y-2">
          {post.responses.slice(0, 2).map((response, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium text-gray-900 dark:text-white">
                {response.user}
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">
                {response.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const CurationContent = ({ post }) => (
  <div>
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center space-x-3 mb-3">
        <Bookmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {post.collection.title}
        </h4>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {post.collection.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{post.collection.articlesCount} articles</span>
          <span>{post.collection.contributors.length} contributeurs</span>
        </div>
        <div className="flex -space-x-2">
          {post.collection.contributors.slice(0, 3).map((contributor, index) => (
            <div key={index} className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {contributor.charAt(0)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Dernier ajout :</strong> {post.latestArticle.title}
          <span className="text-gray-500 dark:text-gray-400 ml-2">
            par {post.latestArticle.addedBy}
          </span>
        </p>
      </div>
    </div>
  </div>
);

export default SocialFeedPost;