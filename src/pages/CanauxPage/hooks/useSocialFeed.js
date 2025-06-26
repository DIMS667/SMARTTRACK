// src/pages/CanauxPage/hooks/useSocialFeed.js
import { useState, useCallback } from 'react';
import { socialFeed } from '../data/mockData';
import { FILTER_OPTIONS } from '../data/constants';

export const useSocialFeed = () => {
  const [feed, setFeed] = useState(socialFeed);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredFeed = feed.filter(post => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'articles') return post.type === 'article_share';
    if (selectedFilter === 'discussions') return post.type === 'discussion';
    if (selectedFilter === 'collections') return post.type === 'curation';
    return true;
  });

  const handleLike = useCallback((postId) => {
    setFeed(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            stats: { 
              ...post.stats, 
              likes: post.isLiked ? post.stats.likes - 1 : post.stats.likes + 1 
            }
          }
        : post
    ));
  }, []);

  const handleShare = useCallback((postId) => {
    setFeed(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            stats: { ...post.stats, shares: post.stats.shares + 1 }
          }
        : post
    ));
  }, []);

  const handleBookmark = useCallback((postId) => {
    setFeed(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  }, []);

  const handleFollow = useCallback((userId) => {
    setFeed(prev => prev.map(post => 
      post.user.name === userId 
        ? { 
            ...post, 
            user: { ...post.user, isFollowing: !post.user.isFollowing }
          }
        : post
    ));
  }, []);

  return {
    feed: filteredFeed,
    selectedFilter,
    setSelectedFilter,
    filters: FILTER_OPTIONS,
    handleLike,
    handleShare,
    handleBookmark,
    handleFollow
  };
};